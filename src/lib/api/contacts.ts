import { getClientToken } from '../actions/auth-token';

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  reply?: string;
  repliedAt?: string | null;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getUserContacts(email: string): Promise<ContactMessage[]> {
  try {
    if (!email) return [];
    
    const token = await getClientToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/contacts/user?email=${encodeURIComponent(email)}`, {
      cache: "no-store",
      headers
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user contact messages: ${response.statusText}`);
    }

    const resData = await response.json();
    return (resData.data || []) as ContactMessage[];
  } catch (error) {
    console.error("Error fetching user contacts:", error);
    return [];
  }
}

export async function getAllContacts(): Promise<ContactMessage[]> {
  try {
    const token = await getClientToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/contacts`, {
      cache: "no-store",
      headers
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch contact messages: ${response.statusText}`);
    }

    const resData = await response.json();
    return (resData.data || []) as ContactMessage[];
  } catch (error) {
    console.error("Error fetching all contacts:", error);
    return [];
  }
}
