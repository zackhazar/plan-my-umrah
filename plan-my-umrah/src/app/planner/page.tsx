'use client';

import { useMemo } from 'react';
import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Step1Travellers } from '@/features/planner/components/Step1Travellers';
import { Step2Dates } from '@/features/planner/components/Step2Dates';
import { Step3Flights } from '@/features/planner/components/Step3Flights';
import { Step4HotelMakkah } from '@/features/planner/components/Step4HotelMakkah';
import { Step5HotelMadinah } from '@/features/planner/components/Step5HotelMadinah';
import { Step6Transport } from '@/features/planner/components/Step6Transport';
import { Step7Visa } from '@/features/planner/components/Step7Visa';
import { Step8Optionals } from '@/features/planner/components/Step8Optionals';
import { Step9Summary } from '@/features/planner/components/Step9Summary';

export default function PlannerWizard() {
  const step = usePlannerStore((state) => state.step);
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
    <div className="min-h-screen relative flex flex-col antialiased overflow-hidden">
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-40 mix-blend-screen" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none opacity-30 mix-blend-screen" />

      <header className="h-20 border-b border-primary/20 flex items-center px-8 sticky top-0 bg-background/60 backdrop-blur-xl z-40">
        <div className="font-heading text-2xl font-bold bg-gradient-to-r from-white via-primary to-primary bg-clip-text text-transparent tracking-widest mr-12">
          PLAN MY UMRAH
        </div>
        <div className="flex-1 max-w-2xl mx-auto flex items-center gap-6">
          <span className="text-xs font-mono text-primary/80 uppercase tracking-widest w-28 font-medium">
            Tahap {step} / {totalSteps}
          </span>
          <div className="relative h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/50 to-primary transition-all duration-700 ease-out shadow-[0_0_10px_#E5C158]" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto py-16 px-6 flex flex-col justify-center relative z-10">
        <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-14 shadow-2xl backdrop-blur-2xl relative min-h-[500px] ring-1 ring-white/10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          {CurrentStep}
        </div>
      </main>
    </div>
  );
}