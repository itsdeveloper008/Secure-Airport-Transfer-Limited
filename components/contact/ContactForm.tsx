'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, FormEvent, type RefObject, type ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion, useMotionValueEvent, useSpring } from 'framer-motion';
import {
  clampPointToElement,
  getAimAngleDeg,
  getCaretPositionInContainer,
  getElementBoundsInContainer,
  getElementCenterInContainer,
  getEmitterPositionInContainer,
  getPivotPositionInContainer,
} from '@/lib/getCaretPosition';
import SpotlightScene, { SpotlightFixture } from '@/components/contact/SpotlightScene';
import {
  CONTACT_EMAIL,
  ENQUIRY_OPTIONS,
  FORM_FIELDS,
  FORM_HEADING,
  FORM_STEPS,
  FORM_SUBTITLE,
  FORM_SUCCESS,
  HUB_OPTIONS,
  SPEND_OPTIONS,
} from '@/lib/contactContent';

type FormData = {
  fullName: string;
  jobTitle: string;
  companyName: string;
  email: string;
  phone: string;
  spend: string;
  enquiry: string;
  details: string;
};

type Point = { x: number; y: number };

const inputClass =
  'relative z-10 w-full rounded-full border border-white/25 bg-black px-6 py-[18px] text-[15px] text-white placeholder:text-white/30 focus:border-white/50 focus:outline-none focus:ring-0';

const labelClass = 'mb-2 block text-xs font-medium uppercase tracking-widest text-white/40';

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className={labelClass}>
      {children}
    </label>
  );
}

function SpotlightField({
  rounded = 'rounded-full',
  children,
}: {
  rounded?: string;
  children: ReactNode;
}) {
  return <div className={`relative overflow-hidden ${rounded}`}>{children}</div>;
}

type BeamBounds = { left: number; right: number; bottom: number };

const SPOTLIGHT_SPRING = { stiffness: 200, damping: 28 };

function useSpotlight(
  containerRef: RefObject<HTMLDivElement | null>,
  emitterRef: RefObject<HTMLDivElement | null>,
  stepsRef: RefObject<HTMLDivElement | null>,
  reduced: boolean | null,
) {
  const [emitter, setEmitter] = useState<Point>({ x: 0, y: 0 });
  const [cylinderAngle, setCylinderAngle] = useState(0);
  const [beamBounds, setBeamBounds] = useState<BeamBounds>({ left: 0, right: 0, bottom: 0 });
  const [active, setActive] = useState(false);
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});

  const angleSpring = useSpring(0, SPOTLIGHT_SPRING);
  const beamLeftSpring = useSpring(0, SPOTLIGHT_SPRING);
  const beamRightSpring = useSpring(0, SPOTLIGHT_SPRING);
  const beamBottomSpring = useSpring(0, SPOTLIGHT_SPRING);

  const syncSpringsToState = useCallback(() => {
    setCylinderAngle(-angleSpring.get());
    setBeamBounds({
      left: beamLeftSpring.get(),
      right: beamRightSpring.get(),
      bottom: beamBottomSpring.get(),
    });
  }, [angleSpring, beamLeftSpring, beamRightSpring, beamBottomSpring]);

  useMotionValueEvent(angleSpring, 'change', syncSpringsToState);
  useMotionValueEvent(beamLeftSpring, 'change', syncSpringsToState);
  useMotionValueEvent(beamRightSpring, 'change', syncSpringsToState);
  useMotionValueEvent(beamBottomSpring, 'change', syncSpringsToState);

  // Anchor beam apex to the real lens after cylinder rotates — no gap
  useLayoutEffect(() => {
    const c = containerRef.current;
    const fixture = emitterRef.current;
    if (!c || !fixture) return;
    setEmitter(getEmitterPositionInContainer(fixture, c));
  }, [cylinderAngle, beamBounds, containerRef, emitterRef]);

  const applyAim = useCallback(
    (nextTarget: Point, bounds: BeamBounds) => {
      const c = containerRef.current;
      const fixture = emitterRef.current;
      if (!c || !fixture) return;

      const pivot = getPivotPositionInContainer(fixture, c);
      const angle = getAimAngleDeg(pivot, nextTarget);

      angleSpring.set(angle);
      beamLeftSpring.set(bounds.left);
      beamRightSpring.set(bounds.right);
      beamBottomSpring.set(bounds.bottom);
    },
    [containerRef, emitterRef, angleSpring, beamLeftSpring, beamRightSpring, beamBottomSpring],
  );

  const boundsFromElement = useCallback(
    (el: HTMLElement) => {
      const c = containerRef.current;
      if (!c) return { left: 0, right: 0, bottom: 0 };
      const b = getElementBoundsInContainer(el, c);
      return { left: b.left, right: b.right, bottom: b.bottom };
    },
    [containerRef],
  );

  const trackCenter = useCallback(() => {
    if (reduced) return;
    const c = containerRef.current;
    const steps = stepsRef.current;
    if (!c || !steps) return;

    const center = getElementCenterInContainer(steps, c);
    const bounds = boundsFromElement(steps);
    setActive(true);
    applyAim(center, bounds);
  }, [containerRef, stepsRef, reduced, applyAim, boundsFromElement]);

  const trackField = useCallback(
    (fieldId: string, element?: HTMLElement | null) => {
      if (reduced) return;
      const c = containerRef.current;
      const el = element ?? fieldRefs.current[fieldId];
      if (!c || !el) return;

      const bounds = boundsFromElement(el);

      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        const raw = getCaretPositionInContainer(el, c);
        const clamped = clampPointToElement(raw, el, c);
        setActive(true);
        applyAim(clamped, bounds);
      } else {
        setActive(true);
        applyAim(getElementCenterInContainer(el, c), bounds);
      }
    },
    [containerRef, reduced, applyAim, boundsFromElement],
  );

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const sync = () => trackCenter();
    const ro = new ResizeObserver(sync);
    ro.observe(c);
    window.addEventListener('resize', sync);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', sync);
    };
  }, [containerRef, trackCenter]);

  const setFieldRef = (id: string) => (el: HTMLElement | null) => {
    fieldRefs.current[id] = el;
  };

  return {
    emitter,
    cylinderAngle,
    beamBounds,
    active,
    trackField,
    trackCenter,
    setFieldRef,
  };
}

type TrackableInput = HTMLInputElement | HTMLTextAreaElement;

function bindTrack(el: TrackableInput, fieldId: string, trackField: (id: string, el: TrackableInput) => void) {
  requestAnimationFrame(() => trackField(fieldId, el));
}

export default function ContactForm() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const emitterRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const {
    emitter,
    cylinderAngle,
    beamBounds,
    active,
    trackField,
    trackCenter,
    setFieldRef,
  } = useSpotlight(containerRef, emitterRef, stepsRef, reduced);

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hubs, setHubs] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    jobTitle: '',
    companyName: '',
    email: '',
    phone: '',
    spend: '',
    enquiry: '',
    details: '',
  });

  const set = (key: keyof FormData) => (v: string) => setFormData((p) => ({ ...p, [key]: v }));

  useEffect(() => {
    const t = setTimeout(trackCenter, 120);
    return () => clearTimeout(t);
  }, [step, trackCenter]);

  const validateStep = () => {
    if (step === 0) return formData.fullName && formData.jobTitle && formData.companyName;
    if (step === 1) return formData.email && formData.phone && formData.spend && formData.enquiry;
    if (step === 2) return hubs.length > 0;
    return true;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setStep((s) => s + 1);
    setTimeout(trackCenter, 200);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, hubs, details: formData.details }),
      });

      if (!res.ok) throw new Error('Submit failed');
      setSubmitted(true);
    } catch {
      setSubmitError('Could not submit your enquiry. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };


  const inputHandlers = (fieldId: string) => ({
    ref: setFieldRef(fieldId),
    onFocus: (e: React.FocusEvent<TrackableInput>) => trackField(fieldId, e.currentTarget),
    onClick: (e: React.MouseEvent<TrackableInput>) => trackField(fieldId, e.currentTarget),
    onKeyUp: (e: React.KeyboardEvent<TrackableInput>) => trackField(fieldId, e.currentTarget),
    onKeyDown: (e: React.KeyboardEvent<TrackableInput>) => trackField(fieldId, e.currentTarget),
    onSelect: (e: React.SyntheticEvent<TrackableInput>) => trackField(fieldId, e.currentTarget),
    onInput: (e: React.FormEvent<TrackableInput>) => trackField(fieldId, e.currentTarget),
  });

  if (submitted) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md">
          <div className="mx-auto h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(100,220,255,0.8)]" />
          <h3 className="mt-8 font-display text-3xl font-bold uppercase tracking-wide text-white">
            {FORM_SUCCESS.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/45">{FORM_SUCCESS.body}</p>
          <p className="mt-4 text-sm text-white/35">
            {FORM_SUCCESS.urgent}{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-cyan-300/80 underline-offset-2 hover:text-cyan-200 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex min-h-[85vh] w-full max-w-3xl flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6"
    >
      {!reduced && emitter.x > 0 && (
        <SpotlightScene
          emitterX={emitter.x}
          emitterY={emitter.y}
          beamLeft={beamBounds.left}
          beamRight={beamBounds.right}
          beamBottom={beamBounds.bottom}
          active={active}
        />
      )}

      <div className="relative z-10 w-full">
        <SpotlightFixture ref={emitterRef} rotation={cylinderAngle} />

        <h2 className="text-center font-display text-4xl font-bold uppercase tracking-[0.12em] text-white sm:text-5xl md:text-6xl">
          {FORM_HEADING}
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-center text-sm leading-relaxed text-white/40 sm:text-base">
          {FORM_SUBTITLE}
        </p>

        <form onSubmit={handleSubmit} className="mt-10 w-full" noValidate>
          <div className="mb-8 text-center">
            <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
              {FORM_STEPS[step].title}
            </h3>
            <p className="mt-2 text-sm text-white/40">{FORM_STEPS[step].description}</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              ref={stepsRef}
              key={step}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="relative isolate space-y-4"
            >
              {step === 0 && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <FieldLabel htmlFor="fullName">{FORM_FIELDS.fullName.label}</FieldLabel>
                      <SpotlightField>
                        <input
                          id="fullName"
                          type="text"
                          required
                          autoComplete="name"
                          value={formData.fullName}
                          placeholder={FORM_FIELDS.fullName.placeholder}
                          className={inputClass}
                          {...inputHandlers('fullName')}
                          onChange={(e) => {
                            set('fullName')(e.target.value);
                            bindTrack(e.target, 'fullName', trackField);
                          }}
                        />
                      </SpotlightField>
                    </div>
                    <div>
                      <FieldLabel htmlFor="jobTitle">{FORM_FIELDS.jobTitle.label}</FieldLabel>
                      <SpotlightField>
                        <input
                          id="jobTitle"
                          type="text"
                          required
                          autoComplete="organization-title"
                          value={formData.jobTitle}
                          placeholder={FORM_FIELDS.jobTitle.placeholder}
                          className={inputClass}
                          {...inputHandlers('jobTitle')}
                          onChange={(e) => {
                            set('jobTitle')(e.target.value);
                            bindTrack(e.target, 'jobTitle', trackField);
                          }}
                        />
                      </SpotlightField>
                    </div>
                  </div>
                  <div>
                    <FieldLabel htmlFor="companyName">{FORM_FIELDS.companyName.label}</FieldLabel>
                    <SpotlightField>
                      <input
                        id="companyName"
                        type="text"
                        required
                        autoComplete="organization"
                        value={formData.companyName}
                        placeholder={FORM_FIELDS.companyName.placeholder}
                        className={inputClass}
                        {...inputHandlers('companyName')}
                        onChange={(e) => {
                          set('companyName')(e.target.value);
                          bindTrack(e.target, 'companyName', trackField);
                        }}
                      />
                    </SpotlightField>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <FieldLabel htmlFor="email">{FORM_FIELDS.email.label}</FieldLabel>
                      <SpotlightField>
                        <input
                          id="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={formData.email}
                          placeholder={FORM_FIELDS.email.placeholder}
                          className={inputClass}
                          {...inputHandlers('email')}
                          onChange={(e) => {
                            set('email')(e.target.value);
                            bindTrack(e.target, 'email', trackField);
                          }}
                        />
                      </SpotlightField>
                    </div>
                    <div>
                      <FieldLabel htmlFor="phone">{FORM_FIELDS.phone.label}</FieldLabel>
                      <SpotlightField>
                        <input
                          id="phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          value={formData.phone}
                          placeholder={FORM_FIELDS.phone.placeholder}
                          className={inputClass}
                          {...inputHandlers('phone')}
                          onChange={(e) => {
                            set('phone')(e.target.value);
                            bindTrack(e.target, 'phone', trackField);
                          }}
                        />
                      </SpotlightField>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <FieldLabel htmlFor="spend">{FORM_FIELDS.spend.label}</FieldLabel>
                      <SpotlightField>
                        <select
                          id="spend"
                          ref={setFieldRef('spend') as React.Ref<HTMLSelectElement>}
                          required
                          value={formData.spend}
                          className={`${inputClass} appearance-none`}
                          onFocus={(e) => trackField('spend', e.currentTarget)}
                          onChange={(e) => {
                            set('spend')(e.target.value);
                            trackField('spend', e.currentTarget);
                          }}
                        >
                          <option value="" className="bg-black">
                            {FORM_FIELDS.spend.placeholder}
                          </option>
                          {SPEND_OPTIONS.map((o) => (
                            <option key={o} value={o} className="bg-black">
                              {o}
                            </option>
                          ))}
                        </select>
                      </SpotlightField>
                    </div>
                    <div>
                      <FieldLabel htmlFor="enquiry">{FORM_FIELDS.enquiry.label}</FieldLabel>
                      <SpotlightField>
                        <select
                          id="enquiry"
                          ref={setFieldRef('enquiry') as React.Ref<HTMLSelectElement>}
                          required
                          value={formData.enquiry}
                          className={`${inputClass} appearance-none`}
                          onFocus={(e) => trackField('enquiry', e.currentTarget)}
                          onChange={(e) => {
                            set('enquiry')(e.target.value);
                            trackField('enquiry', e.currentTarget);
                          }}
                        >
                          <option value="" className="bg-black">
                            {FORM_FIELDS.enquiry.placeholder}
                          </option>
                          {ENQUIRY_OPTIONS.map((o) => (
                            <option key={o} value={o} className="bg-black">
                              {o}
                            </option>
                          ))}
                        </select>
                      </SpotlightField>
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <FieldLabel htmlFor="hubs">{FORM_FIELDS.hubs.label}</FieldLabel>
                    <p className="mb-3 text-xs text-white/30">{FORM_FIELDS.hubs.hint}</p>
                    <SpotlightField rounded="rounded-2xl">
                      <div
                        ref={setFieldRef('hubs')}
                        id="hubs"
                        role="group"
                        aria-label={FORM_FIELDS.hubs.label}
                        className="flex flex-wrap justify-center gap-2 px-2 py-3"
                      >
                        {HUB_OPTIONS.map((hub) => (
                          <button
                            key={hub.code}
                            type="button"
                            title={hub.name}
                            onClick={(e) => {
                              setHubs((p) =>
                                p.includes(hub.code) ? p.filter((h) => h !== hub.code) : [...p, hub.code],
                              );
                              trackField('hubs', e.currentTarget);
                            }}
                            aria-pressed={hubs.includes(hub.code)}
                            className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                              hubs.includes(hub.code)
                                ? 'border-cyan-300/60 bg-cyan-400/15 text-cyan-100'
                                : 'border-white/20 bg-transparent text-white/50 hover:border-white/40'
                            }`}
                          >
                            {hub.code}
                          </button>
                        ))}
                      </div>
                    </SpotlightField>
                  </div>
                  <div>
                    <FieldLabel htmlFor="details">{FORM_FIELDS.details.label}</FieldLabel>
                    <SpotlightField rounded="rounded-[28px]">
                      <textarea
                        id="details"
                        rows={4}
                        value={formData.details}
                        placeholder={FORM_FIELDS.details.placeholder}
                        className={`${inputClass} !rounded-[28px] resize-none leading-relaxed`}
                        {...inputHandlers('details')}
                        onChange={(e) => {
                          set('details')(e.target.value);
                          bindTrack(e.target, 'details', trackField);
                        }}
                      />
                    </SpotlightField>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex flex-col items-center gap-4">
            {submitError && (
              <p className="text-center text-sm text-red-400">{submitError}</p>
            )}
            {step < 2 ? (
              <button
                type="button"
                disabled={!validateStep()}
                onClick={goNext}
                className="min-w-[160px] rounded-full border border-white/30 bg-transparent px-10 py-3.5 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white/60 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={!validateStep() || submitting}
                className="min-w-[160px] rounded-full border border-white/30 bg-transparent px-10 py-3.5 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white/60 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
              >
                {submitting ? 'Sending…' : 'Send Enquiry'}
              </button>
            )}
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="text-xs uppercase tracking-widest text-white/30 hover:text-white/60"
              >
                ← Back
              </button>
            )}
          </div>
        </form>

        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === step ? 'w-8 bg-cyan-300/80' : 'w-1 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
