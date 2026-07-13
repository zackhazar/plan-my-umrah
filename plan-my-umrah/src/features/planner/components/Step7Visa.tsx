'use client';

import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Button } from '@/components/ui/button';
import { Globe, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { VISA_PACKAGES } from '@/config/pricing';

export function Step7Visa() {
  const { visa, updateVisa, setStep } = usePlannerStore();

  const handleNext = () => setStep(8);
  const handleBack = () => setStep(6);

  const visaPackages = VISA_PACKAGES;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-serif font-bold text-white mb-2 tracking-wide">Visa & Dokumen</h2>
        <p className="text-white/50 text-sm">Pilih jenis visa. Biaya visa berlaku untuk semua jemaah termasuk bayi.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {visaPackages.map((pkg, index) => {
          const isSelected = visa?.type === pkg.type;
          return (
            <div 
              key={index}
              onClick={() => updateVisa(pkg)}
              className={`p-6 rounded-3xl border cursor-pointer transition-all duration-300 relative flex flex-col h-full ${isSelected ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(214,175,55,0.15)]' : 'bg-[#121212] border-white/5 hover:border-white/20 hover:bg-[#1a1a1a]'}`}
            >
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl border ${isSelected ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-black/40 border-white/10 text-white/60'}`}>
                    <Globe className="w-6 h-6" />
                  </div>
                  {isSelected && <CheckCircle2 className="w-6 h-6 text-primary" />}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{pkg.type}</h4>
                <p className="text-sm text-white/40 leading-relaxed mb-6">{pkg.description}</p>
              </div>
              <div className="pt-4 border-t border-white/5 mt-auto">
                <div className="text-xs text-white/40 mb-1">Harga per Pax</div>
                <div className="text-xl font-mono font-bold text-primary">Rp {pkg.price.toLocaleString('id-ID')}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-6 mt-4 flex justify-between items-center border-t border-white/5">
        <Button onClick={handleBack} variant="ghost" className="text-white/60 hover:text-white hover:bg-white/5 rounded-full px-6 h-12">
          <ChevronLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <Button onClick={handleNext} disabled={!visa} size="lg" className="bg-primary text-black hover:bg-primary-hover px-10 rounded-full text-sm font-semibold h-12 transition-all duration-300">
          Lanjut ke Ekstra <ChevronRight className="w-4 h-4 ml-1 inline-block" />
        </Button>
      </div>
    </div>
  );
}