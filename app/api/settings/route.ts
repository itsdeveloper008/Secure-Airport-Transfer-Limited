import { NextResponse } from 'next/server';
import { readSettings, writeSettings } from '@/lib/admin/dataStore';
import type { AdminSettings } from '@/lib/admin/types';
import { unauthorizedResponse, verifyAdminToken } from '@/lib/firebase/verifyAdmin';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (!(await verifyAdminToken(request))) return unauthorizedResponse();

  const settings = await readSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  if (!(await verifyAdminToken(request))) return unauthorizedResponse();

  try {
    const body = (await request.json()) as AdminSettings;
    await writeSettings(body);
    return NextResponse.json(body);
  } catch (err) {
    console.error('PUT /api/settings:', err);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
