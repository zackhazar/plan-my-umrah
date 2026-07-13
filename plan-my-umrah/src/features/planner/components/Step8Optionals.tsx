'use client';

import { useState } from 'react';
import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Button } from '@/components/ui/button';
import { UserCheck, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { differenceInCalendarDays } from 'date-fns';
import { MUTAWWIF, SAR_RATE } from '@/config/pricing';

const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export function Step8Optionals() {
  const { optionals, toggleOptional, setStep, dates } = usePlannerStore();

  const tripDays =
    dates.departure && dates.return
      ? Math.max(1, differenceInCalendarDays(dates.return, dates.departure))
      : 9;

  const existing = optionals.find((o) => o.id === MUTAWWIF.id);
  const [days, setDays] = useState(existing?.days ?? tripDays);
  const isSelected = Boolean(existing);

  const total = MUTAWWIF.pricePerDay * days;

  const toggle = () => {
    if (existing) {
      toggleOptional(existing); // hapus
    } else {
      toggleOptional({ id: MUTAWWIF.id, serviceName: `${MUTAWWIF.serviceName} (${days} hari)`, price: total, days });
    }
  };

  const changeDays = (n: number) => {
    const d = Math.max(1, n);
    setDays(d);
    if (existing) {
      // perbarui: hapus lalu tambah dengan durasi baru
      toggleOptional(existing);
      toggleOptional({ id: MUTAWWIF.id, serviceName: `${MUTAWWIF.serviceName} (${d} hari)`, price: MUTAWWIF.pricePerDay * d, days: d });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-heading font-bold text-secondary mb-2 tracking-wide">Layanan Tambahan</h2>
        <p className="text-muted-foreground text-sm">Opsional — lengkapi perjalanan Anda dengan pendampingan mutawwif.</p>
      </div>

      <div
        onClick={toggle}
        className={`p-6 rounded-3xl border cursor-pointer transition-all duration-300 ${isSelected ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10' : 'bg-white border-secondary/10 hover:border-primary/40'}`}
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl border ${isSelected ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-accent border-secondary/10 text-secondary/50'}`}>
            <UserCheck className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <h4 className="text-base font-bold text-secondary">{MUTAWWIF.serviceName}</h4>
              {isSelected && <CheckCircle2 className="w-5 h-5 text-primary" />}
            </div>
            <p className="text-xs text-muted-foreground my-1.5 leading-relaxed">{MUTAWWIF.desc}</p>
            <div className="text-sm font-mono text-primary font-bold">
              {MUTAWWIF.priceSarPerDay} SAR/hari &asymp; {rp(MUTAWWIF.pricePerDay)}/hari
              <span className="text-[10px] text-muted-foreground font-sans font-normal ml-2">(kurs Rp {SAR_RATE.toLocaleString('id-ID')})</span>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <span className="text-xs text-secondary/70">Durasi:</span>
                <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg border-secondary/15" onClick={() => changeDays(days - 1)}>-</Button>
                <span className="w-8 text-center font-mono font-bold text-primary">{days}</span>
                <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg border-secondary/15" onClick={() => changeDays(days + 1)}>+</Button>
                <span className="text-xs text-secondary/70">hari</span>
              </div>
              <div className="sm:ml-auto text-sm">
                <span className="text-muted-foreground mr-2">Total:</span>
                <span className="font-mono font-bold text-primary text-base">{rp(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 flex justify-between items-center border-t border-secondary/10">
        <Button onClick={() => setStep(7)} variant="ghost" className="text-secondary/60 hover:text-secondary hover:bg-accent rounded-full px-6">
          <ChevronLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <Button onClick={() => setStep(9)} size="lg" className="bg-primary text-white hover:bg-primary-hover px-10 rounded-full text-sm font-semibold shadow-lg shadow-primary/25">
          Lihat Ringkasan Akhir <ChevronRight className="w-4 h-4 ml-1 inline-block" />
        </Button>
      </div>
    </div>
  );
}
