'use client';

import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Button } from '@/components/ui/button';
import { UserCheck, Mountain, Plane, LayoutPanelLeft, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export function Step8Optionals() {
  const { optionals, toggleOptional, setStep } = usePlannerStore();
  
  const handleNext = () => setStep(9);
  const handleBack = () => setStep(7);

  const extraServices = [
    { id: 'opt1', serviceName: 'Mutawwif / Pemandu Privat', price: 1500000, icon: UserCheck, desc: 'Pemandu ibadah pribadi selama di Makkah & Madinah.' },
    { id: 'opt2', serviceName: 'City Tour Taif + Kereta Gantung', price: 1200000, icon: Mountain, desc: 'Perjalanan 1 hari ke kota Taif yang sejuk termasuk naik cable car.' },
    { id: 'opt3', serviceName: 'Airport Lounge Access', price: 500000, icon: LayoutPanelLeft, desc: 'Akses ruang tunggu eksklusif di bandara Jeddah/Madinah.' },
    { id: 'opt4', serviceName: 'Handling & Perlengkapan', price: 1000000, icon: Plane, desc: 'Bantuan koper di bandara + kain Ihram/Mukena & Tas.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-serif font-bold text-white mb-2 tracking-wide">Layanan Tambahan</h2>
        <p className="text-white/50 text-sm">Pilih layanan ekstra untuk menyempurnakan pengalaman ibadah Anda. (Opsional)</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {extraServices.map((service) => {
          const isSelected = optionals.some(o => o.id === service.id);
          const Icon = service.icon;
          return (
            <div 
              key={service.id}
              onClick={() => toggleOptional(service)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start gap-4 ${isSelected ? 'bg-primary/10 border-primary' : 'bg-[#121212] border-white/5 hover:border-white/10'}`}
            >
              <div className={`p-3 rounded-xl border ${isSelected ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-black/40 border-white/10 text-white/40'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="text-sm font-bold text-white">{service.serviceName}</h4>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                </div>
                <p className="text-[11px] text-white/40 my-1 leading-tight">{service.desc}</p>
                <div className="text-sm font-mono text-primary font-bold mt-2">Rp {service.price.toLocaleString('id-ID')}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-6 flex justify-between items-center border-t border-white/5">
        <Button onClick={handleBack} variant="ghost" className="text-white/60 hover:text-white rounded-full px-6">
          <ChevronLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <Button onClick={handleNext} size="lg" className="bg-primary text-black hover:bg-primary-hover px-10 rounded-full text-sm font-semibold shadow-[0_0_30px_rgba(214,175,55,0.2)]">
          Lihat Ringkasan Akhir <ChevronRight className="w-4 h-4 ml-1 inline-block" />
        </Button>
      </div>
    </div>
  );
}