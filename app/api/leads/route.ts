import { NextResponse } from 'next/server';
import { addLead, readLeads, updateLeadStatus } from '@/lib/admin/dataStore';
import type { CreateLeadInput, LeadStatus } from '@/lib/admin/types';
import { unauthorizedResponse, verifyAdminToken } from '@/lib/firebase/verifyAdmin';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (!(await verifyAdminToken(request))) return unauthorizedResponse();

  const leads = await readLeads();
  return NextResponse.json(leads);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateLeadInput;

    if (
      !body.fullName?.trim() ||
      !body.jobTitle?.trim() ||
      !body.companyName?.trim() ||
      !body.email?.trim() ||
      !body.phone?.trim() ||
      !body.spend?.trim() ||
      !body.enquiry?.trim() ||
      !Array.isArray(body.hubs) ||
      body.hubs.length === 0
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const lead = await addLead({
      fullName: body.fullName.trim(),
      jobTitle: body.jobTitle.trim(),
      companyName: body.companyName.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      spend: body.spend.trim(),
      enquiry: body.enquiry.trim(),
      hubs: body.hubs,
      details: body.details?.trim() ?? '',
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (err) {
    console.error('POST /api/leads:', err);
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await verifyAdminToken(request))) return unauthorizedResponse();

  try {
    const { id, status } = (await request.json()) as { id: string; status: LeadStatus };
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    const updated = await updateLeadStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error('PATCH /api/leads:', err);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}
