'use client';

import { useEffect, useState } from 'react';
import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronLeft, ChevronRight, FileCheck2, ShieldCheck, Info } from 'lucide-react';
import { differenceInCalendarDays } from 'date-fns';
import {
  VISA_TIERS,
  VISA_GROUP_35,
  SISKOPATUH_PER_PAX,
  BRN_APPROVAL_SAR_PER_DAY,
  BRN_APPROVAL_SAR_PER_DAY_RAMADHAN,
  VISA_REQUIREMENTS,
  sarToIdr,
} from '@/config/pricing';

const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export function Step7Visa() {
  const { visa, updateVisa, setStep, travellers, dates } = usePlannerStore();

  const totalPax = travellers.adults + travellers.children + travellers.infants;
  const tripDays =
    dates.departure && dates.return
      ? Math.max(1, differenceInCalendarDays(dates.return, dates.departure))
      : 9;

  const tier = VISA_TIERS.find((t) => totalPax >= t.minPax && totalPax <= t.maxPax);
  const isGroup35 = totalPax >= 35;
  const pricePerPax = isGroup35 ? VISA_GROUP_35.pricePerPax : (tier?.pricePerPax ?? VISA_TIERS[0].pricePerPax);
  const tierLabel = isGroup35 ? VISA_GROUP_35.label : (tier?.label ?? '1 pax');

  const [brnApproval, setBrnApproval] = useState(visa?.brnApproval ?? false);
  const [brnIsRamadhan, setBrnIsRamadhan] = useState(visa?.brnIsRamadhan ?? false);

  const brnSarPerDay = brnIsRamadhan ? BRN_APPROVAL_SAR_PER_DAY_RAMADHAN : BRN_APPROVAL_SAR_PER_DAY;
  const brnTotal = brnApproval ? sarToIdr(brnSarPerDay) * tripDays * totalPax : 0;

  const visaTotal = pricePerPax * totalPax;
  const siskoTotal = SISKOPATUH_PER_PAX * totalPax;

  // Sinkronkan pilihan ke store setiap ada perubahan
  useEffect(() => {
    updateVisa({
      type: 'Visa Umrah — Jalur Normal',
      pricePerPax,
      tierLabel,
      siskopatuhPerPax: SISKOPATUH_PER_PAX,
      brnApproval,
      brnIsRamadhan,
      brnTotal,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricePerPax, tierLabel, brnApproval, brnIsRamadhan, brnTotal]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-heading font-bold text-secondary mb-2 tracking-wide">Visa Umrah</h2>
        <p className="text-muted-foreground text-sm">
          Visa Umrah jalur normal. Harga per pax otomatis menyesuaikan jumlah rombongan Anda ({totalPax} pax, termasuk bayi).
        </p>
      </div>

      {/* Kartu harga utama */}
      <div className="bg-primary/10 border border-primary rounded-3xl p-6 shadow-lg shadow-primary/10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-primary/20 border border-primary/30">
            <FileCheck2 className="w-6 h-6 text-primary" />
          </div>
          <CheckCircle2 className="w-6 h-6 text-primary" />
        </div>
        <h4 className="text-xl font-bold text-secondary mb-1">Visa Umrah — Jalur Normal</h4>
        <p className="text-xs text-muted-foreground mb-4">Tarif rombongan: {tierLabel}</p>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Visa per pax</div>
            <div className="font-mono font-bold text-primary text-lg">{rp(pricePerPax)}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Siskopatuh per pax</div>
            <div className="font-mono font-bold text-secondary text-lg">{rp(SISKOPATUH_PER_PAX)}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Subtotal ({totalPax} pax)</div>
            <div className="font-mono font-bold text-primary text-lg">{rp(visaTotal + siskoTotal)}</div>
          </div>
        </div>
        <div className="mt-4 flex items-start gap-2 text-xs text-secondary/70 bg-white/60 rounded-xl px-4 py-3">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          Visa Umrah sudah termasuk asuransi — jika terjadi gangguan kesehatan dan dirawat di RS Arab Saudi: GRATIS.
        </div>
        {isGroup35 && (
          <div className="mt-3 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            Rombongan 35+ pax memakai paket Visa + Bus (USD 130/pax). Angka di atas estimasi kurs — hubungi kami untuk harga pasti.
          </div>
        )}
      </div>

      {/* Opsi bantuan approval hotel BRN */}
      <div
        onClick={() => setBrnApproval(!brnApproval)}
        className={`p-5 rounded-2xl border cursor-pointer transition-all ${brnApproval ? 'bg-primary/10 border-primary' : 'bg-white border-secondary/10 hover:border-primary/40'}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-secondary">Dibantu Approval Hotel (BRN) — Opsional</h4>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Approval hotel Nusuk dilakukan mandiri. Jika ingin dibantu: {BRN_APPROVAL_SAR_PER_DAY} SAR/hari/orang
              (khusus Ramadhan {BRN_APPROVAL_SAR_PER_DAY_RAMADHAN} SAR). Harga ditentukan di awal pengajuan.
            </p>
            {brnApproval && (
              <div className="mt-3 space-y-2">
                <label className="flex items-center gap-2 text-xs text-secondary/80" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" checked={brnIsRamadhan} onChange={(e) => setBrnIsRamadhan(e.target.checked)} className="accent-[#B9924F]" />
                  Keberangkatan di bulan Ramadhan ({BRN_APPROVAL_SAR_PER_DAY_RAMADHAN} SAR/hari/orang)
                </label>
                <div className="text-xs text-muted-foreground">
                  {brnSarPerDay} SAR × {tripDays} hari × {totalPax} pax = <span className="font-mono font-bold text-primary">{rp(brnTotal)}</span>
                </div>
              </div>
            )}
          </div>
          <CheckCircle2 className={`w-6 h-6 shrink-0 ${brnApproval ? 'text-primary' : 'text-secondary/20'}`} />
        </div>
      </div>

      {/* Syarat */}
      <div className="bg-accent/60 rounded-2xl border border-secondary/10 p-6">
        <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Syarat Dokumen</h4>
        <ul className="grid sm:grid-cols-2 gap-2.5">
          {VISA_REQUIREMENTS.map((req) => (
            <li key={req} className="flex items-start gap-2 text-sm text-secondary/80">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {req}
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-6 mt-4 flex justify-between items-center border-t border-secondary/10">
        <Button onClick={() => setStep(6)} variant="ghost" className="text-secondary/60 hover:text-secondary hover:bg-accent rounded-full px-6 h-12">
          <ChevronLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <Button onClick={() => setStep(8)} size="lg" className="bg-primary text-white hover:bg-primary-hover px-10 rounded-full text-sm font-semibold h-12 transition-all duration-300 shadow-lg shadow-primary/25">
          Lanjut ke Ekstra <ChevronRight className="w-4 h-4 ml-1 inline-block" />
        </Button>
      </div>
    </div>
  );
}
