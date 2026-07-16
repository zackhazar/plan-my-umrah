'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { LogoFull } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Step1Travellers } from '@/features/planner/components/Step1Travellers';
import { Step2Dates } from '@/features/planner/components/Step2Dates';
import { Step3Flights } from '@/features/planner/components/Step3Flights';
import { Step4HotelMakkah } from '@/features/planner/components/Step4HotelMakkah';
import { Step5HotelMadinah } from '@/features/planner/components/Step5HotelMadinah';
import { Step6Transport } from '@/features/planner/components/Step6Transport';
import { Step7Visa } from '@/features/planner/components/Step7Visa';
import { Step8Optionals } from '@/features/planner/components/Step8Optionals';
import { Step9Summary } from '@/features/planner/components/Step9Summary';

const STEP_LABELS = [
  'Jemaah',
  'Tanggal',
  'Pesawat',
  'Makkah',
  'Madinah',
  'Transport',
  'Visa',
  'Ekstra',
  'Ringkasan',
];

export default function PlannerWizard() {
  const storeStep = usePlannerStore((state) => state.step);

  // Guard hidrasi: state ter-persist di localStorage bisa berbeda dari hasil SSR,
  // jadi render konten wizard hanya setelah mount di client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const step = mounted ? storeStep : 1;
  const totalSteps = 9;
  const progress = useMemo(() => (step / totalSteps) * 100, [step, totalSteps]);

  const CurrentStep = useMemo(() => {
    switch (step) {
      case 1: return <Step1Travellers />;
      case 2: return <Step2Dates />;
      case 3: return <Step3Flights />;
      case 4: return <Step4HotelMakkah />;
      case 5: return <Step5HotelMadinah />;
      case 6: return <Step6Transport />;
      case 7: return <Step7Visa />;
      case 8: return <Step8Optionals />;
      case 9: return <Step9Summary />;
      default: return <Step1Travellers />;
    }
  }, [step]);

  return (
    <div className="planner-bg min-h-screen relative flex flex-col antialiased text-foreground">

      <header className="print:hidden sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center gap-4 md:gap-8">
          <Link href="/" className="shrink-0">
            <LogoFull markClass="w-9 h-9" />
          </Link>

          <div className="flex-1 flex items-center gap-4">
            <div className="relative h-1.5 flex-1 bg-secondary/10 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-primary uppercase tracking-[0.18em] font-semibold shrink-0">
              {step}/{totalSteps} &middot; {STEP_LABELS[step - 1]}
            </span>
          </div>

          <ThemeToggle />
        </div>

        {/* Step dots (desktop) */}
        <div className="hidden lg:flex container max-w-5xl mx-auto px-6 pb-3 -mt-1 items-center gap-1.5">
          {STEP_LABELS.map((label, i) => {
            const n = i + 1;
            const done = n < step;
            const active = n === step;
            return (
              <div key={label} className="flex-1 flex items-center gap-1.5">
                <div className={`h-1 flex-1 rounded-full transition-colors duration-500 ${done || active ? 'bg-primary/70' : 'bg-secondary/10'}`} />
                <span className={`text-[9px] uppercase tracking-wider transition-colors duration-500 ${active ? 'text-primary font-bold' : done ? 'text-secondary/60' : 'text-secondary/30'}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto py-10 md:py-14 px-4 md:px-6 relative z-10">
        <div className="bg-card/95 backdrop-blur-xl border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-[0_30px_80px_-24px_rgba(18,51,46,0.22),0_10px_30px_-15px_rgba(185,146,79,0.15)] ring-1 ring-secondary/5 relative min-h-[520px]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/[0.04] to-transparent rounded-t-[2rem] md:rounded-t-[2.5rem] pointer-events-none" />
          {mounted ? CurrentStep : null}
        </div>

        <p className="print:hidden text-center text-[11px] text-secondary/40 mt-6 tracking-wide">
          Estimasi tersimpan otomatis di perangkat Anda &mdash; tutup dan lanjutkan kapan saja.
        </p>
      </main>
    </div>
  );
}
