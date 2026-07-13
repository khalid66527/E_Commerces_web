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
    
    const response = await fetch(`${API_URL}/api/contacts/user?email=${encodeURIComponent(email)}`, {
      cache: "no-store",
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
    const response = await fetch(`${API_URL}/api/contacts`, {
      cache: "no-store",
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
