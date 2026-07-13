"use server";

import { getClientToken } from "./auth-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function updateUserRole(userId: string, newRole: string) {
  try {
    if (!userId) {
      return { success: false, message: "User ID is required" };
    }
    
    const token = await getClientToken();

    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ role: newRole }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to update user role."
      };
    }

    return { success: true, message: data.message || "User role updated successfully!" };
  } catch (error: any) {
    console.error("Error updating user role:", error);
    return {
      success: false,
      message: error?.message || "Failed to update user role."
    };
  }
}

export async function deleteUser(userId: string) {
  try {
    if (!userId) {
      return { success: false, message: "User ID is required" };
    }

    const token = await getClientToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: "DELETE",
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to delete user."
      };
    }

    return { success: true, message: data.message || "User deleted successfully!" };
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      message: error?.message || "Failed to delete user."
    };
  }
}
