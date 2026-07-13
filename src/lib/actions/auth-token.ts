"use server";

import jwt from 'jsonwebtoken';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function getClientToken(): Promise<string | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user) {
      return null;
    }

    const payload = {
      email: session.user.email,
      role: session.user.role || 'user',
      id: session.user.id
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '5m'
    });

    return token;
  } catch (error) {
    console.error("Error signing client token:", error);
    return null;
  }
}
