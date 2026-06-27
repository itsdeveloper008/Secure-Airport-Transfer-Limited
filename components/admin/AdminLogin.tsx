'use client';

import { useState, type FormEvent } from 'react';
import { Loader2, Lock } from 'lucide-react';
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';

function authErrorMessage(code: string): string {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Incorrect email or password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a few minutes and try again.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    default:
      return 'Could not sign in. Please try again.';
  }
}

export default function AdminLogin() {
  const { signIn } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await signIn(email, password);
    } catch (err) {
      const code = (err as { code?: string }).code ?? '';
      setError(authErrorMessage(code));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-navy px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-8 shadow-[0_24px_64px_rgba(0,0,0,0.35)]">
        <div className="mb-8 flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.svg"
            alt="Secure Airport Transfer Limited"
            className="h-12 w-auto max-w-[260px] object-contain"
          />
          <p className="mt-4 font-accent text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
            Admin Console
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold text-brand-navy">Sign in</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-xs font-semibold uppercase tracking-wider text-brand-muted">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-brand-text focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              placeholder="admin@yourcompany.com"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-xs font-semibold uppercase tracking-wider text-brand-muted">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-brand-text focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90 disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" aria-hidden="true" />
                Sign in
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
