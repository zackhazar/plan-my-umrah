'use client';

import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaneTakeoff, PlaneLanding, ChevronLeft, ChevronRight } from 'lucide-react';

export function Step3Flights() {
  const { flight, updateFlight, setStep, travellers } = usePlannerStore();
  
  const totalTravellers = travellers.adults + travellers.children; // Bayi biasanya gratis atau flat rate kecil, kita abaikan dulu untuk estimasi kasar

  const handleNext = () => setStep(4);
  const handleBack = () => setStep(2);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-serif font-bold text-white mb-2 tracking-wide">Estimasi Tiket Pesawat</h2>
        <p className="text-white/50 text-sm">Masukkan detail penerbangan Anda. Kami menggunakan ini untuk memastikan total estimasi (Grand Total) Anda akurat.</p>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Bandara Keberangkatan */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-white/70 flex items-center gap-2">
              <PlaneTakeoff className="w-4 h-4 text-primary" /> Bandara Asal
            </label>
            <Input 
              placeholder="Cth: CGK (Jakarta)" 
              value={flight.departureAirport}
              onChange={(e) => updateFlight({ departureAirport: e.target.value })}
              className="bg-[#121212] border-white/10 text-white h-12 rounded-xl focus-visible:ring-primary"
            />
          </div>

          {/* Bandara Kedatangan */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-white/70 flex items-center gap-2">
              <PlaneLanding className="w-4 h-4 text-primary" /> Bandara Tujuan
            </label>
            <select 
              className="w-full bg-[#121212] border border-white/10 text-white h-12 rounded-xl px-4 focus-visible:ring-primary outline-none"
              value={flight.arrivalAirport}
              onChange={(e) => updateFlight({ arrivalAirport: e.target.value })}
            >
              <option value="JED">Jeddah (JED)</option>
              <option value="MED">Madinah (MED)</option>
            </select>
          </div>
        </div>

        {/* Harga Tiket */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-white/5 mt-8">
          <label className="text-sm font-medium text-white/70 block mb-4">Estimasi Harga Tiket (Pulang-Pergi) per Orang</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-medium">Rp</span>
            <Input 
              type="number"
              placeholder="0"
              value={flight.estimatedPricePerPerson || ''}
              onChange={(e) => updateFlight({ estimatedPricePerPerson: Number(e.target.value), isManualOverride: true })}
              className="bg-black/50 border-white/10 text-white h-14 rounded-xl pl-12 text-lg focus-visible:ring-primary"
            />
          </div>
          
          {/* Kalkulasi Otomatis */}
          {flight.estimatedPricePerPerson > 0 && (
            <div className="mt-6 text-sm flex justify-between items-center bg-primary/10 px-5 py-4 rounded-xl border border-primary/20">
              <span className="text-white/80">Total Tiket ({totalTravellers} Pax x Rp {flight.estimatedPricePerPerson.toLocaleString('id-ID')}):</span>
              <span className="font-bold font-mono text-primary text-lg">Rp {(flight.estimatedPricePerPerson * totalTravellers).toLocaleString('id-ID')}</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 flex justify-between items-center">
        <Button onClick={handleBack} variant="ghost" className="text-white/60 hover:text-white hover:bg-white/5 rounded-full px-6">
          <ChevronLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <Button onClick={handleNext} disabled={!flight.departureAirport || flight.estimatedPricePerPerson <= 0} size="lg" className="bg-primary text-black hover:bg-primary-hover px-10 rounded-full text-sm font-semibold">
          Lanjut ke Hotel Makkah <ChevronRight className="w-4 h-4 ml-1 inline-block" />
        </Button>
      </div>
    </div>
  );
}