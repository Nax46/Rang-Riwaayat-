import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '../../../../lib/auth/jwt';
import { updateCorrectionStatus, getCorrections } from '../../../../lib/db/store';

export async function GET() {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const list = await getCorrections();
  return NextResponse.json({ success: true, corrections: list });
}

export async function PATCH(req: NextRequest) {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status, adminNotes } = await req.json();
    if (!id || !['Accepted', 'Rejected'].includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }

    const updated = await updateCorrectionStatus(id, status, adminNotes);
    return NextResponse.json({ success: updated });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

