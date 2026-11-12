import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'rang-and-riwaayat-super-secret-jwt-key-2025';

export interface AdminPayload {
  email: string;
  role: string;
  name: string;
}

export function signAdminToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch (e) {
    return null;
  }
}

export function getAdminSession(): AdminPayload | null {
  const cookieStore = cookies();
  const token = cookieStore.get('rr_admin_token')?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

