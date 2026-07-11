"use server";

import { db } from "../auth";

export async function createProduct(productData: any) {
  try {
    if (!productData || typeof productData !== 'object') {
      return { success: false, message: "Invalid product data" };
    }

    const productsCollection = db.collection("products");
    const result = await productsCollection.insertOne(productData);
    
    return {
      success: true,
      message: "Product posted successfully!",
      insertedId: result.insertedId.toString()
    };
  } catch (error: any) {
    console.error("Error creating product:", error);
    return {
      success: false,
      message: error?.message || "An unexpected error occurred while posting product."
    };
  }
}
