import { getDb } from '@/lib/firebase/admin';
import type { AdminSettings, Lead } from '@/lib/admin/types';
import { DEFAULT_SETTINGS } from '@/lib/admin/types';

const LEADS_COLLECTION = 'leads';
const SETTINGS_DOC = 'settings/site';

function mergeSettings(data: Partial<AdminSettings> | undefined): AdminSettings {
  return {
    ...DEFAULT_SETTINGS,
    ...data,
    seo: { ...DEFAULT_SETTINGS.seo, ...data?.seo },
  };
}

function docToLead(id: string, data: FirebaseFirestore.DocumentData): Lead {
  return {
    id,
    fullName: data.fullName ?? '',
    jobTitle: data.jobTitle ?? '',
    companyName: data.companyName ?? '',
    email: data.email ?? '',
    phone: data.phone ?? '',
    spend: data.spend ?? '',
    enquiry: data.enquiry ?? '',
    hubs: Array.isArray(data.hubs) ? data.hubs : [],
    details: data.details ?? '',
    status: data.status ?? 'new',
    createdAt: data.createdAt ?? new Date().toISOString(),
  };
}

export async function readLeads(): Promise<Lead[]> {
  try {
    const snapshot = await getDb()
      .collection(LEADS_COLLECTION)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map((doc) => docToLead(doc.id, doc.data()));
  } catch {
    return [];
  }
}

export async function addLead(
  input: Omit<Lead, 'id' | 'status' | 'createdAt'>,
): Promise<Lead> {
  const payload = {
    ...input,
    status: 'new' as const,
    createdAt: new Date().toISOString(),
  };

  const ref = await getDb().collection(LEADS_COLLECTION).add(payload);
  return { id: ref.id, ...payload };
}

export async function updateLeadStatus(id: string, status: Lead['status']): Promise<Lead | null> {
  const ref = getDb().collection(LEADS_COLLECTION).doc(id);
  const doc = await ref.get();

  if (!doc.exists) return null;

  await ref.update({ status });
  return docToLead(doc.id, { ...doc.data(), status });
}

export async function readSettings(): Promise<AdminSettings> {
  try {
    const doc = await getDb().doc(SETTINGS_DOC).get();

    if (!doc.exists) return DEFAULT_SETTINGS;
    return mergeSettings(doc.data() as Partial<AdminSettings>);
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function writeSettings(settings: AdminSettings): Promise<void> {
  await getDb().doc(SETTINGS_DOC).set(settings, { merge: true });
}
