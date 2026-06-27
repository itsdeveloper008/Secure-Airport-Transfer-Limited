'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';
import { adminFetch } from '@/lib/admin/api';
import type { AdminSettings, Lead } from '@/lib/admin/types';
import { DEFAULT_SETTINGS } from '@/lib/admin/types';

export function useAdminLeads() {
  const { user, loading: authLoading, getIdToken } = useAdminAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!user) return;

    try {
      const res = await adminFetch('/api/leads', getIdToken);
      if (res.status === 401) throw new Error('Unauthorized');
      if (!res.ok) throw new Error('Failed to load leads');
      setLeads(await res.json());
      setError(null);
    } catch {
      setError('Could not load leads.');
      setLeads([]);
    } finally {
      setReady(true);
    }
  }, [user, getIdToken]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setReady(true);
      return;
    }
    setReady(false);
    refresh();
  }, [authLoading, user, refresh]);

  const updateStatus = useCallback(
    async (id: string, status: Lead['status']) => {
      const res = await adminFetch('/api/leads', getIdToken, {
        method: 'PATCH',
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) return;
      const updated = (await res.json()) as Lead;
      setLeads((prev) => prev.map((l) => (l.id === id ? updated : l)));
    },
    [getIdToken],
  );

  return { leads, ready, error, refresh, updateStatus };
}

export function useAdminSettings() {
  const { user, loading: authLoading, getIdToken } = useAdminAuth();
  const [settings, setSettings] = useState<AdminSettings>(DEFAULT_SETTINGS);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setReady(true);
      return;
    }

    adminFetch('/api/settings', getIdToken)
      .then((res) => {
        if (res.status === 401) throw new Error('Unauthorized');
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: AdminSettings) => {
        setSettings({ ...DEFAULT_SETTINGS, ...data, seo: { ...DEFAULT_SETTINGS.seo, ...data.seo } });
        setError(null);
      })
      .catch(() => setError('Could not load settings.'))
      .finally(() => setReady(true));
  }, [authLoading, user, getIdToken]);

  const save = useCallback(
    async (next: AdminSettings) => {
      const res = await adminFetch('/api/settings', getIdToken, {
        method: 'PUT',
        body: JSON.stringify(next),
      });
      if (!res.ok) return false;
      const data = (await res.json()) as AdminSettings;
      setSettings(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      return true;
    },
    [getIdToken],
  );

  const reset = useCallback(async () => {
    await save(DEFAULT_SETTINGS);
  }, [save]);

  return { settings, ready, saved, error, save, reset };
}
