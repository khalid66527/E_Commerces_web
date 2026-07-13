"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function submitContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const response = await fetch(`${API_URL}/api/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || "Failed to submit contact message");
    }

    return { success: true, message: resData.message || "Submitted successfully", data: resData.data };
  } catch (error: any) {
    console.error("Error submitting contact:", error);
    return { success: false, message: error?.message || "Failed to submit contact message" };
  }
}

export async function replyToContact(
  id: string,
  reply: string
): Promise<{ success: boolean; message: string }> {
  try {
    if (!id || !reply) {
      return { success: false, message: "ID and reply text are required" };
    }

    const response = await fetch(`${API_URL}/api/contacts/${id}/reply`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply }),
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || "Failed to submit reply");
    }

    return { success: true, message: resData.message || "Reply submitted successfully" };
  } catch (error: any) {
    console.error("Error replying to contact:", error);
    return { success: false, message: error?.message || "Failed to submit reply" };
  }
}
