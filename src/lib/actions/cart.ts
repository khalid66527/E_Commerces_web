"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function addToCartBackend(
  email: string,
  userName: string,
  userId: string,
  productId: string,
  product: any,
  quantity = 1
) {
  try {
    if (!email || !productId) {
      return { success: false, message: "Email and Product ID are required" };
    }

    const response = await fetch(`${API_URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, userName, userId, productId, product, quantity }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to add to cart."
      };
    }

    return { success: true, message: data.message || "Added to cart successfully!", data: data.data };
  } catch (error: any) {
    console.error("Error adding to cart:", error);
    return {
      success: false,
      message: error?.message || "Failed to add to cart."
    };
  }
}

export async function getCartBackend(email: string) {
  try {
    if (!email) {
      return { success: false, message: "Email is required" };
    }

    const response = await fetch(`${API_URL}/api/cart?email=${encodeURIComponent(email)}`, {
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch cart."
      };
    }

    return { success: true, data: data.data || [] };
  } catch (error: any) {
    console.error("Error fetching cart:", error);
    return {
      success: false,
      message: error?.message || "Failed to fetch cart."
    };
  }
}

export async function updateCartQuantity(id: string, quantity: number) {
  try {
    if (!id) {
      return { success: false, message: "Cart item ID is required" };
    }

    const response = await fetch(`${API_URL}/api/cart/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to update quantity."
      };
    }

    return { success: true, message: data.message || "Quantity updated successfully!" };
  } catch (error: any) {
    console.error("Error updating cart quantity:", error);
    return {
      success: false,
      message: error?.message || "Failed to update quantity."
    };
  }
}

export async function removeFromCartBackend(id: string) {
  try {
    if (!id) {
      return { success: false, message: "Cart item ID is required" };
    }

    const response = await fetch(`${API_URL}/api/cart/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to remove from cart."
      };
    }

    return { success: true, message: data.message || "Removed from cart successfully!" };
  } catch (error: any) {
    console.error("Error removing from cart:", error);
    return {
      success: false,
      message: error?.message || "Failed to remove from cart."
    };
  }
}
