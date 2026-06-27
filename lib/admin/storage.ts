'use client';

import { useCallback, useEffect, useState } from 'react';
import type { AdminSettings, Lead } from '@/lib/admin/types';
import { DEFAULT_SETTINGS } from '@/lib/admin/types';

export function useAdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/leads');
      if (!res.ok) throw new Error('Failed to load leads');
      setLeads(await res.json());
      setError(null);
    } catch {
      setError('Could not load leads.');
      setLeads([]);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateStatus = useCallback(
    async (id: string, status: Lead['status']) => {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) return;
      const updated = (await res.json()) as Lead;
      setLeads((prev) => prev.map((l) => (l.id === id ? updated : l)));
    },
    [],
  );

  return { leads, ready, error, refresh, updateStatus };
}

export function useAdminSettings() {
  const [settings, setSettings] = useState<AdminSettings>(DEFAULT_SETTINGS);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: AdminSettings) => {
        setSettings({ ...DEFAULT_SETTINGS, ...data, seo: { ...DEFAULT_SETTINGS.seo, ...data.seo } });
        setError(null);
      })
      .catch(() => setError('Could not load settings.'))
      .finally(() => setReady(true));
  }, []);

  const save = useCallback(async (next: AdminSettings) => {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(next),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as AdminSettings;
    setSettings(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    return true;
  }, []);

  const reset = useCallback(async () => {
    await save(DEFAULT_SETTINGS);
  }, [save]);

  return { settings, ready, saved, error, save, reset };
}
