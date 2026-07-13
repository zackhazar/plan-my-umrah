// ============================================================
// KONFIGURASI PUSAT — Fase 1 (semua harga & kontak di satu file)
// Update harga cukup edit file ini, commit, deploy.
// Fase 2: data ini akan dipindah ke Supabase.
// ============================================================

// Nomor WhatsApp CS PT Hajar Aswad Barokah (format internasional tanpa +)
// GANTI dengan nomor asli sebelum production!
export const WHATSAPP_NUMBER = '6281234567890';

export const SITE_NAME = 'Plan My Umrah';
export const COMPANY_NAME = 'PT Hajar Aswad Barokah';

// ---------- Bandara tujuan ----------
export const ARRIVAL_AIRPORTS = [
  { code: 'JED', label: 'Jeddah (JED)' },
  { code: 'MED', label: 'Madinah (MED)' },
] as const;

// ---------- Hotel ----------
export interface HotelOption {
  id: string;
  name: string;
  stars: number;
  distance: number; // meter ke Masjidil Haram / Masjid Nabawi
  pricePerNight: number; // Rupiah
}

export const MAKKAH_HOTELS: HotelOption[] = [
  { id: 'm1', name: 'Fairmont Makkah Clock Royal', stars: 5, distance: 50, pricePerNight: 3500000 },
  { id: 'm2', name: 'Swissôtel Makkah', stars: 5, distance: 100, pricePerNight: 2800000 },
  { id: 'm3', name: 'Hilton Suites Makkah', stars: 5, distance: 200, pricePerNight: 2500000 },
  { id: 'm4', name: 'Elaf Kinda Hotel', stars: 4, distance: 400, pricePerNight: 1200000 },
];

export const MADINAH_HOTELS: HotelOption[] = [
  { id: 'md1', name: 'The Oberoi, Madina', stars: 5, distance: 10, pricePerNight: 4500000 },
  { id: 'md2', name: 'Anwar Al Madinah Mövenpick', stars: 5, distance: 50, pricePerNight: 2600000 },
  { id: 'md3', name: 'Pullman Zamzam Madina', stars: 5, distance: 150, pricePerNight: 2300000 },
  { id: 'md4', name: 'Rove Al Madinah', stars: 4, distance: 300, pricePerNight: 1100000 },
];

// ---------- Transportasi (harga per pax) ----------
export interface TransportPackageOption {
  id: string;
  vehicle: string;
  route: string;
  price: number;
  description: string;
}

export const TRANSPORT_PACKAGES: TransportPackageOption[] = [
  {
    id: 'bus',
    vehicle: 'Bus Eksekutif',
    route: 'Semua Rute (Bandara - Makkah - Madinah - Bandara)',
    price: 1500000,
    description: 'Transportasi standar yang nyaman dengan AC dingin, cocok untuk perjalanan santai.',
  },
  {
    id: 'haramain',
    vehicle: 'Kereta Cepat Haramain',
    route: 'Kereta (Makkah-Madinah) + Bus (Bandara)',
    price: 3500000,
    description: 'Pangkas waktu tempuh Makkah-Madinah dari 6 jam menjadi hanya 2.5 jam. Bebas macet.',
  },
  {
    id: 'gmc',
    vehicle: 'Private GMC / SUV',
    route: 'Kendaraan Pribadi untuk Semua Rute',
    price: 6500000,
    description: 'Privasi maksimal, jadwal fleksibel, dan kenyamanan VIP khusus untuk keluarga Anda.',
  },
];

// ---------- Visa (harga per pax, termasuk bayi) ----------
export interface VisaPackageOption {
  type: string;
  price: number;
  includesSiskopatuh: boolean;
  includesInsurance: boolean;
  description: string;
}

export const VISA_PACKAGES: VisaPackageOption[] = [
  {
    type: 'Visa Umrah + Siskopatuh',
    price: 3500000,
    includesSiskopatuh: true,
    includesInsurance: true,
    description: 'Visa khusus Umrah (Single Entry), sudah termasuk pendaftaran resmi Siskopatuh Kemenag RI.',
  },
  {
    type: 'Visa Turis (Multiple Entry)',
    price: 2800000,
    includesSiskopatuh: false,
    includesInsurance: true,
    description: 'Visa Turis berlaku 1 tahun. Bebas keluar masuk Arab Saudi. Tanpa Siskopatuh.',
  },
];

// ---------- Layanan ekstra (harga flat per rombongan) ----------
export interface ExtraServiceOption {
  id: string;
  serviceName: string;
  price: number;
  desc: string;
}

export const EXTRA_SERVICES: ExtraServiceOption[] = [
  { id: 'opt1', serviceName: 'Mutawwif / Pemandu Privat', price: 1500000, desc: 'Pemandu ibadah pribadi selama di Makkah & Madinah.' },
  { id: 'opt2', serviceName: 'City Tour Taif + Kereta Gantung', price: 1200000, desc: 'Perjalanan 1 hari ke kota Taif yang sejuk termasuk naik cable car.' },
  { id: 'opt3', serviceName: 'Airport Lounge Access', price: 500000, desc: 'Akses ruang tunggu eksklusif di bandara Jeddah/Madinah.' },
  { id: 'opt4', serviceName: 'Handling & Perlengkapan', price: 1000000, desc: 'Bantuan koper di bandara + kain Ihram/Mukena & Tas.' },
];
