'use client';

import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Building2, MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { MAKKAH_HOTELS } from '@/config/pricing';

export function Step4HotelMakkah() {
  const { hotelMakkah, updateHotelMakkah, setStep } = usePlannerStore();

  const handleNext = () => setStep(5);
  const handleBack = () => setStep(3);

  const makkahHotels = MAKKAH_HOTELS;

  const currentNights = hotelMakkah?.nights || 1;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-heading font-bold text-white mb-2 tracking-wide">Akomodasi Makkah</h2>
        <p className="text-white/50 text-sm">Pilih hotel pilihan Anda di Makkah. Harga bervariasi berdasarkan jarak ke Masjidil Haram dan fasilitas.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Durasi Menginap */}
        <div className="bg-white/[0.035] p-5 rounded-2xl border border-white/5 flex flex-col justify-center">
          <label className="text-sm font-medium text-white/70 mb-4 block">Durasi Menginap (Malam)</label>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              className="border-white/10 hover:bg-white/5 text-white h-12 w-12 rounded-xl"
              onClick={() => updateHotelMakkah({ nights: Math.max(1, currentNights - 1) })}
            >
              -
            </Button>
            <span className="flex-1 text-center text-2xl font-mono font-bold text-primary">{currentNights}</span>
            <Button 
              variant="outline" 
              className="border-white/10 hover:bg-white/5 text-white h-12 w-12 rounded-xl"
              onClick={() => updateHotelMakkah({ nights: currentNights + 1 })}
            >
              +
            </Button>
          </div>
        </div>

        {/* Input Manual Jika Punya Pilihan Sendiri */}
        <div className="bg-white/[0.035] p-5 rounded-2xl border border-white/5">
          <label className="text-sm font-medium text-white/70 mb-4 block">Harga Kustom (Per Malam)</label>
          <div className="relative">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-medium">Rp</span>
             <Input 
              type="number"
              placeholder="0"
              value={hotelMakkah?.pricePerNight || ''}
              onChange={(e) => updateHotelMakkah({ 
                hotelId: 'custom', 
                name: 'Kustom / Input Manual', 
                stars: 0, 
                pricePerNight: Number(e.target.value) 
              })}
              className="bg-black/30 border-white/10 text-white h-12 rounded-xl pl-12 focus-visible:ring-primary"
            />
          </div>
          <p className="text-xs text-white/30 mt-2">Kosongkan jika memilih dari daftar di bawah.</p>
        </div>
      </div>

      {/* Daftar Hotel */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <h3 className="text-sm font-medium text-white/80">Rekomendasi Hotel Makkah</h3>
        <div className="grid gap-4">
          {makkahHotels.map((hotel) => {
            const isSelected = hotelMakkah?.hotelId === hotel.id;
            
            return (
              <div 
                key={hotel.id}
                onClick={() => updateHotelMakkah({ 
                  hotelId: hotel.id, 
                  name: hotel.name, 
                  stars: hotel.stars, 
                  pricePerNight: hotel.pricePerNight 
                })}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${isSelected ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(214,175,55,0.15)]' : 'bg-white/[0.035] border-white/5 hover:border-white/20 hover:bg-white/[0.07]'}`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl border ${isSelected ? 'bg-primary/20 border-primary/30' : 'bg-black/30 border-white/10'}`}>
                      <Building2 className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-white/60'}`} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-1">{hotel.name}</h4>
                      <div className="flex items-center gap-4 text-xs text-white/50">
                        <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-primary fill-primary" /> {hotel.stars} Bintang</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {hotel.distance}m ke Haram</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/40 mb-1">per malam</div>
                    <div className="text-lg font-mono font-bold text-primary">
                      Rp {hotel.pricePerNight.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ringkasan Total Hotel */}
      {hotelMakkah?.pricePerNight ? (
         <div className="mt-4 text-sm flex justify-between items-center bg-primary/10 px-5 py-4 rounded-xl border border-primary/20">
            <span className="text-white/80">Total Hotel Makkah ({currentNights} Malam):</span>
            <span className="font-bold font-mono text-primary text-lg">
              Rp {(hotelMakkah.pricePerNight * currentNights).toLocaleString('id-ID')}
            </span>
          </div>
      ) : null}

      {/* Tombol Navigasi */}
      <div className="pt-6 mt-4 flex justify-between items-center">
        <Button onClick={handleBack} variant="ghost" className="text-white/60 hover:text-white hover:bg-white/5 rounded-full px-6">
          <ChevronLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!hotelMakkah?.hotelId && !hotelMakkah?.pricePerNight} 
          size="lg" 
          className="bg-primary text-black hover:bg-primary-hover px-10 rounded-full text-sm font-semibold transition-all duration-300 shadow-[0_0_30px_rgba(214,175,55,0.2)]"
        >
          Lanjut ke Hotel Madinah <ChevronRight className="w-4 h-4 ml-1 inline-block" />
        </Button>
      </div>
    </div>
  );
}