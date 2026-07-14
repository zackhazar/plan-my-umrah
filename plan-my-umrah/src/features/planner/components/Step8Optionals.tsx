'use client';

import { useState } from 'react';
import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  UserCheck, ChevronLeft, ChevronRight, CheckCircle2,
  Shirt, Wallet, Utensils, Signal, WashingMachine, Syringe, Plane, PiggyBank,
} from 'lucide-react';
import { differenceInCalendarDays } from 'date-fns';
import { MUTAWWIF, SAR_RATE, OPTIONAL_SERVICES, type OptionalServiceDef } from '@/config/pricing';

const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

const ICONS: Record<OptionalServiceDef['icon'], React.ElementType> = {
  Shirt, Wallet, Utensils, Signal, WashingMachine, Syringe, Plane, PiggyBank,
};

// ---- Kartu layanan opsional editable ----
function OptionalCard({ def, paxCount, tripDays }: { def: OptionalServiceDef; paxCount: number; tripDays: number }) {
  const { optionals, toggleOptional } = usePlannerStore();
  const existing = optionals.find((o) => o.id === def.id);
  const isSelected = Boolean(existing);
  const Icon = ICONS[def.icon];

  const qty = def.unit === 'per_pax' ? Math.max(1, paxCount) : def.unit === 'per_day_pax' ? Math.max(1, paxCount) * Math.max(1, tripDays) : 1;
  const qtyLabel = def.unit === 'per_pax' ? `× ${Math.max(1, paxCount)} pax` : def.unit === 'per_day_pax' ? `× ${Math.max(1, tripDays)} hari × ${Math.max(1, paxCount)} pax` : 'sekali';

  const [unitPrice, setUnitPrice] = useState<number>(existing?.unitPrice ?? def.defaultPrice);
  const total = unitPrice * qty;

  const commit = (price: number) => {
    // hapus dulu jika ada, lalu tambah dengan harga terbaru
    if (existing) toggleOptional(existing);
    toggleOptional({ id: def.id, serviceName: def.name, price: price * qty, unitPrice: price });
  };

  const toggle = () => {
    if (existing) toggleOptional(existing);
    else toggleOptional({ id: def.id, serviceName: def.name, price: total, unitPrice });
  };

  const onPriceChange = (v: string) => {
    const p = Number(v) || 0;
    setUnitPrice(p);
    if (existing) commit(p);
  };

  return (
    <div
      onClick={toggle}
      className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${isSelected ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10' : 'bg-white border-secondary/10 hover:border-primary/40 hover:bg-accent/40'}`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-xl border shrink-0 ${isSelected ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-accent border-secondary/10 text-secondary/50'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-bold text-secondary">{def.name}</h4>
            {isSelected && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />}
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{def.desc}</p>

          <div className="mt-3 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <div className="relative flex-1 max-w-[180px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">Rp</span>
              <Input
                type="number"
                value={unitPrice || ''}
                onChange={(e) => onPriceChange(e.target.value)}
                className="bg-white border-secondary/15 text-secondary h-9 rounded-lg pl-8 text-sm"
              />
            </div>
            <span className="text-[11px] text-muted-foreground whitespace-nowrap">{qtyLabel}</span>
            {isSelected && (
              <span className="ml-auto text-sm font-mono font-bold text-primary whitespace-nowrap">{rp(total)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Step8Optionals() {
  const { optionals, toggleOptional, setStep, dates, travellers } = usePlannerStore();

  const paxCount = travellers.adults + travellers.children + travellers.infants;
  const tripDays =
    dates.departure && dates.return
      ? Math.max(1, differenceInCalendarDays(dates.return, dates.departure))
      : 9;

  // --- Mutawwif (per hari, SAR) ---
  const existingMut = optionals.find((o) => o.id === MUTAWWIF.id);
  const [days, setDays] = useState(existingMut?.days ?? tripDays);
  const isMutSelected = Boolean(existingMut);
  const mutTotal = MUTAWWIF.pricePerDay * days;

  const toggleMut = () => {
    if (existingMut) toggleOptional(existingMut);
    else toggleOptional({ id: MUTAWWIF.id, serviceName: `${MUTAWWIF.serviceName} (${days} hari)`, price: mutTotal, days });
  };
  const changeDays = (n: number) => {
    const d = Math.max(1, n);
    setDays(d);
    if (existingMut) {
      toggleOptional(existingMut);
      toggleOptional({ id: MUTAWWIF.id, serviceName: `${MUTAWWIF.serviceName} (${d} hari)`, price: MUTAWWIF.pricePerDay * d, days: d });
    }
  };

  const optionalTotal = optionals.reduce((s, o) => s + o.price, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-heading font-bold text-secondary mb-2 tracking-wide">Layanan &amp; Biaya Tambahan</h2>
        <p className="text-muted-foreground text-sm">Opsional — centang yang Anda butuhkan. Harga bisa Anda sesuaikan sendiri.</p>
      </div>

      {/* Mutawwif */}
      <div
        onClick={toggleMut}
        className={`p-6 rounded-3xl border cursor-pointer transition-all duration-300 ${isMutSelected ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10' : 'bg-white border-secondary/10 hover:border-primary/40'}`}
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl border ${isMutSelected ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-accent border-secondary/10 text-secondary/50'}`}>
            <UserCheck className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <h4 className="text-base font-bold text-secondary">{MUTAWWIF.serviceName}</h4>
              {isMutSelected && <CheckCircle2 className="w-5 h-5 text-primary" />}
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
                <span className="font-mono font-bold text-primary text-base">{rp(mutTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Biaya tambahan lain */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-secondary">Biaya Tambahan Lain</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {OPTIONAL_SERVICES.map((def) => (
            <OptionalCard key={def.id} def={def} paxCount={paxCount} tripDays={tripDays} />
          ))}
        </div>
      </div>

      {/* Total ekstra */}
      {optionalTotal > 0 && (
        <div className="text-sm flex justify-between items-center bg-primary/10 px-5 py-4 rounded-xl border border-primary/20">
          <span className="text-secondary/80">Total Layanan &amp; Biaya Tambahan:</span>
          <span className="font-bold font-mono text-primary text-lg">{rp(optionalTotal)}</span>
        </div>
      )}

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
