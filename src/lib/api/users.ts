export interface User {
  id: string;
  _id: string;
  name?: string | null;
  email: string;
  image?: string | null;
  role?: string;
  createdAt?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_URL}/api/users`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const json = await response.json();
    const users = json.data || [];

    return users.map((user: any) => ({
      id: user._id.toString(),
      _id: user._id.toString(),
      name: user.name || null,
      email: user.email || "",
      image: user.image || null,
      role: user.role || "user",
      createdAt: typeof user.createdAt === 'string' ? user.createdAt : (user.createdAt instanceof Date ? user.createdAt.toISOString() : (user.createdAt || "")),
    })) as User[];
  } catch (error) {
    console.error("Error fetching users from database:", error);
    return [];
  }
}
