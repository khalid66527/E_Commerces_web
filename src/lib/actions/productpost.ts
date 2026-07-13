"use server";

import { getClientToken } from "./auth-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function createProduct(productData: any) {
  try {
    if (!productData || typeof productData !== 'object') {
      return { success: false, message: "Invalid product data" };
    }

    const token = await getClientToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers,
      body: JSON.stringify(productData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to post product."
      };
    }

    return {
      success: true,
      message: data.message || "Product posted successfully!",
      insertedId: data.data?.insertedId || data.insertedId || ""
    };
  } catch (error: any) {
    console.error("Error creating product:", error);
    return {
      success: false,
      message: error?.message || "An unexpected error occurred while posting product."
    };
  }
}
