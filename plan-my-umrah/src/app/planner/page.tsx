'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Sparkles } from 'lucide-react';
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
    <div className="theme-dark planner-bg min-h-screen relative flex flex-col antialiased text-foreground">

      <header className="print:hidden sticky top-0 z-40 border-b border-white/6 bg-background/70 backdrop-blur-xl">
        <div className="container max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center gap-4 md:gap-8">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center border border-white/10 transition-colors group-hover:border-primary/40">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="font-heading text-base md:text-lg font-bold tracking-[0.18em] text-foreground hidden sm:block">
              PLAN MY UMRAH
            </span>
          </Link>

          <div className="flex-1 flex items-center gap-4">
            <div className="relative h-1.5 flex-1 bg-white/6 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-primary/90 uppercase tracking-[0.18em] font-medium shrink-0">
              {step}/{totalSteps} &middot; {STEP_LABELS[step - 1]}
            </span>
          </div>
        </div>

        {/* Step dots (desktop) */}
        <div className="hidden lg:flex container max-w-5xl mx-auto px-6 pb-3 -mt-1 items-center gap-1.5">
          {STEP_LABELS.map((label, i) => {
            const n = i + 1;
            const done = n < step;
            const active = n === step;
            return (
              <div key={label} className="flex-1 flex items-center gap-1.5">
                <div className={`h-1 flex-1 rounded-full transition-colors duration-500 ${done || active ? 'bg-primary/70' : 'bg-white/8'}`} />
                <span className={`text-[9px] uppercase tracking-wider transition-colors duration-500 ${active ? 'text-primary' : done ? 'text-foreground/50' : 'text-foreground/25'}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto py-10 md:py-14 px-4 md:px-6 relative z-10">
        <div className="bg-card border border-white/8 rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl shadow-black/40 backdrop-blur-2xl relative min-h-[520px]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          {mounted ? CurrentStep : null}
        </div>

        <p className="print:hidden text-center text-[11px] text-foreground/30 mt-6 tracking-wide">
          Estimasi tersimpan otomatis di perangkat Anda &mdash; tutup dan lanjutkan kapan saja.
        </p>
      </main>
    </div>
  );
}
