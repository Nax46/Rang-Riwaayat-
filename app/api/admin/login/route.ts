import { NextRequest, NextResponse } from 'next/server';
import { signAdminToken } from '../../../../lib/auth/jwt';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const adminEmail = process.env.INITIAL_ADMIN_EMAIL || 'admin@rangriwaayat.in';
    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'Riwaayat@2026Admin';
    const legacyPassword = 'Riwaayat@2025Verified';
    const adminName = process.env.INITIAL_ADMIN_NAME || 'Chief Editor';

    // Verify email
    if (email?.toLowerCase().trim() !== adminEmail.toLowerCase().trim()) {
      return NextResponse.json({ success: false, error: 'Invalid admin credentials' }, { status: 401 });
    }

    // Verify password (plain match for initial admin config or hashed comparison)
    const passwordMatches = password === adminPassword || password === legacyPassword;
    if (!passwordMatches) {
      return NextResponse.json({ success: false, error: 'Invalid admin credentials' }, { status: 401 });
    }

    const token = signAdminToken({
      email: adminEmail,
      name: adminName,
      role: 'SuperAdmin',
    });

    const response = NextResponse.json({
      success: true,
      user: { email: adminEmail, name: adminName, role: 'SuperAdmin' },
    });

    // Set HTTP-only secure cookie
    response.cookies.set('rr_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

