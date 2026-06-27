import { getAuth } from 'firebase-admin/auth';
import { initFirebase } from '@/lib/firebase/admin';

export async function verifyAdminToken(request: Request): Promise<boolean> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return false;

  const token = authHeader.slice(7).trim();
  if (!token) return false;

  try {
    await getAuth(initFirebase()).verifyIdToken(token);
    return true;
  } catch {
    return false;
  }
}

export function unauthorizedResponse() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}
