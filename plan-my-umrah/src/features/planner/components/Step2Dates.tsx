'use client';

import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarDays, ChevronLeft, MoonStar } from 'lucide-react';
import { format, differenceInCalendarDays } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import type { DateRange } from 'react-day-picker';

export function Step2Dates() {
  const { dates, updateDates, setStep } = usePlannerStore();

  const handleNext = () => setStep(3);
  const handleBack = () => setStep(1);

  const range: DateRange | undefined = dates.departure
    ? { from: dates.departure, to: dates.return || undefined }
    : undefined;

  const tripDays =
    dates.departure && dates.return
      ? differenceInCalendarDays(dates.return, dates.departure) + 1
      : 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-heading font-bold text-secondary mb-2 tracking-wide">
          Kapan Anda Berencana Berangkat?
        </h2>
        <p className="text-muted-foreground text-sm">
          Klik tanggal <strong>berangkat</strong>, lalu klik tanggal <strong>pulang</strong> — cukup di satu kalender.
        </p>
      </div>

      <div className="bg-accent/60 p-5 rounded-2xl border border-secondary/10 flex flex-col items-center">
        <div className="flex items-center gap-3 w-full mb-4 pb-3 border-b border-secondary/10">
          <CalendarDays className="text-primary w-4 h-4" />
          <h3 className="text-sm font-medium text-secondary">Tanggal Berangkat &amp; Pulang</h3>
        </div>
        <Calendar
          mode="range"
          numberOfMonths={2}
          selected={range}
          onSelect={(r) => updateDates(r?.from || null, r?.to || null)}
          disabled={(date) => date < new Date()}
          className="rounded-md"
        />
      </div>

      {dates.departure && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 bg-primary/10 border border-primary/20 rounded-xl px-5 py-4 text-sm">
            <div className="text-xs text-muted-foreground mb-1">Berangkat</div>
            <div className="font-semibold text-secondary">{format(dates.departure, 'EEEE, d MMMM yyyy', { locale: localeId })}</div>
          </div>
          <div className="flex-1 bg-primary/10 border border-primary/20 rounded-xl px-5 py-4 text-sm">
            <div className="text-xs text-muted-foreground mb-1">Pulang</div>
            <div className="font-semibold text-secondary">
              {dates.return ? format(dates.return, 'EEEE, d MMMM yyyy', { locale: localeId }) : 'Pilih tanggal pulang…'}
            </div>
          </div>
          {tripDays > 0 && (
            <div className="flex items-center gap-2 bg-secondary text-secondary-foreground rounded-xl px-5 py-4 text-sm font-semibold">
              <MoonStar className="w-4 h-4 text-primary" /> {tripDays} Hari
            </div>
          )}
        </div>
      )}

      <div className="pt-6 border-t border-secondary/10 flex justify-between items-center">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="text-secondary/60 hover:text-secondary hover:bg-accent rounded-full px-6"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <Button
          onClick={handleNext}
          disabled={!dates.departure || !dates.return}
          size="lg"
          className="bg-primary text-white hover:bg-primary-hover disabled:opacity-30 px-10 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg shadow-primary/25"
        >
          Lanjutkan ke Tiket Pesawat
        </Button>
      </div>
    </div>
  );
}
