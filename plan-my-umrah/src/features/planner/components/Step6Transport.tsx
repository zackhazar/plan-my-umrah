'use client';

import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Button } from '@/components/ui/button';
import { Bus, Train, Car, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TRANSPORT_PACKAGES } from '@/config/pricing';

const TRANSPORT_ICONS: Record<string, React.ElementType> = {
  bus: Bus,
  haramain: Train,
  gmc: Car,
};

export function Step6Transport() {
  const { transport, addTransport, setStep, travellers } = usePlannerStore();
  
  const handleNext = () => setStep(7);
  const handleBack = () => setStep(5);

  const totalTravellers = travellers.adults + travellers.children;
  
  // Karena kita pakai sistem paket All-in, kita gunakan ID statis 'main-transport'
  const currentSelection = transport.find(t => t.id === 'main-transport');

  const transportPackages = TRANSPORT_PACKAGES.map((pkg) => ({
    ...pkg,
    icon: TRANSPORT_ICONS[pkg.id] ?? Bus,
  }));

  const handleSelect = (pkg: { vehicle: string; route: string; price: number }) => {
    addTransport({
      id: 'main-transport',
      route: pkg.route,
      vehicle: pkg.vehicle,
      price: pkg.price
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-heading font-bold text-white mb-2 tracking-wide">Pilihan Transportasi</h2>
        <p className="text-white/50 text-sm">Pilih moda transportasi selama di Tanah Suci. Harga dihitung per orang (Dewasa & Anak).</p>
      </div>

      <div className="grid gap-5">
        {transportPackages.map((pkg, index) => {
          const isSelected = currentSelection?.vehicle === pkg.vehicle;
          const Icon = pkg.icon;
          
          return (
            <div 
              key={index}
              onClick={() => handleSelect(pkg)}
              className={`p-6 rounded-3xl border cursor-pointer transition-all duration-300 relative overflow-hidden group ${isSelected ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(214,175,55,0.15)]' : 'bg-white/[0.035] border-white/5 hover:border-white/20 hover:bg-white/[0.07]'}`}
            >
              {/* Ornamen Background saat dipilih */}
              {isSelected && (
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Icon className="w-32 h-32 text-primary" />
                </div>
              )}

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                <div className="flex items-start gap-5">
                  <div className={`p-4 rounded-2xl border transition-colors ${isSelected ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-black/30 border-white/10 text-white/60 group-hover:text-white/90'}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                      {pkg.vehicle}
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-primary" />}
                    </h4>
                    <p className="text-sm text-primary/80 font-medium mb-2">{pkg.route}</p>
                    <p className="text-sm text-white/40 max-w-md leading-relaxed">{pkg.description}</p>
                  </div>
                </div>
                
                <div className="text-left md:text-right w-full md:w-auto pt-4 md:pt-0 border-t border-white/5 md:border-t-0">
                  <div className="text-xs text-white/40 mb-1 uppercase tracking-wider">Estimasi per Pax</div>
                  <div className="text-2xl font-mono font-bold text-white">
                    Rp {pkg.price.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {currentSelection && (
        <div className="mt-6 text-sm flex justify-between items-center bg-primary/10 px-6 py-5 rounded-2xl border border-primary/20">
          <span className="text-white/80 font-medium">Total Transportasi ({totalTravellers} Pax):</span>
          <span className="font-bold font-mono text-primary text-xl">
            Rp {(currentSelection.price * totalTravellers).toLocaleString('id-ID')}
          </span>
        </div>
      )}

      <div className="pt-6 mt-4 flex justify-between items-center border-t border-white/5">
        <Button onClick={handleBack} variant="ghost" className="text-white/60 hover:text-white hover:bg-white/5 rounded-full px-6 h-12">
          <ChevronLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!currentSelection} 
          size="lg" 
          className="bg-primary text-black hover:bg-primary-hover px-10 rounded-full text-sm font-semibold h-12 transition-all duration-300 shadow-[0_0_30px_rgba(214,175,55,0.2)]"
        >
          Lanjut ke Visa & Dokumen <ChevronRight className="w-4 h-4 ml-1 inline-block" />
        </Button>
      </div>
    </div>
  );
}