'use client';

import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaneTakeoff, PlaneLanding, Plane, ChevronLeft, ChevronRight } from 'lucide-react';
import { SAUDI_AIRPORTS } from '@/config/pricing';

export function Step3Flights() {
  const { flight, updateFlight, setStep, travellers } = usePlannerStore();

  const paxCount = travellers.adults + travellers.children; // bayi biasanya gratis/flat kecil

  const handleNext = () => setStep(4);
  const handleBack = () => setStep(2);

  const selectClass =
    'w-full bg-white border border-secondary/15 text-secondary h-12 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary/40';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-heading font-bold text-secondary mb-2 tracking-wide">Penerbangan</h2>
        <p className="text-muted-foreground text-sm">
          Tentukan bandara asal, bandara tiba, dan bandara kepulangan dari Arab Saudi — ini juga dipakai untuk menyusun itinerary Anda.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Bandara asal (Indonesia) */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-secondary/80 flex items-center gap-2">
              <PlaneTakeoff className="w-4 h-4 text-primary" /> Bandara Asal (Indonesia)
            </label>
            <Input
              placeholder="Cth: CGK (Jakarta)"
              value={flight.departureAirport}
              onChange={(e) => updateFlight({ departureAirport: e.target.value })}
              className="bg-white border-secondary/15 text-secondary h-12 rounded-xl focus-visible:ring-primary"
            />
          </div>

          {/* Bandara tiba di Saudi */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-secondary/80 flex items-center gap-2">
              <PlaneLanding className="w-4 h-4 text-primary" /> Bandara Tujuan (Tiba di Saudi)
            </label>
            <select
              className={selectClass}
              value={flight.arrivalAirport}
              onChange={(e) => {
                const code = e.target.value;
                // Jika pulang tidak dibedakan, samakan bandara kepulangan (PP)
                updateFlight(flight.returnDifferent ? { arrivalAirport: code } : { arrivalAirport: code, returnAirport: code });
              }}
            >
              {SAUDI_AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>{a.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Toggle: bandara pulang berbeda */}
        <label className="flex items-start gap-3 cursor-pointer select-none bg-accent/60 border border-secondary/10 rounded-2xl px-5 py-4">
          <input
            type="checkbox"
            checked={flight.returnDifferent}
            onChange={(e) => {
              const on = e.target.checked;
              if (on) {
                // default bandara pulang = bandara lain agar terlihat beda
                const other = flight.arrivalAirport === 'JED' ? 'MED' : 'JED';
                updateFlight({ returnDifferent: true, returnAirport: flight.returnAirport !== flight.arrivalAirport ? flight.returnAirport : other });
              } else {
                updateFlight({ returnDifferent: false, returnAirport: flight.arrivalAirport });
              }
            }}
            className="mt-0.5 w-4 h-4 accent-[var(--primary)]"
          />
          <span>
            <span className="text-sm font-medium text-secondary block">Pulang dari bandara yang berbeda?</span>
            <span className="text-[11px] text-muted-foreground">
              Centang jika kepulangan dari kota/bandara lain (mis. tiba di Jeddah, pulang dari Madinah). Jika tidak dicentang = pulang-pergi lewat bandara yang sama.
            </span>
          </span>
        </label>

        {/* Bandara kepulangan (hanya jika berbeda) */}
        {flight.returnDifferent && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="text-sm font-medium text-secondary/80 flex items-center gap-2">
              <Plane className="w-4 h-4 text-primary" /> Bandara Kepulangan (dari Saudi)
            </label>
            <select
              className={`${selectClass} md:max-w-md`}
              value={flight.returnAirport}
              onChange={(e) => updateFlight({ returnAirport: e.target.value })}
            >
              {SAUDI_AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>{a.label}</option>
              ))}
            </select>
            <p className="text-[11px] text-muted-foreground">Dari bandara mana Anda terbang pulang ke Indonesia.</p>
          </div>
        )}

        {/* Harga tiket */}
        <div className="bg-accent/60 p-6 rounded-2xl border border-secondary/10 mt-8">
          <label className="text-sm font-medium text-secondary/80 block mb-4">Estimasi Harga Tiket (Pulang-Pergi) per Orang</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">Rp</span>
            <Input
              type="number"
              placeholder="0"
              value={flight.estimatedPricePerPerson || ''}
              onChange={(e) => updateFlight({ estimatedPricePerPerson: Number(e.target.value), isManualOverride: true })}
              className="bg-white border-secondary/15 text-secondary h-14 rounded-xl pl-12 text-lg focus-visible:ring-primary"
            />
          </div>

          {flight.estimatedPricePerPerson > 0 && (
            <div className="mt-6 text-sm flex justify-between items-center bg-primary/10 px-5 py-4 rounded-xl border border-primary/20">
              <span className="text-secondary/80">Total Tiket ({paxCount} Pax x Rp {flight.estimatedPricePerPerson.toLocaleString('id-ID')}):</span>
              <span className="font-bold font-mono text-primary text-lg">Rp {(flight.estimatedPricePerPerson * paxCount).toLocaleString('id-ID')}</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 border-t border-secondary/10 flex justify-between items-center">
        <Button onClick={handleBack} variant="ghost" className="text-secondary/60 hover:text-secondary hover:bg-accent rounded-full px-6">
          <ChevronLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <Button onClick={handleNext} disabled={!flight.departureAirport || flight.estimatedPricePerPerson <= 0} size="lg" className="bg-primary text-white hover:bg-primary-hover px-10 rounded-full text-sm font-semibold shadow-lg shadow-primary/25">
          Lanjut ke Hotel Makkah <ChevronRight className="w-4 h-4 ml-1 inline-block" />
        </Button>
      </div>
    </div>
  );
}
