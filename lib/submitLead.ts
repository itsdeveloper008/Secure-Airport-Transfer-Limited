import { collection, addDoc } from 'firebase/firestore';
import type { CreateLeadInput, Lead } from '@/lib/admin/types';
import { getClientDb, isClientFirebaseConfigured } from '@/lib/firebase/client';

export type SubmitLeadResult = Pick<Lead, 'id' | 'createdAt'>;

function buildLeadPayload(input: CreateLeadInput) {
  return {
    fullName: input.fullName.trim(),
    jobTitle: input.jobTitle.trim(),
    companyName: input.companyName.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    spend: input.spend.trim(),
    enquiry: input.enquiry.trim(),
    hubs: input.hubs,
    details: input.details?.trim() ?? '',
    status: 'new' as const,
    createdAt: new Date().toISOString(),
  };
}

async function parseApiError(res: Response): Promise<string> {
  const text = await res.text();
  if (!text) return 'Submit failed';

  try {
    const data = JSON.parse(text) as { error?: string };
    return data.error ?? 'Submit failed';
  } catch {
    return res.status === 503
      ? 'The contact form is temporarily unavailable. Please email us directly.'
      : 'Submit failed';
  }
}

export async function submitLeadViaFirestore(input: CreateLeadInput): Promise<SubmitLeadResult> {
  if (!isClientFirebaseConfigured()) {
    throw new Error('Submit failed');
  }

  const payload = buildLeadPayload(input);
  const ref = await addDoc(collection(getClientDb(), 'leads'), payload);
  return { id: ref.id, createdAt: payload.createdAt };
}

export async function submitLead(input: CreateLeadInput): Promise<SubmitLeadResult> {
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (res.ok) {
      const lead = (await res.json()) as Lead;
      return { id: lead.id, createdAt: lead.createdAt };
    }

    const apiError = await parseApiError(res);

    if (isClientFirebaseConfigured()) {
      try {
        return await submitLeadViaFirestore(input);
      } catch {
        throw new Error(apiError === 'Submit failed' ? 'Could not submit your enquiry. Please try again.' : apiError);
      }
    }

    throw new Error(apiError === 'Submit failed' ? 'Could not submit your enquiry. Please try again.' : apiError);
  } catch (err) {
    if (err instanceof Error && err.message !== 'Submit failed' && err.message !== 'Failed to fetch') {
      throw err;
    }

    if (isClientFirebaseConfigured()) {
      return submitLeadViaFirestore(input);
    }

    throw new Error('Could not submit your enquiry. Please check your connection and try again.');
  }
}
