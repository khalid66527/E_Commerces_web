import Categories from "@/components/Categories";
import { getProducts } from "@/lib/api/products";

export const revalidate = 0;

export default async function CategoriesPage() {
  const products = await getProducts();
  
  const categoryCounts: Record<string, number> = {};
  products.forEach(product => {
    const cat = product.category || "Uncategorized";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const categoriesData = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count
  }));

  return (
    <div className="min-h-screen bg-[#06060C] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Categories categories={categoriesData} />
      </div>
    </div>
  );
}