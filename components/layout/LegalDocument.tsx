'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { List } from 'lucide-react';
import { parseSectionTitle, type LegalSection } from '@/lib/legalSections';

const HEADER_OFFSET = 112;

type LegalDocumentProps = {
  sections: LegalSection[];
  intro: ReactNode;
  afterSections?: ReactNode;
};

export default function LegalDocument({ sections, intro, afterSections }: LegalDocumentProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');
  const [tocOffset, setTocOffset] = useState(0);
  const layoutRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateTocPosition = () => {
      const layout = layoutRef.current;
      const toc = tocRef.current;
      if (!layout || !toc) return;

      const layoutTop = layout.getBoundingClientRect().top + window.scrollY;
      const scrolled = window.scrollY - layoutTop + HEADER_OFFSET;
      const maxOffset = Math.max(0, layout.offsetHeight - toc.offsetHeight);

      setTocOffset(Math.max(0, Math.min(scrolled, maxOffset)));
    };

    updateTocPosition();
    window.addEventListener('scroll', updateTocPosition, { passive: true });
    window.addEventListener('resize', updateTocPosition);

    const ro = layoutRef.current ? new ResizeObserver(updateTocPosition) : null;
    if (layoutRef.current) ro?.observe(layoutRef.current);

    return () => {
      window.removeEventListener('scroll', updateTocPosition);
      window.removeEventListener('resize', updateTocPosition);
      ro?.disconnect();
    };
  }, [sections]);

  useEffect(() => {
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-28% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <section className="section-block w-full bg-brand-white">
      <div className="zone mx-auto max-w-6xl">
        {intro}

        <div
          ref={layoutRef}
          className="mt-10 lg:grid lg:grid-cols-[272px_minmax(0,1fr)] lg:gap-14"
        >
          <aside className="relative hidden lg:block" aria-label="Table of contents">
            <nav
              ref={tocRef}
              style={{ transform: `translateY(${tocOffset}px)` }}
              className="w-full rounded-2xl border border-brand-navy/[0.08] bg-white p-5 shadow-[0_10px_40px_rgba(7,26,53,0.07)] will-change-transform"
            >
              <p className="flex items-center gap-2 font-accent text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                <List className="h-4 w-4 shrink-0" aria-hidden="true" />
                On this page
              </p>
              <ol className="mt-4 space-y-1">
                {sections.map((section) => {
                  const { number, label } = parseSectionTitle(section.title);
                  const active = activeId === section.id;

                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={() => setActiveId(section.id)}
                        className={`flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm leading-snug transition-colors ${
                          active
                            ? 'bg-brand-blue/10 font-semibold text-brand-navy'
                            : 'text-brand-muted hover:bg-brand-navy/[0.04] hover:text-brand-navy'
                        }`}
                      >
                        <span className="mt-0.5 shrink-0 font-mono text-[11px] font-bold tracking-wide text-brand-blue">
                          {number}
                        </span>
                        <span>{label}</span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0">
            <nav
              className="mb-8 flex gap-2 overflow-x-auto pb-2 lg:hidden"
              aria-label="On this page"
            >
              {sections.map((section) => {
                const { label } = parseSectionTitle(section.title);
                const active = activeId === section.id;

                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setActiveId(section.id)}
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? 'border-brand-blue bg-brand-blue/10 text-brand-navy'
                        : 'border-brand-navy/15 text-brand-muted'
                    }`}
                  >
                    {label}
                  </a>
                );
              })}
            </nav>

            <div className="space-y-10">
              {sections.map((section) => (
                <article key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="font-display text-xl font-semibold text-brand-navy">{section.title}</h2>
                  <div className="mt-4 space-y-3">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-relaxed text-brand-muted">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {afterSections}
          </div>
        </div>
      </div>
    </section>
  );
}
