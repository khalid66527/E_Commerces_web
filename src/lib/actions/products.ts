"use server";

import { getClientToken } from "./auth-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function deleteProduct(productId: string) {
  try {
    if (!productId) {
      return { success: false, message: "Product ID is required" };
    }

    const token = await getClientToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/products/${productId}`, {
      method: "DELETE",
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to delete product."
      };
    }

    return { success: true, message: data.message || "Product deleted successfully!" };
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      message: error?.message || "Failed to delete product."
    };
  }
}
