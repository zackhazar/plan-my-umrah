'use client';

import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarDays, ChevronLeft } from 'lucide-react';

export function Step2Dates() {
  const { dates, updateDates, setStep } = usePlannerStore();

  const handleNext = () => setStep(3);
  const handleBack = () => setStep(1);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-heading font-bold text-white mb-2 tracking-wide">
          Kapan Anda Berencana Berangkat?
        </h2>
        <p className="text-white/50 text-sm">
          Pilih perkiraan tanggal keberangkatan dan kepulangan Anda untuk membantu kami menghitung penyesuaian tarif hotel musiman.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Kalender Keberangkatan */}
        <div className="bg-white/[0.035] p-5 rounded-2xl border border-white/5 flex flex-col items-center">
          <div className="flex items-center gap-3 w-full mb-4 pb-3 border-b border-white/5">
            <CalendarDays className="text-primary w-4 h-4" />
            <h3 className="text-sm font-medium text-white/80">Tanggal Keberangkatan</h3>
          </div>
          <Calendar
            mode="single"
            selected={dates.departure || undefined}
            onSelect={(date) => updateDates(date || null, dates.return)}
            disabled={(date) => date < new Date()}
            className="text-white rounded-md"
          />
        </div>

        {/* Kalender Kepulangan */}
        <div className="bg-white/[0.035] p-5 rounded-2xl border border-white/5 flex flex-col items-center">
          <div className="flex items-center gap-3 w-full mb-4 pb-3 border-b border-white/5">
            <CalendarDays className="text-primary w-4 h-4" />
            <h3 className="text-sm font-medium text-white/80">Tanggal Kepulangan</h3>
          </div>
          <Calendar
            mode="single"
            selected={dates.return || undefined}
            onSelect={(date) => updateDates(dates.departure, date || null)}
            disabled={(date) => dates.departure ? date <= dates.departure : date < new Date()}
            className="text-white rounded-md"
          />
        </div>
      </div>

      {/* Tombol Navigasi */}
      <div className="pt-6 border-t border-white/5 flex justify-between items-center">
        <Button 
          onClick={handleBack} 
          variant="ghost" 
          className="text-white/60 hover:text-white hover:bg-white/5 rounded-full px-6"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!dates.departure || !dates.return}
          size="lg" 
          className="bg-primary text-black hover:bg-primary-hover disabled:opacity-30 disabled:hover:bg-primary px-10 rounded-full text-sm font-semibold transition-all duration-300 shadow-[0_0_30px_rgba(214,175,55,0.2)]"
        >
          Lanjutkan ke Tiket Pesawat
        </Button>
      </div>
    </div>
  );
}