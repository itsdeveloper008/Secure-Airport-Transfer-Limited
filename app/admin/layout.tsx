import type { Metadata } from 'next';
import AdminShell from '@/components/admin/AdminShell';
import { AdminAuthProvider } from '@/components/admin/AdminAuthProvider';

export const metadata: Metadata = {
  title: 'Admin | Secure Airport Transfer Limited',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
