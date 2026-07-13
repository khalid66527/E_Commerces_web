import { NextResponse, NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    
    const { items, userEmail, userName, userId } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    // Create Checkout Sessions from cart items.
    const session = await stripe.checkout.sessions.create({
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: item.imageUrl ? [item.imageUrl] : [],
            description: item.brand || item.category,
          },
          unit_amount: Math.round(Number(item.price) * 100), // in cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        userEmail,
        userName,
        userId,
      },
    })

    // Store pending order in MongoDB
    const order = {
      sessionId: session.id,
      user: {
        id: userId,
        name: userName,
        email: userEmail,
      },
      items: items.map((item: any) => ({
        productId: item.productId,
        title: item.title,
        brand: item.brand,
        price: Number(item.price),
        imageUrl: item.imageUrl,
        category: item.category,
        quantity: item.quantity,
      })),
      totalAmount: items.reduce((acc: number, item: any) => acc + (Number(item.price) * item.quantity), 0),
      paymentStatus: 'pending',
      createdAt: new Date(),
    }

    await db.collection('orders').insertOne(order)

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Checkout error:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to create checkout session' },
      { status: err.statusCode || 500 }
    )
  }
}