export interface PurchaseItem {
  productId: string;
  title: string;
  brand: string;
  price: number;
  imageUrl?: string;
  category: string;
  quantity: number;
}

export interface Purchase {
  _id: string;
  sessionId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  items: PurchaseItem[];
  totalAmount: number;
  paymentStatus: string;
  paymentIntentId?: string;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

export async function getPurchaseHistory(email: string): Promise<Purchase[]> {
  try {
    if (!email) {
      return [];
    }

    const response = await fetch(`${API_URL}/api/purchase-history?email=${encodeURIComponent(email)}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch purchase history: ${response.statusText}`);
    }

    const json = await response.json();
    return (json.data || []) as Purchase[];
  } catch (error) {
    console.error("Error fetching purchase history:", error);
    return [];
  }
}

export async function getAllPurchases(): Promise<Purchase[]> {
  try {
    const url = API_URL || "http://localhost:5000";
    const response = await fetch(`${url}/api/admin/purchases`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch all purchases: ${response.statusText}`);
    }

    const json = await response.json();
    return (json.data || []) as Purchase[];
  } catch (error) {
    console.error("Error fetching all purchases:", error);
    return [];
  }
}
