'use client';

import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Button } from '@/components/ui/button';
import { Receipt, Check, ChevronLeft, MessageCircle, CalendarDays, Building2, Bus, Globe } from 'lucide-react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { WHATSAPP_NUMBER, SITE_NAME } from '@/config/pricing';

export function Step9Summary() {
  const state = usePlannerStore();
  const { travellers, dates, flight, hotelMakkah, hotelMadinah, transport, visa, optionals, setStep } = state;

  const paxCount = travellers.adults + travellers.children;
  const totalPax = paxCount + travellers.infants;

  const flightTotal = (flight.estimatedPricePerPerson || 0) * paxCount;
  const makkahTotal = (hotelMakkah?.pricePerNight || 0) * (hotelMakkah?.nights || 0);
  const madinahTotal = (hotelMadinah?.pricePerNight || 0) * (hotelMadinah?.nights || 0);
  const transportTotal = (transport[0]?.price || 0) * paxCount;
  const visaTotal = (visa?.price || 0) * totalPax;
  const optionalTotal = optionals.reduce((sum, item) => sum + item.price, 0);

  const grandTotal = flightTotal + makkahTotal + madinahTotal + transportTotal + visaTotal + optionalTotal;

  const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
  const fmtDate = (d: Date | null) => (d ? format(d, 'd MMMM yyyy', { locale: localeId }) : '-');

  const whatsAppMessage = [
    `Assalamu'alaikum, saya membuat estimasi Umrah mandiri via ${SITE_NAME}:`,
    '',
    `👥 Jemaah: ${travellers.adults} Dewasa, ${travellers.children} Anak, ${travellers.infants} Bayi`,
    `📅 Berangkat: ${fmtDate(dates.departure)} — Pulang: ${fmtDate(dates.return)}`,
    `✈️ Tiket (${flight.departureAirport || '-'} → ${flight.arrivalAirport}): ${rp(flightTotal)} (${paxCount} pax)`,
    `🕋 Hotel Makkah: ${hotelMakkah?.name || '-'} (${hotelMakkah?.nights || 0} malam) — ${rp(makkahTotal)}`,
    `🕌 Hotel Madinah: ${hotelMadinah?.name || '-'} (${hotelMadinah?.nights || 0} malam) — ${rp(madinahTotal)}`,
    `🚌 Transportasi: ${transport[0]?.vehicle || '-'} — ${rp(transportTotal)}`,
    `🛂 Visa: ${visa?.type || '-'} — ${rp(visaTotal)}`,
    optionals.length > 0
      ? `➕ Layanan ekstra: ${optionals.map((o) => o.serviceName).join(', ')} — ${rp(optionalTotal)}`
      : null,
    '',
    `💰 *Grand Total Estimasi: ${rp(grandTotal)}*`,
    '',
    'Mohon dibantu penawaran resminya. Terima kasih. 🙏',
  ]
    .filter((line) => line !== null)
    .join('\n');

  const whatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsAppMessage)}`;

  const itinerary = [
    { icon: CalendarDays, label: 'Jadwal', value: `${fmtDate(dates.departure)} — ${fmtDate(dates.return)}` },
    { icon: Building2, label: 'Makkah', value: `${hotelMakkah?.name || '-'} · ${hotelMakkah?.nights || 0} malam` },
    { icon: Building2, label: 'Madinah', value: `${hotelMadinah?.name || '-'} · ${hotelMadinah?.nights || 0} malam` },
    { icon: Bus, label: 'Transportasi', value: transport[0]?.vehicle || '-' },
    { icon: Globe, label: 'Visa', value: visa?.type || '-' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center">
        <div className="inline-flex p-3 bg-green-500/10 rounded-full mb-4 border border-green-500/20 print:hidden">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-3xl font-heading font-bold text-white mb-2 tracking-wide">Estimasi Selesai!</h2>
        <p className="text-white/50 text-sm">Berikut rincian perkiraan biaya Umrah Mandiri Anda.</p>
      </div>

      {/* Rencana Perjalanan */}
      <div className="bg-white/[0.035] rounded-3xl border border-white/5 p-6">
        <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Rencana Perjalanan</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {itinerary.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3 text-sm">
                <Icon className="w-4 h-4 text-primary shrink-0" />
                <span className="text-white/40 w-28 shrink-0">{item.label}</span>
                <span className="text-white/90">{item.value}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white/[0.035] rounded-3xl border border-white/5 overflow-hidden">
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
            <span className="text-white font-mono">{rp(flightTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Hotel Makkah ({hotelMakkah?.nights || 0} Malam)</span>
            <span className="text-white font-mono">{rp(makkahTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Hotel Madinah ({hotelMadinah?.nights || 0} Malam)</span>
            <span className="text-white font-mono">{rp(madinahTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Transportasi ({paxCount} Pax)</span>
            <span className="text-white font-mono">{rp(transportTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Visa & Dokumen ({totalPax} Pax)</span>
            <span className="text-white font-mono">{rp(visaTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Layanan Ekstra</span>
            <span className="text-white font-mono">{rp(optionalTotal)}</span>
          </div>

          <div className="pt-6 border-t border-white/10 flex justify-between items-end">
            <div>
              <div className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Grand Total Estimasi</div>
              <div className="text-3xl font-mono font-bold text-primary">{rp(grandTotal)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Utama: WhatsApp */}
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="print:hidden flex items-center justify-center gap-3 w-full h-16 rounded-full bg-[#25D366] hover:bg-[#1EBE5A] text-black text-base font-bold transition-all duration-300 shadow-[0_0_30px_rgba(37,211,102,0.25)]"
      >
        <MessageCircle className="w-6 h-6" />
        Konsultasikan Estimasi Ini via WhatsApp
      </a>

      <div className="pt-2 flex gap-4 print:hidden">
        <Button onClick={() => setStep(8)} variant="ghost" className="text-white/60 hover:text-white rounded-full flex-1 h-14 border border-white/5">
          <ChevronLeft className="w-4 h-4 mr-2" /> Revisi Data
        </Button>
        <Button onClick={() => window.print()} variant="outline" className="border-white/10 text-white/80 hover:bg-white/5 rounded-full flex-1 h-14 font-medium">
          Cetak / Simpan PDF
        </Button>
      </div>
    </div>
  );
}
