'use client';

import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Button } from '@/components/ui/button';
import { Users, Baby, Smile, ChevronRight } from 'lucide-react';

export function Step1Travellers() {
  const { travellers, updateTravellers, setStep } = usePlannerStore();

  const handleNext = () => setStep(2);

  const Counter = ({
    label,
    desc,
    value,
    type,
    icon: Icon
  }: {
    label: string,
    desc: string,
    value: number,
    type: 'adults' | 'children' | 'infants',
    icon: React.ElementType
  }) => (
    <div className="flex items-center justify-between p-6 bg-accent/60 rounded-2xl border border-secondary/10 hover:border-primary/40 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="text-base font-semibold text-secondary tracking-wide">{label}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="border-secondary/15 hover:bg-accent text-secondary rounded-xl w-9 h-9"
          onClick={() => updateTravellers(type, Math.max(type === 'adults' ? 1 : 0, value - 1))}
        >
          -
        </Button>
        <span className="w-6 text-center text-lg font-mono font-bold text-primary">{value}</span>
        <Button
          variant="outline"
          size="icon"
          className="border-secondary/15 hover:bg-accent text-secondary rounded-xl w-9 h-9"
          onClick={() => updateTravellers(type, value + 1)}
        >
          +
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-heading font-bold text-secondary mb-2 tracking-wide">Siapa saja yang akan berangkat?</h2>
        <p className="text-muted-foreground text-sm">Tentukan jumlah jemaah dalam rombongan Anda untuk kalkulasi kapasitas hotel dan transportasi yang akurat.</p>
      </div>

      <div className="space-y-4">
        <Counter label="Dewasa" desc="Usia 12 tahun ke atas" value={travellers.adults} type="adults" icon={Users} />
        <Counter label="Anak-anak" desc="Usia 2 - 11 tahun" value={travellers.children} type="children" icon={Smile} />
        <Counter label="Bayi" desc="Di bawah 2 tahun" value={travellers.infants} type="infants" icon={Baby} />
      </div>

      <div className="pt-6 border-t border-secondary/10 flex justify-end">
        <Button
          onClick={handleNext}
          size="lg"
          className="bg-primary text-white hover:bg-primary-hover px-10 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg shadow-primary/25"
        >
          Lanjutkan ke Tanggal <ChevronRight className="w-4 h-4 ml-1 inline-block" />
        </Button>
      </div>
    </div>
  );
}
