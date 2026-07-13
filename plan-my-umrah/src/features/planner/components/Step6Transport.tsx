'use client';

import { useState } from 'react';
import Image from 'next/image';
import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bus, Train, Car, PencilLine, ChevronLeft, ChevronRight, Plus, Trash2, Info } from 'lucide-react';
import { CAR_VEHICLES, CAR_ROUTES, TRAIN_ROUTES, BUS_FULL_TRIP, SAR_RATE, sarToIdr } from '@/config/pricing';
import type { TransportSelection } from '@/types/planner.types';

type Tab = 'car' | 'train' | 'bus' | 'custom';

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'car', label: 'Mobil Privat', icon: Car },
  { id: 'train', label: 'Kereta Haramain', icon: Train },
  { id: 'bus', label: 'Bus Full Trip', icon: Bus },
  { id: 'custom', label: 'Lainnya', icon: PencilLine },
];

const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export function Step6Transport() {
  const { transport, addTransport, removeTransport, setStep, travellers } = usePlannerStore();
  const paxCount = travellers.adults + travellers.children;

  const [tab, setTab] = useState<Tab>('car');

  // Form mobil
  const [carRouteId, setCarRouteId] = useState(CAR_ROUTES[0].id);
  const [carVehicleId, setCarVehicleId] = useState(CAR_VEHICLES[0].id);
  const [carQty, setCarQty] = useState(1);

  // Form kereta
  const [trainRouteId, setTrainRouteId] = useState(TRAIN_ROUTES[0].id);
  const [trainClass, setTrainClass] = useState<'economy' | 'business'>('economy');

  // Form kustom
  const [customLabel, setCustomLabel] = useState('');
  const [customPrice, setCustomPrice] = useState('');

  const carRoute = CAR_ROUTES.find((r) => r.id === carRouteId)!;
  const carVehicle = CAR_VEHICLES.find((v) => v.id === carVehicleId)!;
  const carPriceIdr = sarToIdr(carRoute.prices[carVehicleId]);

  const trainRoute = TRAIN_ROUTES.find((r) => r.id === trainRouteId)!;
  const trainPrice = trainRoute[trainClass];

  const addCar = () =>
    addTransport({
      id: `car-${carRouteId}-${carVehicleId}-${Date.now()}`,
      mode: 'car',
      route: carRoute.route,
      vehicle: `${carVehicle.name} (${carVehicle.seats} seat)`,
      price: carPriceIdr,
      unit: 'per_vehicle',
      qty: carQty,
    });

  const addTrain = () =>
    addTransport({
      id: `train-${trainRouteId}-${trainClass}-${Date.now()}`,
      mode: 'train',
      route: `Kereta Haramain: ${trainRoute.route}`,
      vehicle: trainClass === 'economy' ? 'Ekonomi' : 'Bisnis',
      price: trainPrice,
      unit: 'per_pax',
      qty: 1,
    });

  const addBus = () =>
    addTransport({
      id: `bus-full-${Date.now()}`,
      mode: 'bus',
      route: BUS_FULL_TRIP.label,
      vehicle: `Bus (${BUS_FULL_TRIP.priceSar} SAR)`,
      price: BUS_FULL_TRIP.price,
      unit: 'flat',
      qty: 1,
    });

  const addCustom = () => {
    if (!customLabel || !Number(customPrice)) return;
    addTransport({
      id: `custom-${Date.now()}`,
      mode: 'custom',
      route: customLabel,
      vehicle: 'Kustom',
      price: Number(customPrice),
      unit: 'flat',
      qty: 1,
    });
    setCustomLabel('');
    setCustomPrice('');
  };

  const legTotal = (t: TransportSelection) =>
    t.unit === 'per_vehicle' ? t.price * t.qty : t.unit === 'per_pax' ? t.price * paxCount : t.price;

  const grandTransport = transport.reduce((s, t) => s + legTotal(t), 0);

  const selectClass =
    'w-full bg-white border border-secondary/15 text-secondary h-12 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary/40 text-sm';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-heading font-bold text-secondary mb-2 tracking-wide">Transportasi</h2>
        <p className="text-muted-foreground text-sm">
          Susun rute transportasi Anda satu per satu (bisa lebih dari satu). Harga mobil dihitung <strong>per kendaraan</strong>, kereta <strong>per penumpang</strong>. Kurs 1 SAR = Rp {SAR_RATE.toLocaleString('id-ID')}.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center justify-center gap-2 h-12 rounded-xl border text-sm font-semibold transition-all ${tab === id ? 'bg-secondary text-secondary-foreground border-secondary' : 'bg-white text-secondary/70 border-secondary/10 hover:border-secondary/30'}`}
          >
            <Icon className={`w-4 h-4 ${tab === id ? 'text-primary' : ''}`} /> {label}
          </button>
        ))}
      </div>

      {/* Panel per tab */}
      <div className="bg-accent/60 rounded-2xl border border-secondary/10 p-6 space-y-5">
        {tab === 'car' && (
          <>
            <div>
              <label className="text-sm font-medium text-secondary/80 mb-2 block">Rute</label>
              <select className={selectClass} value={carRouteId} onChange={(e) => setCarRouteId(e.target.value)}>
                {CAR_ROUTES.map((r) => (
                  <option key={r.id} value={r.id}>{r.route}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-secondary/80 mb-2 block">Kendaraan</label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {CAR_VEHICLES.map((v) => {
                  const active = v.id === carVehicleId;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setCarVehicleId(v.id)}
                      className={`text-left rounded-2xl border overflow-hidden transition-all ${active ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10' : 'border-secondary/10 bg-white hover:border-primary/40'}`}
                    >
                      <div className={`relative w-full aspect-[4/3] flex items-center justify-center ${active ? 'bg-primary/10' : 'bg-accent'}`}>
                        {v.image ? (
                          <Image src={v.image} alt={v.name} fill className="object-cover" sizes="200px" />
                        ) : (
                          <Car className={`w-8 h-8 ${active ? 'text-primary' : 'text-secondary/40'}`} />
                        )}
                      </div>
                      <div className="p-3">
                        <div className="text-sm font-bold text-secondary leading-tight">{v.name}</div>
                        <div className="text-[11px] text-muted-foreground mt-1">{v.seats} seat &middot; {carRoute.prices[v.id]} SAR</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <label className="text-sm text-secondary/80">Jumlah kendaraan:</label>
                <Button variant="outline" size="icon" className="w-9 h-9 rounded-xl border-secondary/15" onClick={() => setCarQty(Math.max(1, carQty - 1))}>-</Button>
                <span className="w-6 text-center font-mono font-bold text-primary">{carQty}</span>
                <Button variant="outline" size="icon" className="w-9 h-9 rounded-xl border-secondary/15" onClick={() => setCarQty(carQty + 1)}>+</Button>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">{carRoute.prices[carVehicleId]} SAR × {carQty} kendaraan</div>
                <div className="text-xl font-mono font-bold text-primary">{rp(carPriceIdr * carQty)}</div>
              </div>
            </div>
            {paxCount + travellers.infants > carVehicle.seats * carQty && (
              <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                Rombongan Anda {paxCount + travellers.infants} orang — kapasitas {carVehicle.name} × {carQty} hanya {carVehicle.seats * carQty} kursi. Tambah jumlah kendaraan atau pilih kendaraan lebih besar.
              </div>
            )}
            <Button onClick={addCar} className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-6 h-11 text-sm font-semibold">
              <Plus className="w-4 h-4 mr-1" /> Tambahkan Rute Ini
            </Button>
          </>
        )}

        {tab === 'train' && (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-secondary/80 mb-2 block">Rute</label>
                <select className={selectClass} value={trainRouteId} onChange={(e) => setTrainRouteId(e.target.value)}>
                  {TRAIN_ROUTES.map((r) => (
                    <option key={r.id} value={r.id}>{r.route}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-secondary/80 mb-2 block">Kelas</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['economy', 'business'] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setTrainClass(c)}
                      className={`h-12 rounded-xl border text-sm font-semibold transition-all ${trainClass === c ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-secondary/10 text-secondary/70'}`}
                    >
                      {c === 'economy' ? 'Ekonomi' : 'Bisnis'} — {rp(trainRoute[c])}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-muted-foreground">Harga per penumpang × {paxCount} pax</div>
              <div className="text-xl font-mono font-bold text-primary">{rp(trainPrice * paxCount)}</div>
            </div>
            <Button onClick={addTrain} className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-6 h-11 text-sm font-semibold">
              <Plus className="w-4 h-4 mr-1" /> Tambahkan Rute Ini
            </Button>
          </>
        )}

        {tab === 'bus' && (
          <>
            <div className="rounded-2xl overflow-hidden border border-secondary/10">
              <div className="relative w-full aspect-[16/9] bg-accent">
                <Image src="/images/vehicles/bus-vip.jpg" alt="Bus VIP Full Trip" fill className="object-cover" sizes="(max-width: 640px) 100vw, 640px" />
              </div>
              <div className="flex items-start gap-4 p-4 bg-white">
                <div className="flex-1">
                  <h4 className="font-bold text-secondary">{BUS_FULL_TRIP.label}</h4>
                  <p className="text-xs text-muted-foreground mt-1">Harga flat per bus untuk seluruh perjalanan: {BUS_FULL_TRIP.priceSar.toLocaleString('id-ID')} SAR.</p>
                </div>
                <div className="text-xl font-mono font-bold text-primary whitespace-nowrap">{rp(BUS_FULL_TRIP.price)}</div>
              </div>
            </div>
            <Button onClick={addBus} className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-6 h-11 text-sm font-semibold">
              <Plus className="w-4 h-4 mr-1" /> Tambahkan Bus Full Trip
            </Button>
          </>
        )}

        {tab === 'custom' && (
          <>
            <p className="text-xs text-muted-foreground">Pakai transport lain (mis. NWBus atau vendor sendiri)? Tulis manual di sini.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-secondary/80 mb-2 block">Nama / Rute Transport</label>
                <Input value={customLabel} onChange={(e) => setCustomLabel(e.target.value)} placeholder="Cth: NWBus Jeddah–Makkah PP" className="bg-white border-secondary/15 text-secondary h-12 rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-medium text-secondary/80 mb-2 block">Total Harga (Rp)</label>
                <Input type="number" value={customPrice} onChange={(e) => setCustomPrice(e.target.value)} placeholder="0" className="bg-white border-secondary/15 text-secondary h-12 rounded-xl" />
              </div>
            </div>
            <Button onClick={addCustom} disabled={!customLabel || !Number(customPrice)} className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-6 h-11 text-sm font-semibold">
              <Plus className="w-4 h-4 mr-1" /> Tambahkan
            </Button>
          </>
        )}
      </div>

      {/* Daftar rute terpilih */}
      {transport.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-secondary">Rute Transportasi Anda ({transport.length})</h3>
          {transport.map((t) => (
            <div key={t.id} className="flex items-center justify-between gap-4 bg-white border border-secondary/10 rounded-xl px-5 py-4">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-secondary truncate">{t.route}</div>
                <div className="text-xs text-muted-foreground">
                  {t.vehicle}
                  {t.unit === 'per_vehicle' && ` · ${t.qty} kendaraan × ${rp(t.price)}`}
                  {t.unit === 'per_pax' && ` · ${paxCount} pax × ${rp(t.price)}`}
                  {t.unit === 'flat' && ' · harga flat'}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono font-bold text-primary text-sm">{rp(legTotal(t))}</span>
                <button onClick={() => removeTransport(t.id)} className="text-destructive/60 hover:text-destructive p-1" aria-label="Hapus rute">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          <div className="text-sm flex justify-between items-center bg-primary/10 px-6 py-5 rounded-2xl border border-primary/20">
            <span className="text-secondary/80 font-medium">Total Transportasi:</span>
            <span className="font-bold font-mono text-primary text-xl">{rp(grandTransport)}</span>
          </div>
        </div>
      )}

      <div className="pt-6 mt-4 flex justify-between items-center border-t border-secondary/10">
        <Button onClick={() => setStep(5)} variant="ghost" className="text-secondary/60 hover:text-secondary hover:bg-accent rounded-full px-6 h-12">
          <ChevronLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <Button
          onClick={() => setStep(7)}
          disabled={transport.length === 0}
          size="lg"
          className="bg-primary text-white hover:bg-primary-hover px-10 rounded-full text-sm font-semibold h-12 transition-all duration-300 shadow-lg shadow-primary/25"
        >
          Lanjut ke Visa &amp; Dokumen <ChevronRight className="w-4 h-4 ml-1 inline-block" />
        </Button>
      </div>
    </div>
  );
}
