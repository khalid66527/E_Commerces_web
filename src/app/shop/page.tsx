import ShopCart from "@/components/ShopCart";
import { getProducts } from "@/lib/api/products";

export const revalidate = 0;

interface ShopPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedParams = await searchParams;
  const products = await getProducts();
  
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
  
  return (
    <div className="min-h-screen bg-[#06060C] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShopCart 
          products={products} 
          categories={categories} 
          initialSearch={resolvedParams.search || ""} 
          initialCategory={resolvedParams.category || ""} 
        />
      </div>
    </div>
  );
}
