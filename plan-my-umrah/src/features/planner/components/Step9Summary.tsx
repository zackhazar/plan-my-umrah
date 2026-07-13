'use client';

import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Button } from '@/components/ui/button';
import { Receipt, Check, ChevronLeft, MessageCircle, Building2, Bus, FileCheck2, UserCheck, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { WHATSAPP_NUMBER, SITE_NAME, SAUDI_AIRPORTS } from '@/config/pricing';
import type { TransportSelection } from '@/types/planner.types';

const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export function Step9Summary() {
  const state = usePlannerStore();
  const { travellers, dates, flight, hotelMakkah, hotelMadinah, transport, visa, optionals, setStep } = state;

  const paxCount = travellers.adults + travellers.children;
  const totalPax = paxCount + travellers.infants;

  const legTotal = (t: TransportSelection) =>
    t.unit === 'per_vehicle' ? t.price * t.qty : t.unit === 'per_pax' ? t.price * paxCount : t.price;

  const flightTotal = (flight.estimatedPricePerPerson || 0) * paxCount;
  const makkahTotal = (hotelMakkah?.pricePerNight || 0) * (hotelMakkah?.nights || 0);
  const madinahTotal = (hotelMadinah?.pricePerNight || 0) * (hotelMadinah?.nights || 0);
  const transportTotal = transport.reduce((s, t) => s + legTotal(t), 0);
  const visaTotal = visa ? (visa.pricePerPax + visa.siskopatuhPerPax) * totalPax + visa.brnTotal : 0;
  const optionalTotal = optionals.reduce((sum, item) => sum + item.price, 0);

  const grandTotal = flightTotal + makkahTotal + madinahTotal + transportTotal + visaTotal + optionalTotal;

  const fmtDate = (d: Date | null) => (d ? format(d, 'd MMMM yyyy', { locale: localeId }) : '-');
  const airportLabel = (code: string) => SAUDI_AIRPORTS.find((a) => a.code === code)?.label || code;

  const whatsAppMessage = [
    `Assalamu'alaikum, saya membuat estimasi Umrah mandiri via ${SITE_NAME}:`,
    '',
    `👥 Jemaah: ${travellers.adults} Dewasa, ${travellers.children} Anak, ${travellers.infants} Bayi`,
    `📅 Berangkat: ${fmtDate(dates.departure)} — Pulang: ${fmtDate(dates.return)}`,
    `✈️ Tiket (${flight.departureAirport || '-'} → ${flight.arrivalAirport}, pulang via ${flight.returnAirport}): ${rp(flightTotal)} (${paxCount} pax)`,
    `🕋 Hotel Makkah: ${hotelMakkah?.name || '-'} (${fmtDate(hotelMakkah?.checkIn ?? null)} – ${fmtDate(hotelMakkah?.checkOut ?? null)}, ${hotelMakkah?.nights || 0} malam) — ${rp(makkahTotal)}`,
    `🕌 Hotel Madinah: ${hotelMadinah?.name || '-'} (${fmtDate(hotelMadinah?.checkIn ?? null)} – ${fmtDate(hotelMadinah?.checkOut ?? null)}, ${hotelMadinah?.nights || 0} malam) — ${rp(madinahTotal)}`,
    `🚌 Transportasi (${transport.length} rute):`,
    ...transport.map((t) => `   • ${t.route} — ${t.vehicle}${t.unit === 'per_vehicle' ? ` × ${t.qty} unit` : ''} — ${rp(legTotal(t))}`),
    `🛂 Visa: ${visa?.type || '-'} (${visa?.tierLabel || '-'})${visa?.brnApproval ? ' + Bantuan Approval Hotel BRN' : ''} — ${rp(visaTotal)}`,
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

  // Lampiran itinerary (template kronologis)
  const itinerary: { icon: React.ElementType; title: string; detail: string }[] = [
    {
      icon: PlaneTakeoff,
      title: `Berangkat — ${fmtDate(dates.departure)}`,
      detail: `Penerbangan ${flight.departureAirport || '-'} → ${airportLabel(flight.arrivalAirport)}`,
    },
    ...(hotelMakkah?.name
      ? [{
          icon: Building2,
          title: `Makkah — ${hotelMakkah.name}`,
          detail: `Check-in ${fmtDate(hotelMakkah.checkIn)} · Check-out ${fmtDate(hotelMakkah.checkOut)} (${hotelMakkah.nights} malam)`,
        }]
      : []),
    ...(hotelMadinah?.name
      ? [{
          icon: Building2,
          title: `Madinah — ${hotelMadinah.name}`,
          detail: `Check-in ${fmtDate(hotelMadinah.checkIn)} · Check-out ${fmtDate(hotelMadinah.checkOut)} (${hotelMadinah.nights} malam)`,
        }]
      : []),
    ...transport.map((t) => ({
      icon: Bus,
      title: t.route,
      detail: `${t.vehicle}${t.unit === 'per_vehicle' ? ` × ${t.qty} unit` : t.unit === 'per_pax' ? ` · ${paxCount} pax` : ''}`,
    })),
    ...(visa
      ? [{ icon: FileCheck2, title: visa.type, detail: `Tarif ${visa.tierLabel} + Siskopatuh${visa.brnApproval ? ' + Bantuan Approval Hotel (BRN)' : ''}` }]
      : []),
    ...optionals.map((o) => ({ icon: UserCheck, title: o.serviceName, detail: 'Layanan tambahan' })),
    {
      icon: PlaneLanding,
      title: `Pulang — ${fmtDate(dates.return)}`,
      detail: `Penerbangan ${airportLabel(flight.returnAirport)} → ${flight.departureAirport || 'Indonesia'}`,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center">
        <div className="inline-flex p-3 bg-green-500/10 rounded-full mb-4 border border-green-500/20 print:hidden">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-heading font-bold text-secondary mb-2 tracking-wide">Estimasi Selesai!</h2>
        <p className="text-muted-foreground text-sm">Berikut rincian perkiraan biaya &amp; itinerary Umrah Mandiri Anda.</p>
      </div>

      {/* Lampiran Itinerary */}
      <div className="bg-accent/60 rounded-3xl border border-secondary/10 p-6">
        <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-5">Lampiran Itinerary</h3>
        <div className="space-y-0">
          {itinerary.map((item, i) => {
            const Icon = item.icon;
            const last = i === itinerary.length - 1;
            return (
              <div key={`${item.title}-${i}`} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="p-2 rounded-full bg-primary/10 border border-primary/20 shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  {!last && <div className="w-px flex-1 bg-primary/20 my-1" />}
                </div>
                <div className={`min-w-0 ${last ? '' : 'pb-5'}`}>
                  <div className="text-sm font-semibold text-secondary">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rincian biaya */}
      <div className="bg-white rounded-3xl border border-secondary/10 overflow-hidden shadow-sm">
        <div className="p-6 bg-primary/5 border-b border-secondary/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Receipt className="w-5 h-5 text-primary" />
            <span className="font-bold text-secondary tracking-wider">RINCIAN ESTIMASI</span>
          </div>
          <span className="text-xs text-muted-foreground">{totalPax} Jemaah</span>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tiket Pesawat ({paxCount} Pax)</span>
            <span className="text-secondary font-mono">{rp(flightTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Hotel Makkah ({hotelMakkah?.nights || 0} Malam)</span>
            <span className="text-secondary font-mono">{rp(makkahTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Hotel Madinah ({hotelMadinah?.nights || 0} Malam)</span>
            <span className="text-secondary font-mono">{rp(madinahTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Transportasi ({transport.length} Rute)</span>
            <span className="text-secondary font-mono">{rp(transportTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Visa + Siskopatuh ({totalPax} Pax){visa?.brnApproval ? ' + BRN' : ''}</span>
            <span className="text-secondary font-mono">{rp(visaTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Layanan Ekstra</span>
            <span className="text-secondary font-mono">{rp(optionalTotal)}</span>
          </div>

          <div className="pt-6 border-t border-secondary/10 flex justify-between items-end">
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
        className="print:hidden flex items-center justify-center gap-3 w-full h-16 rounded-full bg-[#25D366] hover:bg-[#1EBE5A] text-white text-base font-bold transition-all duration-300 shadow-lg shadow-[#25D366]/30"
      >
        <MessageCircle className="w-6 h-6" />
        Konsultasikan Estimasi Ini via WhatsApp
      </a>

      <div className="pt-2 flex gap-4 print:hidden">
        <Button onClick={() => setStep(8)} variant="ghost" className="text-secondary/60 hover:text-secondary rounded-full flex-1 h-14 border border-secondary/10">
          <ChevronLeft className="w-4 h-4 mr-2" /> Revisi Data
        </Button>
        <Button onClick={() => window.print()} variant="outline" className="border-secondary/15 text-secondary/80 hover:bg-accent rounded-full flex-1 h-14 font-medium">
          Cetak / Simpan PDF (termasuk Itinerary)
        </Button>
      </div>
    </div>
  );
}
