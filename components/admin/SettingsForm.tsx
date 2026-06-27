'use client';

import { useEffect, useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { useAdminSettings } from '@/lib/admin/storage';
import type { AdminSettings, SeoSettings } from '@/lib/admin/types';

const inputClass =
  'mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-brand-text focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20';

const labelClass = 'block text-xs font-semibold uppercase tracking-wider text-brand-muted';

export default function SettingsForm() {
  const { settings, ready, saved, error, save, reset } = useAdminSettings();
  const [form, setForm] = useState<AdminSettings>(settings);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (ready) setForm(settings);
  }, [ready, settings]);

  const set = <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) =>
    setForm((p) => ({ ...p, [key]: value }));

  const setSeo = <K extends keyof SeoSettings>(key: K, value: SeoSettings[K]) =>
    setForm((p) => ({ ...p, seo: { ...p.seo, [key]: value } }));

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-brand-muted">
        Loading settings…
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">Settings</h2>
        <p className="mt-1 text-sm text-brand-muted">
          Organisation details, notifications, and website SEO configuration.
        </p>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setSaving(true);
          await save(form);
          setSaving(false);
        }}
        className="space-y-6"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="premium-card p-6">
            <h3 className="font-display text-lg font-semibold text-brand-navy">Organisation</h3>
            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="companyName" className={labelClass}>
                  Company name
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={form.companyName}
                  onChange={(e) => set('companyName', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="operationsEmail" className={labelClass}>
                  Operations email
                </label>
                <input
                  id="operationsEmail"
                  type="email"
                  value={form.operationsEmail}
                  onChange={(e) => set('operationsEmail', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="defaultAssignee" className={labelClass}>
                  Default assignee
                </label>
                <input
                  id="defaultAssignee"
                  type="text"
                  value={form.defaultAssignee}
                  onChange={(e) => set('defaultAssignee', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <section className="premium-card p-6">
            <h3 className="font-display text-lg font-semibold text-brand-navy">Notifications</h3>
            <div className="mt-5 space-y-4">
              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-gray-100 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-brand-navy">New lead alerts</p>
                  <p className="text-xs text-brand-muted">Email when a new enquiry is submitted</p>
                </div>
                <input
                  type="checkbox"
                  checked={form.notifyNewLeads}
                  onChange={(e) => set('notifyNewLeads', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                />
              </label>
              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-gray-100 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-brand-navy">Weekly digest</p>
                  <p className="text-xs text-brand-muted">Summary of pipeline activity every Monday</p>
                </div>
                <input
                  type="checkbox"
                  checked={form.notifyWeeklyDigest}
                  onChange={(e) => set('notifyWeeklyDigest', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                />
              </label>
            </div>
          </section>
        </div>

        <section className="premium-card p-6">
          <h3 className="font-display text-lg font-semibold text-brand-navy">Auto-reply</h3>
          <div className="mt-5 space-y-4">
            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-gray-100 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-brand-navy">Send automatic acknowledgement</p>
                <p className="text-xs text-brand-muted">Reply instantly when a form is submitted</p>
              </div>
              <input
                type="checkbox"
                checked={form.autoReplyEnabled}
                onChange={(e) => set('autoReplyEnabled', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
              />
            </label>
            <div>
              <label htmlFor="autoReplyMessage" className={labelClass}>
                Auto-reply message
              </label>
              <textarea
                id="autoReplyMessage"
                rows={4}
                value={form.autoReplyMessage}
                onChange={(e) => set('autoReplyMessage', e.target.value)}
                disabled={!form.autoReplyEnabled}
                className={`${inputClass} resize-none disabled:cursor-not-allowed disabled:opacity-50`}
              />
            </div>
          </div>
        </section>

        <section className="premium-card p-6">
          <h3 className="font-display text-lg font-semibold text-brand-navy">Website SEO</h3>
          <p className="mt-1 text-sm text-brand-muted">
            Global metadata applied across the public site. Changes take effect after saving.
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <label htmlFor="siteTitle" className={labelClass}>
                Site title
              </label>
              <input
                id="siteTitle"
                type="text"
                value={form.seo.siteTitle}
                onChange={(e) => setSeo('siteTitle', e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="lg:col-span-2">
              <label htmlFor="siteDescription" className={labelClass}>
                Meta description
              </label>
              <textarea
                id="siteDescription"
                rows={3}
                value={form.seo.siteDescription}
                onChange={(e) => setSeo('siteDescription', e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div>
              <label htmlFor="siteKeywords" className={labelClass}>
                Keywords
              </label>
              <input
                id="siteKeywords"
                type="text"
                value={form.seo.siteKeywords}
                onChange={(e) => setSeo('siteKeywords', e.target.value)}
                placeholder="comma, separated, keywords"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="siteUrl" className={labelClass}>
                Site URL
              </label>
              <input
                id="siteUrl"
                type="url"
                value={form.seo.siteUrl}
                onChange={(e) => setSeo('siteUrl', e.target.value)}
                placeholder="https://www.example.co.uk"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="ogTitle" className={labelClass}>
                Open Graph title
              </label>
              <input
                id="ogTitle"
                type="text"
                value={form.seo.ogTitle}
                onChange={(e) => setSeo('ogTitle', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="ogImage" className={labelClass}>
                Open Graph image path
              </label>
              <input
                id="ogImage"
                type="text"
                value={form.seo.ogImage}
                onChange={(e) => setSeo('ogImage', e.target.value)}
                placeholder="/images/satl-logo.png"
                className={inputClass}
              />
            </div>
            <div className="lg:col-span-2">
              <label htmlFor="ogDescription" className={labelClass}>
                Open Graph description
              </label>
              <textarea
                id="ogDescription"
                rows={2}
                value={form.seo.ogDescription}
                onChange={(e) => setSeo('ogDescription', e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div>
              <label htmlFor="twitterCard" className={labelClass}>
                Twitter card type
              </label>
              <select
                id="twitterCard"
                value={form.seo.twitterCard}
                onChange={(e) => setSeo('twitterCard', e.target.value as SeoSettings['twitterCard'])}
                className={inputClass}
              >
                <option value="summary">Summary</option>
                <option value="summary_large_image">Summary large image</option>
              </select>
            </div>
            <label className="flex cursor-pointer items-center justify-between gap-4 self-end rounded-xl border border-gray-100 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-brand-navy">Allow search indexing</p>
                <p className="text-xs text-brand-muted">Enable robots index for the public site</p>
              </div>
              <input
                type="checkbox"
                checked={form.seo.robotsIndex}
                onChange={(e) => setSeo('robotsIndex', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
              />
            </label>
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="btn-blue !min-h-[44px] !rounded-xl !px-6 !py-2.5 !text-sm disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save settings'}
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-brand-muted transition-colors hover:border-gray-300 hover:text-brand-navy"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset to defaults
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
              <Check className="h-4 w-4" aria-hidden="true" />
              Saved
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
