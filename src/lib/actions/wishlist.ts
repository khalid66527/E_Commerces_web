"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function addToWishlist(email: string, productId: string, product: any) {
  try {
    if (!email || !productId) {
      return { success: false, message: "Email and Product ID are required" };
    }

    const response = await fetch(`${API_URL}/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, productId, product }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to add to wishlist."
      };
    }

    return { success: true, message: data.message || "Added to wishlist successfully!", data: data.data };
  } catch (error: any) {
    console.error("Error adding to wishlist:", error);
    return {
      success: false,
      message: error?.message || "Failed to add to wishlist."
    };
  }
}

export async function getWishlist(email: string) {
  try {
    if (!email) {
      return { success: false, message: "Email is required" };
    }

    const response = await fetch(`${API_URL}/api/wishlist?email=${encodeURIComponent(email)}`, {
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch wishlist."
      };
    }

    return { success: true, data: data.data || [] };
  } catch (error: any) {
    console.error("Error fetching wishlist:", error);
    return {
      success: false,
      message: error?.message || "Failed to fetch wishlist."
    };
  }
}

export async function removeFromWishlist(id: string) {
  try {
    if (!id) {
      return { success: false, message: "Wishlist item ID is required" };
    }

    const response = await fetch(`${API_URL}/api/wishlist/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to remove from wishlist."
      };
    }

    return { success: true, message: data.message || "Removed from wishlist successfully!" };
  } catch (error: any) {
    console.error("Error removing from wishlist:", error);
    return {
      success: false,
      message: error?.message || "Failed to remove from wishlist."
    };
  }
}
