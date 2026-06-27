'use client';

import {
  MapPin, Bell, Server, Plane, BarChart3, Leaf, Navigation,
  Activity, ChevronRight,
} from 'lucide-react';

const sidebarModules = [
  { icon: MapPin, label: 'Fleet Tracking', active: true },
  { icon: Plane, label: 'Flight Monitor' },
  { icon: Bell, label: 'Notifications' },
  { icon: BarChart3, label: 'Reporting' },
  { icon: Leaf, label: 'Carbon Data' },
  { icon: Server, label: 'Dispatch' },
];

const liveRoutes = [
  { id: 'SAT-2847', from: 'LHR', to: 'City of London', status: 'En Route', eta: '14 min' },
  { id: 'SAT-2848', from: 'MAN', to: 'Manchester HQ', status: 'Arrived', eta: '—' },
  { id: 'SAT-2849', from: 'EDI', to: 'Edinburgh Airport', status: 'Dispatched', eta: '22 min' },
  { id: 'SAT-2850', from: 'BHX', to: 'Birmingham NEC', status: 'En Route', eta: '8 min' },
  { id: 'SAT-2851', from: 'STN', to: 'Crew Hotel', status: 'Monitoring', eta: '31 min' },
];

const platformFeatures = [
  { title: 'Live Fleet Tracking', desc: 'GPS monitoring across 247 active vehicles' },
  { title: 'Flight Monitoring', desc: 'Real-time integration with 11 airport hubs' },
  { title: 'Automated Notifications', desc: 'Passenger SMS and email confirmations' },
  { title: 'Carbon Reporting', desc: 'ESG-ready environmental impact data' },
  { title: 'Dispatch Management', desc: 'Centralised multi-city routing platform' },
  { title: 'Route Optimisation', desc: 'Intelligent scheduling and delay adjustment' },
];

export default function TechnologyPlatform() {
  return (
    <section className="section-block section-divider w-full bg-brand-navy">
      <div className="zone w-full">
        <div className="section-intro text-center">
          <p className="eyebrow-light">Technology Platform</p>
          <h2 className="heading-gap headline-xl text-white">
            Technology Driving
            <br /><span className="text-brand-gold">Every Journey</span>
          </h2>
        </div>

        {/* Operations Platform Interface */}
        <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-brand-charcoal shadow-2xl">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-brand-navy px-5 py-3 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/60" />
                <span className="h-3 w-3 rounded-full bg-amber-500/60" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
              </div>
              <span className="ml-2 font-accent text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                SAT Operations Platform v4.2
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              <span className="font-accent text-[10px] font-semibold uppercase tracking-wider text-emerald-400">All Systems Online</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[220px_1fr]">
            {/* Sidebar */}
            <div className="hidden border-r border-white/10 bg-brand-navy/50 p-4 lg:block">
              <p className="mb-4 font-accent text-[9px] font-semibold uppercase tracking-widest text-white/30">Modules</p>
              <nav className="space-y-1">
                {sidebarModules.map((m) => (
                  <div
                    key={m.label}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm ${
                      m.active ? 'bg-brand-blue/20 text-white' : 'text-white/50 hover:bg-white/5'
                    }`}
                  >
                    <m.icon className="h-4 w-4" aria-hidden="true" />
                    {m.label}
                  </div>
                ))}
              </nav>
            </div>

            {/* Main panel */}
            <div className="p-5 lg:p-8">
              {/* Status row */}
              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'Active Vehicles', value: '247', color: 'text-brand-blue' },
                  { label: 'On-Time Rate', value: '98.2%', color: 'text-emerald-400' },
                  { label: 'Hubs Monitored', value: '12', color: 'text-brand-gold' },
                  { label: 'Transfers Today', value: '1,284', color: 'text-white' },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className={`font-display text-xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="mt-0.5 font-accent text-[9px] uppercase tracking-wider text-white/40">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Live routes table */}
              <div className="rounded-xl border border-white/10 bg-brand-navy/40">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                  <span className="font-accent text-[10px] font-semibold uppercase tracking-wider text-white/50">Live Route Monitoring</span>
                  <span className="flex items-center gap-1.5 font-accent text-[10px] text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-dot" /> Real-time
                  </span>
                </div>
                <div className="divide-y divide-white/5">
                  {liveRoutes.map((r) => (
                    <div key={r.id} className="flex items-center justify-between px-5 py-3 text-sm hover:bg-white/[0.02]">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[11px] text-white/40">{r.id}</span>
                        <span className="text-white/80">{r.from} → {r.to}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`font-accent text-[10px] font-semibold uppercase tracking-wider ${
                          r.status === 'En Route' ? 'text-brand-blue' : r.status === 'Arrived' ? 'text-emerald-400' : 'text-white/50'
                        }`}>{r.status}</span>
                        <span className="hidden font-accent text-xs text-white/40 sm:inline">ETA {r.eta}</span>
                        <ChevronRight className="h-4 w-4 text-white/20" aria-hidden="true" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature grid */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {platformFeatures.map((f) => (
                  <div key={f.title} className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2">
                      <Navigation className="h-3.5 w-3.5 text-brand-gold" aria-hidden="true" />
                      <h4 className="text-sm font-semibold text-white">{f.title}</h4>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/45">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
