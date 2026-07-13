// ============================================================
// GENERATOR ITINERARY HARIAN — diadopsi dari template Excel
// "UmrohMandiri_Full_Planner" (PT Hajar Aswad Barokah / @zackhajar).
// Menghasilkan jadwal D1..Dn otomatis dari tanggal, urutan kota
// (via bandara kedatangan) dan nama hotel pilihan jemaah.
// ============================================================

import { addDays } from 'date-fns';

export interface ItineraryDay {
  day: number;
  date: Date | null;
  city: 'Perjalanan' | 'Makkah' | 'Madinah';
  title: string;
  items: string[];
}

interface ItineraryInput {
  departure: Date | null;
  returnDate: Date | null;
  arrivalAirport: string; // 'JED' → Makkah dulu, 'MED' → Madinah dulu
  makkahNights: number;
  madinahNights: number;
  makkahHotel?: string;
  madinahHotel?: string;
}

// Template kegiatan per hari penuh di tiap kota (diambil dari Excel).
const MAKKAH_DAYS: { title: string; items: string[] }[] = [
  {
    title: 'Umrah Pertama',
    items: [
      'Shalat Subuh di Masjidil Haram',
      'Tawaf Qudum 7 putaran, dimulai dari Hajar Aswad',
      "Sa'i Shafa–Marwah 7 kali, lalu Tahallul (cukur rambut)",
      'Istirahat di hotel, lanjut shalat 5 waktu berjamaah di Masjidil Haram',
    ],
  },
  {
    title: 'Ziyarah Makkah',
    items: [
      'Jabal Nur & Goa Hira — tempat turunnya wahyu pertama',
      'Jabal Tsur — persembunyian Rasulullah ﷺ saat hijrah (opsional)',
      "Masjid 'Aisyah (Tan'im) & masjid bersejarah lain",
      'Sore–malam ibadah di Masjidil Haram',
    ],
  },
  {
    title: 'Ibadah Intensif / Umrah Ke-2 (opsional)',
    items: [
      "Ambil miqat dari Tan'im atau Ji'ranah untuk umrah ke-2",
      "Tawaf + Sa'i + Tahallul di waktu dini hari (lebih sepi & afdhal)",
      "Perbanyak thawaf sunnah, tilawah, doa & i'tikaf",
      'Minum air zamzam 3–5 liter per hari untuk jaga stamina',
    ],
  },
];

const MADINAH_DAYS: { title: string; items: string[] }[] = [
  {
    title: 'Masjid Nabawi & Raudhah',
    items: [
      'Shalat Tahajud & Subuh di Masjid Nabawi (datang awal untuk shaf depan)',
      'Ziarah Raudhah — booking slot via aplikasi Nusuk terlebih dahulu',
      "Salam ke makam Nabi ﷺ, Abu Bakar & Umar radhiyallahu 'anhuma",
      'Shalat 5 waktu berjamaah di Masjid Nabawi',
    ],
  },
  {
    title: 'Ziyarah Madinah',
    items: [
      'Masjid Quba — shalat 2 rakaat berpahala umrah (HR. Tirmidzi)',
      'Jabal Uhud & makam syuhada Uhud',
      'Masjid Qiblatain & kebun kurma (oleh-oleh: Ajwa, Sukkari)',
      'Malam ibadah di Masjid Nabawi',
    ],
  },
  {
    title: 'Ibadah & Belanja Oleh-oleh',
    items: [
      'Shalat berjamaah di Masjid Nabawi sepanjang hari',
      'Belanja oleh-oleh: pasar kurma & area sekitar Nabawi',
      'Perbanyak doa & shalawat di malam terakhir di Madinah',
    ],
  },
];

const cycle = <T,>(arr: T[], i: number) => arr[Math.min(i, arr.length - 1)];

export function generateItinerary(input: ItineraryInput): ItineraryDay[] {
  const { departure, returnDate, arrivalAirport, makkahNights, madinahNights, makkahHotel, madinahHotel } = input;

  const makkahFirst = arrivalAirport !== 'MED';
  const first = makkahFirst
    ? { city: 'Makkah' as const, nights: makkahNights, hotel: makkahHotel, days: MAKKAH_DAYS, transferLabel: 'Jeddah (KAIA) → Makkah (±1,5 jam)' }
    : { city: 'Madinah' as const, nights: madinahNights, hotel: madinahHotel, days: MADINAH_DAYS, transferLabel: 'Bandara Madinah (AMAA) → Hotel (±30 menit)' };
  const second = makkahFirst
    ? { city: 'Madinah' as const, nights: madinahNights, hotel: madinahHotel, days: MADINAH_DAYS, transferLabel: 'Makkah → Madinah (±6 jam via bus / ±2,5 jam kereta Haramain)' }
    : { city: 'Makkah' as const, nights: makkahNights, hotel: makkahHotel, days: MAKKAH_DAYS, transferLabel: 'Madinah → Makkah (±6 jam via bus / ±2,5 jam kereta Haramain)' };

  const dateAt = (offset: number) => (departure ? addDays(departure, offset) : null);
  const days: ItineraryDay[] = [];
  let d = 1;

  // D1 — keberangkatan & kedatangan
  days.push({
    day: d++,
    date: dateAt(0),
    city: 'Perjalanan',
    title: `Keberangkatan — Indonesia → ${first.city}`,
    items: [
      'Kumpul di bandara 3 jam sebelum penerbangan — cek paspor, visa, kartu vaksin meningitis',
      'Penerbangan internasional menuju Saudi Arabia',
      `Transfer ${first.transferLabel}`,
      first.hotel ? `Check-in ${first.hotel} & istirahat` : 'Check-in hotel & istirahat',
    ],
  });

  // Hari penuh di kota pertama (nights - 1 hari penuh, karena hari terakhir dipakai transfer)
  const firstFullDays = Math.max(0, first.nights - 1);
  for (let i = 0; i < firstFullDays; i++) {
    const t = cycle(first.days, i);
    days.push({ day: d, date: dateAt(d - 1), city: first.city, title: t.title, items: t.items });
    d++;
  }

  // Hari pindah kota
  if (second.nights > 0) {
    days.push({
      day: d,
      date: dateAt(d - 1),
      city: 'Perjalanan',
      title: `Pindah Kota — ${first.city} → ${second.city}`,
      items: [
        first.city === 'Makkah'
          ? 'Shalat Subuh terakhir & thawaf wada di Masjidil Haram'
          : 'Shalat Subuh terakhir & salam perpisahan di Masjid Nabawi',
        first.hotel ? `Check-out ${first.hotel}` : 'Check-out hotel',
        `Perjalanan ${second.transferLabel}`,
        second.hotel ? `Check-in ${second.hotel}, malamnya langsung ke ${second.city === 'Makkah' ? 'Masjidil Haram' : 'Masjid Nabawi'}` : 'Check-in hotel',
      ],
    });
    d++;

    const secondFullDays = Math.max(0, second.nights - 1);
    for (let i = 0; i < secondFullDays; i++) {
      const t = cycle(second.days, i);
      days.push({ day: d, date: dateAt(d - 1), city: second.city, title: t.title, items: t.items });
      d++;
    }
  }

  // Hari kepulangan
  days.push({
    day: d,
    date: returnDate ?? dateAt(d - 1),
    city: 'Perjalanan',
    title: `Kepulangan — ${second.nights > 0 ? second.city : first.city} → Indonesia`,
    items: [
      second.city === 'Makkah' || (second.nights === 0 && first.city === 'Makkah')
        ? 'Thawaf wada & shalat Subuh terakhir di Masjidil Haram'
        : 'Shalat Subuh terakhir & ziyarah pamit di Masjid Nabawi',
      'Check-out hotel, transfer ke bandara (hitung mundur 5–6 jam dari jam terbang)',
      'Check-in, imigrasi & boarding — pastikan bagasi tidak overweight',
      'Alhamdulillah, tiba kembali di Indonesia',
    ],
  });

  return days;
}

// Tips penting (ringkasan dari sheet Catatan Excel)
export const ITINERARY_TIPS = [
  'Install aplikasi: Nusuk (booking Raudhah), HHR Train, Careem/Uber, Qibla Compass',
  'Waktu afdhal ibadah: dini hari 02.00–05.00 di kedua Masjid',
  'Minum 3–5 liter air/hari, pakai sandal nyaman, bawa payung/masker',
  'Air zamzam untuk dibawa pulang dibeli di bandara — 5 liter per paspor',
  'Darurat: Saudi 911 · KJRI Jeddah +966-12-671-1271',
];
