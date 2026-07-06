'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import { getClientAuth } from '@/lib/firebase/client';

type AdminAuthContextValue = {
  user: User | null;
  loading: boolean;
  configError: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const timeout = window.setTimeout(() => {
      if (!active) return;
      setLoading(false);
      setConfigError((prev) => prev ?? 'Authentication is taking longer than expected. Refresh the page and try again.');
    }, 12000);

    try {
      const auth = getClientAuth();
      const unsubscribe = onAuthStateChanged(
        auth,
        (nextUser) => {
          if (!active) return;
          window.clearTimeout(timeout);
          setUser(nextUser);
          setLoading(false);
          setConfigError(null);
        },
        (error) => {
          if (!active) return;
          window.clearTimeout(timeout);
          setConfigError(error.message || 'Could not connect to authentication.');
          setLoading(false);
        },
      );

      return () => {
        active = false;
        window.clearTimeout(timeout);
        unsubscribe();
      };
    } catch (err) {
      window.clearTimeout(timeout);
      const message = err instanceof Error ? err.message : 'Firebase is not configured.';
      setConfigError(message);
      setLoading(false);
      return () => {
        active = false;
      };
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(getClientAuth(), email.trim(), password);
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut(getClientAuth());
  }, []);

  const getIdToken = useCallback(async () => {
    const auth = getClientAuth();
    if (!auth.currentUser) return null;
    return auth.currentUser.getIdToken();
  }, []);

  const value = useMemo(
    () => ({ user, loading, configError, signIn, signOut, getIdToken }),
    [user, loading, configError, signIn, signOut, getIdToken],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
