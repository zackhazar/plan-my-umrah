'use client';

import { useState } from 'react';
import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  UserCheck, ChevronLeft, ChevronRight, Check,
  Shirt, Wallet, Utensils, Signal, WashingMachine, Syringe, Plane, PiggyBank,
} from 'lucide-react';
import { differenceInCalendarDays } from 'date-fns';
import { MUTAWWIF, SAR_RATE, OPTIONAL_SERVICES, type OptionalServiceDef } from '@/config/pricing';

const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

const ICONS: Record<OptionalServiceDef['icon'], React.ElementType> = {
  Shirt, Wallet, Utensils, Signal, WashingMachine, Syringe, Plane, PiggyBank,
};

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span className={`w-5 h-5 rounded-md border shrink-0 flex items-center justify-center transition-colors ${checked ? 'bg-primary border-primary' : 'border-secondary/25 bg-white'}`}>
      {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
    </span>
  );
}

// ---- Baris ringkas: ikon + nama + checkbox. Detail harga muncul saat dicentang ----
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
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isSelected ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10' : 'bg-white border-secondary/10 hover:border-primary/40 hover:bg-accent/40'}`}
    >
      {/* Baris ringkas — selalu terlihat */}
      <div onClick={toggle} className="flex items-center gap-3 p-4 cursor-pointer select-none">
        <Checkbox checked={isSelected} />
        <div className={`p-2 rounded-lg border shrink-0 ${isSelected ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-accent border-secondary/10 text-secondary/50'}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm font-semibold text-secondary flex-1 min-w-0 truncate">{def.name}</span>
        {isSelected ? (
          <span className="text-sm font-mono font-bold text-primary whitespace-nowrap">{rp(total)}</span>
        ) : (
          <span className="text-[11px] text-muted-foreground whitespace-nowrap">{rp(def.defaultPrice)}{def.unit !== 'flat' ? '/unit' : ''}</span>
        )}
      </div>

      {/* Detail — hanya muncul saat dicentang */}
      {isSelected && (
        <div className="px-4 pb-4 pt-0 animate-in fade-in slide-in-from-top-1 duration-200" onClick={(e) => e.stopPropagation()}>
          <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">{def.desc}</p>
          <div className="flex items-center gap-3">
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
          </div>
        </div>
      )}
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

      {/* Mutawwif — baris ringkas, detail muncul saat dicentang */}
      <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isMutSelected ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10' : 'bg-white border-secondary/10 hover:border-primary/40'}`}>
        <div onClick={toggleMut} className="flex items-center gap-3 p-4 cursor-pointer select-none">
          <Checkbox checked={isMutSelected} />
          <div className={`p-2 rounded-lg border shrink-0 ${isMutSelected ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-accent border-secondary/10 text-secondary/50'}`}>
            <UserCheck className="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold text-secondary flex-1 min-w-0 truncate">{MUTAWWIF.serviceName}</span>
          {isMutSelected ? (
            <span className="text-sm font-mono font-bold text-primary whitespace-nowrap">{rp(mutTotal)}</span>
          ) : (
            <span className="text-[11px] text-muted-foreground whitespace-nowrap">{MUTAWWIF.priceSarPerDay} SAR/hari</span>
          )}
        </div>

        {isMutSelected && (
          <div className="px-4 pb-4 pt-0 animate-in fade-in slide-in-from-top-1 duration-200" onClick={(e) => e.stopPropagation()}>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">{MUTAWWIF.desc}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs text-secondary/70">Durasi:</span>
                <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg border-secondary/15" onClick={() => changeDays(days - 1)}>-</Button>
                <span className="w-8 text-center font-mono font-bold text-primary">{days}</span>
                <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg border-secondary/15" onClick={() => changeDays(days + 1)}>+</Button>
                <span className="text-xs text-secondary/70">hari</span>
              </div>
              <span className="text-[10px] text-muted-foreground sm:ml-auto">
                &asymp; {rp(MUTAWWIF.pricePerDay)}/hari (kurs Rp {SAR_RATE.toLocaleString('id-ID')})
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Biaya tambahan lain — daftar ringkas */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-secondary">Biaya Tambahan Lain</h3>
        <div className="space-y-2">
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
