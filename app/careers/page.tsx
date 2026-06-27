import { MapPin, Briefcase, PoundSterling, Clock, Network, Users, TrendingUp } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Careers | Secure Airport Transfer Limited',
  description: 'Join the Secure Airport Transfer management team. Nationwide logistics operations hiring professionals who operate at the highest standard.',
};

const responsibilities = [
  'Oversee nationwide fleet routing and dispatch operations',
  'Coordinate driver and vehicle networks across UK airports',
  'Manage and report on corporate client SLAs',
  'Optimise the centralised digital dispatch platform',
  'Liaise with airline and corporate account clients',
  'Produce operational performance reports',
];

const requirements = [
  'Proven experience in logistics, transport, or operations management',
  'Strong organisational and multi-site coordination skills',
  'Experience with fleet management or dispatch systems',
  'Excellent communication skills for client and driver liaison',
  'Ability to work across flexible hours in a 24/7 operation',
];

const whyWork = [
  { icon: Network, title: 'Nationwide Operation', desc: 'Be part of a growing UK-wide logistics network' },
  { icon: Users, title: 'Professional Environment', desc: 'Corporate standards, structured management team' },
  { icon: TrendingUp, title: 'Career Development', desc: 'Growth opportunity as the network expands' },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        label="Join the Team"
        title="Join the Secure Airport Transfer Management Team"
        subtitle="We are building a nationwide logistics operation. We hire professionals who operate at the highest standard."
        backgroundImage="/images/sector-corporate.jpg"
      />

      <section className="section-block section-divider w-full bg-brand-white">
        <div className="zone w-full">
          <div className="overflow-hidden rounded-[24px] border border-gray-200 shadow-lg">
            <div className="bg-brand-navy px-8 py-6">
              <span className="inline-block rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 font-accent text-[10px] font-bold uppercase tracking-widest text-green-400">Now Hiring</span>
              <h2 className="mt-4 font-display text-2xl font-bold text-white md:text-3xl">Operations &amp; Fleet Logistics Manager (Nationwide Network)</h2>
            </div>

            <div className="bg-white px-8 py-8">
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { icon: MapPin, label: 'Location', value: 'Manchester HQ / Hybrid Network Oversight' },
                  { icon: Briefcase, label: 'Type', value: 'Full-Time, Permanent' },
                  { icon: PoundSterling, label: 'Salary', value: '£39,000 per annum' },
                  { icon: Clock, label: 'Hours', value: '40 hours per week, including weekend/on-call rota' },
                ].map((d) => (
                  <div key={d.label} className="flex items-start gap-3 text-sm text-brand-muted">
                    <d.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
                    <div><span className="font-semibold text-brand-navy">{d.label}:</span> {d.value}</div>
                  </div>
                ))}
              </div>

              <hr className="my-8 border-gray-200" />

              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-lg font-semibold text-brand-navy">Role Overview</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">We are seeking an experienced Logistics Professional to oversee our cross-country fleet routing, coordinate driver networks across major UK airports, manage service level agreements (SLAs), and optimise our centralised digital dispatch grid.</p>
                </div>
                {[{ title: 'Key Responsibilities', items: responsibilities }, { title: 'Requirements', items: requirements }].map((s) => (
                  <div key={s.title}>
                    <h3 className="font-display text-lg font-semibold text-brand-navy">{s.title}</h3>
                    <ul className="mt-4 space-y-2">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-brand-muted">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 bg-brand-gray px-8 py-6">
              <Button href="mailto:careers@secureairporttransfer.co.uk" variant="gold" showArrow aria-label="Apply for this position">Apply for This Position</Button>
              <p className="mt-4 text-sm text-brand-muted">Send your CV and covering letter to: <a href="mailto:careers@secureairporttransfer.co.uk" className="font-medium text-brand-blue hover:underline">careers@secureairporttransfer.co.uk</a></p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block section-divider w-full bg-brand-gray">
        <div className="zone w-full">
          <h2 className="mb-12 text-center font-display text-2xl font-bold text-brand-navy md:text-3xl">Why Work Here</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {whyWork.map((w) => (
              <div key={w.title} className="premium-card p-8 text-center">
                <w.icon className="mx-auto mb-4 h-8 w-8 text-brand-blue" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold text-brand-navy">{w.title}</h3>
                <p className="mt-2 text-sm text-brand-muted">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
