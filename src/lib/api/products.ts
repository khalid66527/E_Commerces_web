export interface Product {
  id: string;
  _id: string;
  title: string;
  brand: string;
  price: string | number;
  stock: string | number;
  imageUrl: string;
  category: string;
  description?: string;
  specifications?: Record<string, string>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const json = await response.json();
    const products = json.data || [];

    return products.map((product: any) => ({
      id: product._id.toString(),
      _id: product._id.toString(),
      title: product.title || "",
      brand: product.brand || "",
      price: product.price ?? 0,
      stock: product.stock ?? 0,
      imageUrl: product.imageUrl || "",
      category: product.category || "",
      description: product.description || "",
      specifications: product.specifications || {},
    })) as Product[];
  } catch (error) {
    console.error("Error fetching products from database:", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    const json = await response.json();
    const product = json.data;
    if (!product) return null;

    return {
      id: product._id.toString(),
      _id: product._id.toString(),
      title: product.title || "",
      brand: product.brand || "",
      price: product.price ?? 0,
      stock: product.stock ?? 0,
      imageUrl: product.imageUrl || "",
      category: product.category || "",
      description: product.description || "",
      specifications: product.specifications || {},
    } as Product;
  } catch (error) {
    console.error(`Error fetching product ${id} from database:`, error);
    return null;
  }
}
