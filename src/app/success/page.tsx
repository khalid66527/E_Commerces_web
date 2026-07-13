import Link from 'next/link';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { FiCheckCircle, FiAlertTriangle, FiShoppingBag, FiArrowRight } from 'react-icons/fi';

interface SuccessPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const resolvedParams = await searchParams;
  const sessionId = resolvedParams.session_id;

  if (!sessionId) {
    redirect('/cart');
  }

  try {
    // 1. Retrieve Stripe checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // 2. If paid, update the order status in DB & clear user's cart
    if (session.payment_status === 'paid') {
      const order = await db.collection('pursess').findOne({ sessionId });
      if (order && order.paymentStatus === 'pending') {
        // Update order status to paid
        await db.collection('pursess').updateOne(
          { sessionId },
          {
            $set: {
              paymentStatus: 'paid',
              paymentIntentId: session.payment_intent as string,
              updatedAt: new Date(),
            },
          }
        );

        // Clear cart for this user's email
        const userEmail = session.metadata?.userEmail;
        if (userEmail) {
          await db.collection('cart').deleteMany({ email: userEmail });
        }
      }
    } else {
      // If not paid, redirect or show error
      return (
        <div className="min-h-screen bg-[#06060C] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white/[0.02] border border-white/[0.06] rounded-[2rem] p-8 text-center backdrop-blur-md">
            <FiAlertTriangle className="text-yellow-500 mx-auto mb-6 animate-pulse" size={64} />
            <h1 className="text-2xl font-black mb-4">Payment Pending or Failed</h1>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              We couldn't verify your payment yet. Please check your transaction or contact support.
            </p>
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 text-white"
            >
              Go to Cart <FiArrowRight />
            </Link>
          </div>
        </div>
      );
    }

    // Retrieve order details to show on the success page
    const orderDetails = await db.collection('pursess').findOne({ sessionId });

    return (
      <div className="min-h-screen bg-[#06060C] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Glassmorphic card */}
          <div className="border border-white/[0.06] rounded-[2.5rem] p-8 sm:p-12 bg-white/[0.01] backdrop-blur-xl space-y-8 relative overflow-hidden shadow-2xl">
            {/* Top gradient blur glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-tr from-[#8B5CF6]/20 to-[#EC4899]/20 rounded-full blur-[80px] pointer-events-none -z-10" />

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center p-4 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 shadow-lg shadow-green-500/5 animate-bounce mb-2">
                <FiCheckCircle size={44} />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-[#8B5CF6] to-[#EC4899]">
                Payment Successful!
              </h1>
              <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
                Thank you for your purchase, <span className="text-white font-semibold">{orderDetails?.user?.name || orderDetails?.user?.email}</span>. Your order has been placed successfully and your cart is cleared.
              </p>
            </div>

            {/* Order Details */}
            {orderDetails && (
              <div className="border border-white/[0.06] rounded-2xl p-6 bg-white/[0.01] space-y-6">
                <div className="flex justify-between items-center text-xs text-gray-500 font-bold uppercase tracking-widest pb-4 border-b border-white/[0.06]">
                  <span>Order Summary</span>
                  <span className="text-white normal-case font-medium">Session ID: {orderDetails.sessionId.slice(-12)}</span>
                </div>

                {/* Items list */}
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {orderDetails.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.06] flex-shrink-0 flex items-center justify-center">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <FiShoppingBag className="text-gray-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-white line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-400 font-semibold">{item.brand} • Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-gray-300">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex justify-between items-center font-extrabold text-sm uppercase tracking-wider">
                  <span className="text-gray-400">Total Amount Paid</span>
                  <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">
                    ${orderDetails.totalAmount?.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white text-sm font-extrabold uppercase tracking-widest rounded-2xl shadow-lg shadow-[#EC4899]/20 hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer"
              >
                Continue Shopping <FiArrowRight size={16} />
              </Link>
              <Link
                href="/dashboard/user/purcesshistory"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] text-gray-300 hover:text-white text-sm font-extrabold uppercase tracking-widest rounded-2xl transition-all active:scale-[0.98] cursor-pointer"
              >
                View Purcess History
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (err: any) {
    console.error('Error verifying Stripe session:', err);
    return (
      <div className="min-h-screen bg-[#06060C] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/[0.02] border border-white/[0.06] rounded-[2rem] p-8 text-center backdrop-blur-md">
          <FiAlertTriangle className="text-red-500 mx-auto mb-6 animate-pulse" size={64} />
          <h1 className="text-2xl font-black mb-4">Verification Error</h1>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            We encountered an error while verifying your payment with Stripe. If you see a charge on your card, please contact support.
          </p>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 text-white"
          >
            Return to Cart <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }
}
