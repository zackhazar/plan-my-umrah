'use client';

import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Button } from '@/components/ui/button';
import { Receipt, Check, Printer, ChevronLeft } from 'lucide-react';

export function Step9Summary() {
  const state = usePlannerStore();
  const { travellers, flight, hotelMakkah, hotelMadinah, transport, visa, optionals, setStep } = state;

  const paxCount = travellers.adults + travellers.children;
  const totalPax = paxCount + travellers.infants;

  const flightTotal = (flight.estimatedPricePerPerson || 0) * paxCount;
  const makkahTotal = (hotelMakkah?.pricePerNight || 0) * (hotelMakkah?.nights || 0);
  const madinahTotal = (hotelMadinah?.pricePerNight || 0) * (hotelMadinah?.nights || 0);
  const transportTotal = (transport[0]?.price || 0) * paxCount;
  const visaTotal = (visa?.price || 0) * totalPax;
  const optionalTotal = optionals.reduce((sum, item) => sum + item.price, 0);

  const grandTotal = flightTotal + makkahTotal + madinahTotal + transportTotal + visaTotal + optionalTotal;

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center">
        <div className="inline-flex p-3 bg-green-500/10 rounded-full mb-4 border border-green-500/20">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-white mb-2 tracking-wide">Estimasi Selesai!</h2>
        <p className="text-white/50 text-sm">Berikut rincian perkiraan biaya Umrah Mandiri Anda.</p>
      </div>

      <div className="bg-[#121212] rounded-3xl border border-white/5 overflow-hidden">
        <div className="p-6 bg-primary/5 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Receipt className="w-5 h-5 text-primary" />
            <span className="font-bold text-white tracking-wider">RINCIAN ESTIMASI</span>
          </div>
          <span className="text-xs text-white/40">{totalPax} Jemaah</span>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Tiket Pesawat ({paxCount} Pax)</span>
            <span className="text-white font-mono">Rp {flightTotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Hotel Makkah ({hotelMakkah?.nights} Malam)</span>
            <span className="text-white font-mono">Rp {makkahTotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Hotel Madinah ({hotelMadinah?.nights} Malam)</span>
            <span className="text-white font-mono">Rp {madinahTotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Transportasi ({paxCount} Pax)</span>
            <span className="text-white font-mono">Rp {transportTotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Visa & Dokumen ({totalPax} Pax)</span>
            <span className="text-white font-mono">Rp {visaTotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Layanan Ekstra</span>
            <span className="text-white font-mono">Rp {optionalTotal.toLocaleString('id-ID')}</span>
          </div>
          
          <div className="pt-6 border-t border-white/10 flex justify-between items-end">
            <div>
              <div className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Grand Total Estimasi</div>
              <div className="text-3xl font-mono font-bold text-primary">Rp {grandTotal.toLocaleString('id-ID')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 flex gap-4">
        <Button onClick={() => setStep(8)} variant="ghost" className="text-white/60 hover:text-white rounded-full flex-1 h-14 border border-white/5">
          <ChevronLeft className="w-4 h-4 mr-2" /> Revisi Data
        </Button>
        <Button onClick={() => window.print()} className="bg-primary text-black hover:bg-primary-hover rounded-full flex-1 h-14 font-bold">
          Cetak PDF
        </Button>
      </div>
    </div>
  );
}