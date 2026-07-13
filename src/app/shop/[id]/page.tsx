import React from 'react';
import Link from 'next/link';
import { getProductById } from '@/lib/api/products';
import ProductActions from '@/components/ProductActions';
import { 
  FiShoppingCart, 
  FiHeart, 
  FiArrowLeft, 
  FiTruck, 
  FiShield, 
  FiRotateCcw,
  FiShoppingBag,
  FiTag,
  FiBox,
  FiCpu,
  FiDatabase,
  FiHardDrive,
  FiBattery,
  FiTv,
  FiCamera,
  FiSliders,
  FiZap,
  FiLayers,
  FiInfo
} from 'react-icons/fi';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const revalidate = 0;

// Helper to map specification names to dynamic premium icons
const getSpecIcon = (name: string) => {
  const k = name.toLowerCase();
  if (k.includes('brand')) return <FiTag className="text-[#8B5CF6]" />;
  if (k.includes('category')) return <FiShoppingBag className="text-[#EC4899]" />;
  if (k.includes('price')) return <FiTag className="text-[#10B981]" />;
  if (k.includes('stock')) return <FiBox className="text-[#F59E0B]" />;
  if (k.includes('processor') || k.includes('cpu') || k.includes('chip')) return <FiCpu className="text-[#8B5CF6]" />;
  if (k.includes('ram') || k.includes('memory')) return <FiDatabase className="text-[#EC4899]" />;
  if (k.includes('storage') || k.includes('ssd') || k.includes('hdd') || k.includes('rom')) return <FiHardDrive className="text-[#3B82F6]" />;
  if (k.includes('gpu') || k.includes('graphics') || k.includes('video card')) return <FiZap className="text-[#F59E0B]" />;
  if (k.includes('battery')) return <FiBattery className="text-[#10B981]" />;
  if (k.includes('screen') || k.includes('display') || k.includes('monitor') || k.includes('size')) return <FiTv className="text-[#EC4899]" />;
  if (k.includes('camera') || k.includes('lens') || k.includes('resolution') || k.includes('sensor')) return <FiCamera className="text-[#8B5CF6]" />;
  if (k.includes('noise') || k.includes('audio') || k.includes('sound')) return <FiLayers className="text-[#10B981]" />;
  if (k.includes('bluetooth') || k.includes('wireless') || k.includes('connectivity') || k.includes('blue')) return <FiZap className="text-[#3B82F6]" />;
  return <FiSliders className="text-[#6B7280]" />;
};

export default async function ProductDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  // 404 handler screen
  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-background text-foreground transition-colors duration-300">
        <div className="p-5 bg-muted border border-border rounded-full animate-bounce mb-8">
          <FiShoppingBag className="text-6xl text-gray-600" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">
          Product Not Found
        </h1>
        <p className="text-gray-500 mt-4 max-w-sm leading-relaxed">
          The product you are trying to view does not exist or may have been removed.
        </p>
        <Link 
          href="/shop"
          className="mt-8 flex items-center gap-2 px-6 py-3 bg-muted hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#EC4899] border border-border hover:border-transparent rounded-xl text-sm font-bold transition-all duration-300 text-foreground hover:text-white dark:text-white"
        >
          <FiArrowLeft /> Back to Shop
        </Link>
      </div>
    );
  }

  // Helper to format specification keys (e.g. "batteryCapacity" -> "Battery Capacity")
  const formatSpecKey = (key: string): string => {
    const abbreviations: Record<string, string> = {
      ram: 'RAM',
      cpu: 'CPU',
      tws: 'TWS',
      os: 'OS',
      hdmi: 'HDMI',
      usb: 'USB',
      ssd: 'SSD',
      hdd: 'HDD',
    };
    
    if (abbreviations[key.toLowerCase()]) {
      return abbreviations[key.toLowerCase()];
    }
    
    const result = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/[_-]+/g, ' ')
      .trim()
      .replace(/^./, (str) => str.toUpperCase());
      
    return result
      .split(' ')
      .map(word => abbreviations[word.toLowerCase()] || word)
      .join(' ');
  };

  const specs = [
    { name: 'Brand', value: product.brand || 'Premium' },
    { name: 'Category', value: product.category || 'Electronics' },
    { name: 'Price', value: `$${product.price}` },
    { 
      name: 'Stock Status', 
      value: Number(product.stock) > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock' 
    },
    // Dynamic specifications from product (absolutely no static warranty/shipping mockup data)
    ...(product.specifications 
      ? Object.entries(product.specifications)
          .filter(([_, value]) => value !== undefined && value !== null && String(value).trim() !== '')
          .map(([key, value]) => ({
            name: formatSpecKey(key),
            value: String(value)
          }))
      : []
    )
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Navigation Breadcrumbs & Back Link */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
          <nav className="flex text-xs font-bold text-muted-foreground uppercase tracking-widest gap-2">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-[#EC4899] truncate max-w-[200px]">{product.title}</span>
          </nav>
          
          <Link 
            href="/shop"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            <FiArrowLeft /> Back to products
          </Link>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Image & Badges */}
          <div className="space-y-8 animate-fade-in">
            {/* Image frame */}
            <div className="relative aspect-square bg-gradient-to-b from-card to-background rounded-3xl overflow-hidden border border-border hover:border-[#8B5CF6]/30 transition-all duration-500 shadow-2xl flex items-center justify-center group">
              <div className="absolute inset-0 bg-[#8B5CF6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
              {product.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={product.imageUrl} 
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <FiShoppingBag className="text-8xl text-gray-700" />
              )}
            </div>

            {/* Premium Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <FiTruck className="text-xl text-[#8B5CF6]" />, title: "Free Shipping", subtitle: "On all items" },
                { icon: <FiShield className="text-xl text-[#EC4899]" />, title: "Secure Payments", subtitle: "SSL Encrypted" },
                { icon: <FiRotateCcw className="text-xl text-[#8B5CF6]" />, title: "Easy Returns", subtitle: "30-Day Policy" }
              ].map((badge, idx) => (
                <div key={idx} className="bg-card border border-border p-4 rounded-2xl text-center space-y-2 backdrop-blur-sm">
                  <div className="mx-auto w-fit p-2.5 bg-muted border border-border rounded-xl">
                    {badge.icon}
                  </div>
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">{badge.title}</h4>
                  <p className="text-[9px] text-muted-foreground font-medium">{badge.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Title, Specs & Cards Grid */}
          <div className="space-y-8 animate-slide-up">
            {/* Header info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full text-[10px] font-extrabold uppercase text-[#8B5CF6] tracking-widest">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-muted border border-border rounded-full text-[10px] font-extrabold uppercase text-muted-foreground tracking-widest">
                  {product.brand}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-black tracking-wide text-foreground uppercase leading-snug">
                {product.title}
              </h1>

              {/* Huge glowing price */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] drop-shadow-[0_0_10px_rgba(236,72,153,0.25)]">
                  ${product.price}
                </span>
                <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">(Inc. all taxes)</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                {product.description || "Experience top-of-the-line performance with this premium product. Engineered with extreme precision and premium materials to ensure reliable daily operations and durability."}
              </p>
            </div>

            {/* Actions Row */}
            <ProductActions product={product} />

            {/* Specifications Cards Grid */}
            <div className="space-y-4 pt-6 border-t border-border">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Product Specifications</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specs.map((spec, index) => {
                  const isStock = spec.name === 'Stock Status';
                  const isPrice = spec.name === 'Price';
                  return (
                    <div 
                      key={index} 
                      className="group flex items-center gap-4 bg-card hover:bg-muted border border-border hover:border-[#8B5CF6]/30 p-4 rounded-2xl transition-all duration-300 backdrop-blur-md hover:shadow-[0_0_20px_rgba(139,92,246,0.05)]"
                    >
                      <div className="flex-shrink-0 p-3 bg-muted border border-border group-hover:border-[#8B5CF6]/20 group-hover:bg-[#8B5CF6]/10 rounded-xl transition-all duration-300 shadow-inner">
                        {getSpecIcon(spec.name)}
                      </div>
                      <div className="space-y-1">
                        <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          {spec.name}
                        </span>
                        <div className="text-sm font-semibold text-foreground">
                          {isStock ? (
                            <span className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                              product.stock && Number(product.stock) > 0
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                              <FiBox size={10} /> {spec.value}
                            </span>
                          ) : isPrice ? (
                            <span className="text-[#EC4899] font-black">{spec.value}</span>
                          ) : (
                            spec.value
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

