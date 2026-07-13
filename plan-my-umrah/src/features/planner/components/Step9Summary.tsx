'use client';

import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Button } from '@/components/ui/button';
import { Receipt, Check, ChevronLeft, MessageCircle, Lightbulb } from 'lucide-react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { WHATSAPP_NUMBER, SITE_NAME } from '@/config/pricing';
import { generateItinerary, ITINERARY_TIPS } from '@/features/planner/itinerary';
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
    `👤 *Per Jemaah (${totalPax} pax): ${rp(totalPax > 0 ? Math.round(grandTotal / totalPax) : 0)}*`,
    '',
    'Mohon dibantu penawaran resminya. Terima kasih. 🙏',
  ]
    .filter((line) => line !== null)
    .join('\n');

  const whatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsAppMessage)}`;

  // Itinerary harian D1..Dn — otomatis dari tanggal, urutan kota & hotel
  const itineraryDays = generateItinerary({
    departure: dates.departure,
    returnDate: dates.return,
    arrivalAirport: flight.arrivalAirport,
    makkahNights: hotelMakkah?.nights || 0,
    madinahNights: hotelMadinah?.nights || 0,
    makkahHotel: hotelMakkah?.name,
    madinahHotel: hotelMadinah?.name,
  });

  // Breakdown biaya + persentase (format Ringkasan Penawaran)
  const breakdown = [
    { label: `Tiket Pesawat (${paxCount} Pax)`, total: flightTotal },
    { label: `Hotel Makkah (${hotelMakkah?.nights || 0} Malam)`, total: makkahTotal },
    { label: `Hotel Madinah (${hotelMadinah?.nights || 0} Malam)`, total: madinahTotal },
    { label: `Transportasi (${transport.length} Rute)`, total: transportTotal },
    { label: `Visa + Siskopatuh (${totalPax} Pax)${visa?.brnApproval ? ' + BRN' : ''}`, total: visaTotal },
    { label: 'Layanan Ekstra', total: optionalTotal },
  ];
  const pct = (n: number) => (grandTotal > 0 ? `${Math.round((n / grandTotal) * 100)}%` : '—');
  const perPax = totalPax > 0 ? Math.round(grandTotal / totalPax) : 0;

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center">
        <div className="inline-flex p-3 bg-green-500/10 rounded-full mb-4 border border-green-500/20 print:hidden">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-heading font-bold text-secondary mb-2 tracking-wide">Estimasi Selesai!</h2>
        <p className="text-muted-foreground text-sm">Berikut rincian perkiraan biaya &amp; itinerary Umrah Mandiri Anda.</p>
      </div>

      {/* Itinerary Harian */}
      <div className="bg-accent/60 rounded-3xl border border-secondary/10 p-6">
        <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-5">Itinerary Harian ({itineraryDays.length} Hari)</h3>
        <div className="space-y-0">
          {itineraryDays.map((day, i) => {
            const last = i === itineraryDays.length - 1;
            return (
              <div key={day.day} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xs font-mono font-bold border ${day.city === 'Perjalanan' ? 'bg-secondary text-primary border-secondary' : 'bg-primary/10 text-primary border-primary/20'}`}>
                    D{day.day}
                  </div>
                  {!last && <div className="w-px flex-1 bg-primary/20 my-1" />}
                </div>
                <div className={`min-w-0 flex-1 ${last ? '' : 'pb-6'}`}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <span className="text-sm font-bold text-secondary">{day.title}</span>
                    <span className="text-[11px] text-muted-foreground font-mono">{fmtDate(day.date)}{day.city !== 'Perjalanan' ? ` · ${day.city}` : ''}</span>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {day.items.map((item) => (
                      <li key={item} className="text-xs text-foreground/60 leading-relaxed flex gap-2">
                        <span className="text-primary mt-0.5 shrink-0">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips penting */}
      <div className="bg-white rounded-3xl border border-secondary/10 p-6">
        <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" /> Tips Penting
        </h3>
        <ul className="space-y-2">
          {ITINERARY_TIPS.map((tip) => (
            <li key={tip} className="text-xs text-foreground/60 leading-relaxed flex gap-2">
              <span className="text-primary mt-0.5 shrink-0">&bull;</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
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
          {breakdown.map((b) => (
            <div key={b.label} className="flex justify-between items-center gap-3 text-sm">
              <span className="text-muted-foreground min-w-0">{b.label}</span>
              <span className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] font-mono text-muted-foreground/70 w-8 text-right">{pct(b.total)}</span>
                <span className="text-secondary font-mono">{rp(b.total)}</span>
              </span>
            </div>
          ))}

          <div className="pt-6 border-t border-secondary/10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <div className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Grand Total Estimasi</div>
              <div className="text-3xl font-mono font-bold text-primary">{rp(grandTotal)}</div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Per Jemaah ({totalPax} pax)</div>
              <div className="text-lg font-mono font-bold text-secondary">{rp(perPax)}</div>
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
