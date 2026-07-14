'use client';

import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Building2, MapPin, Star, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { differenceInCalendarDays, format } from 'date-fns';
import type { HotelOption } from '@/config/pricing';
import type { HotelSelection } from '@/types/planner.types';

const toInput = (d: Date | null) => (d ? format(d, 'yyyy-MM-dd') : '');
const fromInput = (v: string) => (v ? new Date(`${v}T12:00:00`) : null);

export function HotelStep({
  city,
  landmark,
  hotels,
  selection,
  update,
  backStep,
  nextStep,
  nextLabel,
}: {
  city: 'Makkah' | 'Madinah';
  landmark: string;
  hotels: HotelOption[];
  selection: HotelSelection | null;
  update: (data: Partial<HotelSelection>) => void;
  backStep: number;
  nextStep: number;
  nextLabel: string;
}) {
  const { setStep } = usePlannerStore();

  const checkIn = selection?.checkIn ?? null;
  const checkOut = selection?.checkOut ?? null;
  const rooms = selection?.rooms ?? 1;
  const setRooms = (n: number) => update({ rooms: Math.max(1, n) });

  const nights =
    checkIn && checkOut
      ? Math.max(1, differenceInCalendarDays(checkOut, checkIn))
      : selection?.nights || 1;

  const setCheckIn = (v: string) => {
    const d = fromInput(v);
    const n = d && checkOut ? Math.max(1, differenceInCalendarDays(checkOut, d)) : nights;
    update({ checkIn: d, nights: n });
  };
  const setCheckOut = (v: string) => {
    const d = fromInput(v);
    const n = checkIn && d ? Math.max(1, differenceInCalendarDays(d, checkIn)) : nights;
    update({ checkOut: d, nights: n });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-heading font-bold text-secondary mb-2 tracking-wide">Hotel {city}</h2>
        <p className="text-muted-foreground text-sm">
          Tentukan tanggal check-in &amp; check-out lalu pilih hotel Anda di {city}. Kedekatan dengan {landmark} sangat menentukan kenyamanan ibadah.
        </p>
      </div>

      {/* Check-in / Check-out */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-accent/60 p-5 rounded-2xl border border-secondary/10">
          <label className="text-sm font-medium text-secondary/80 mb-3 block">Check-in</label>
          <Input
            type="date"
            value={toInput(checkIn)}
            onChange={(e) => setCheckIn(e.target.value)}
            className="bg-white border-secondary/15 text-secondary h-12 rounded-xl"
          />
        </div>
        <div className="bg-accent/60 p-5 rounded-2xl border border-secondary/10">
          <label className="text-sm font-medium text-secondary/80 mb-3 block">Check-out</label>
          <Input
            type="date"
            value={toInput(checkOut)}
            min={toInput(checkIn)}
            onChange={(e) => setCheckOut(e.target.value)}
            className="bg-white border-secondary/15 text-secondary h-12 rounded-xl"
          />
        </div>
      </div>

      {/* Malam & Jumlah Kamar */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-secondary text-secondary-foreground p-5 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-xs opacity-80">Durasi Menginap</div>
            <div className="text-2xl font-mono font-bold text-primary">{nights} <span className="text-sm font-sans font-normal opacity-80">malam</span></div>
          </div>
        </div>
        <div className="bg-accent/60 p-5 rounded-2xl border border-secondary/10 flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-secondary/80 block">Jumlah Kamar</label>
            <p className="text-[11px] text-muted-foreground mt-0.5">Harga dihitung per kamar</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="border-secondary/15 hover:bg-accent text-secondary rounded-xl w-9 h-9" onClick={() => setRooms(rooms - 1)}>-</Button>
            <span className="w-6 text-center text-lg font-mono font-bold text-primary">{rooms}</span>
            <Button variant="outline" size="icon" className="border-secondary/15 hover:bg-accent text-secondary rounded-xl w-9 h-9" onClick={() => setRooms(rooms + 1)}>+</Button>
          </div>
        </div>
      </div>

      {/* Harga kustom */}
      <div className="bg-accent/60 p-5 rounded-2xl border border-secondary/10">
        <label className="text-sm font-medium text-secondary/80 mb-4 block">Harga Kustom (Per Malam)</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">Rp</span>
          <Input
            type="number"
            placeholder="0"
            value={selection?.pricePerNight || ''}
            onChange={(e) =>
              update({ hotelId: 'custom', name: 'Kustom / Input Manual', stars: 0, pricePerNight: Number(e.target.value) })
            }
            className="bg-white border-secondary/15 text-secondary h-12 rounded-xl pl-12 focus-visible:ring-primary"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">Kosongkan jika memilih dari daftar rekomendasi di bawah.</p>
      </div>

      {/* Rekomendasi */}
      <div className="space-y-4 pt-4 border-t border-secondary/10">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-sm font-semibold text-secondary">Rekomendasi Hotel {city}</h3>
        </div>
        <div className="flex items-start gap-2 text-[11px] text-muted-foreground bg-accent/60 border border-secondary/10 rounded-xl px-4 py-3">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary" />
          Harga di bawah adalah harga referensi — tarif hotel naik-turun mengikuti musim. Harga real-time (integrasi OTA) sedang disiapkan; untuk kepastian harga, konsultasikan via WhatsApp.
        </div>
        <div className="grid gap-4">
          {hotels.map((hotel) => {
            const isSelected = selection?.hotelId === hotel.id;
            return (
              <div
                key={hotel.id}
                onClick={() => update({ hotelId: hotel.id, name: hotel.name, stars: hotel.stars, pricePerNight: hotel.pricePerNight })}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${isSelected ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10' : 'bg-white border-secondary/10 hover:border-primary/40 hover:bg-accent/40'}`}
              >
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    {hotel.image ? (
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-secondary/10">
                        <Image src={hotel.image} alt={hotel.name} fill className="object-cover" sizes="96px" />
                      </div>
                    ) : (
                      <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl border flex items-center justify-center shrink-0 ${isSelected ? 'bg-primary/20 border-primary/30' : 'bg-accent border-secondary/10'}`}>
                        <Building2 className={`w-6 h-6 ${isSelected ? 'text-primary' : 'text-secondary/60'}`} />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="text-base font-bold text-secondary mb-1 truncate">{hotel.name}</h4>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-primary fill-primary" /> {hotel.stars} Bintang</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {hotel.distance}m ke {landmark}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-muted-foreground mb-1">per malam</div>
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

      {selection?.pricePerNight ? (
        <div className="mt-4 text-sm flex justify-between items-center bg-primary/10 px-5 py-4 rounded-xl border border-primary/20">
          <span className="text-secondary/80">Total Hotel {city} ({nights} malam × {rooms} kamar):</span>
          <span className="font-bold font-mono text-primary text-lg">
            Rp {(selection.pricePerNight * nights * rooms).toLocaleString('id-ID')}
          </span>
        </div>
      ) : null}

      <div className="pt-6 mt-4 flex justify-between items-center border-t border-secondary/10">
        <Button onClick={() => setStep(backStep)} variant="ghost" className="text-secondary/60 hover:text-secondary hover:bg-accent rounded-full px-6">
          <ChevronLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <Button
          onClick={() => setStep(nextStep)}
          disabled={!selection?.hotelId && !selection?.pricePerNight}
          size="lg"
          className="bg-primary text-white hover:bg-primary-hover px-10 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg shadow-primary/25"
        >
          {nextLabel} <ChevronRight className="w-4 h-4 ml-1 inline-block" />
        </Button>
      </div>
    </div>
  );
}
