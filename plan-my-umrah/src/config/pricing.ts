// ============================================================
// KONFIGURASI PUSAT — semua harga, kurs & kontak di satu file.
// Update harga cukup edit file ini, commit, deploy.
// ============================================================

// Nomor WhatsApp CS PT Hajar Aswad Barokah (format internasional tanpa +)
// 082139881976 → 6282139881976
export const WHATSAPP_NUMBER = '6282139881976';

export const SITE_NAME = 'Plan My Umrah';
export const COMPANY_NAME = 'PT Hajar Aswad Barokah';
export const BRAND_NAME = 'Hajar Aswad Barokah';
export const INSTAGRAM_HANDLE = '@hajaraswadbarokah';

// ---------- Kurs (update berkala) ----------
export const SAR_RATE = 4800; // 1 SAR = Rp 4.800
export const USD_RATE = 16000; // 1 USD ≈ Rp 16.000 (untuk paket 35+ pax)

export const sarToIdr = (sar: number) => sar * SAR_RATE;

// ---------- Bandara ----------
export const SAUDI_AIRPORTS = [
  { code: 'JED', label: 'Jeddah (JED)' },
  { code: 'MED', label: 'Madinah (MED)' },
] as const;

// ---------- Hotel ----------
// CATATAN: harga di bawah adalah harga REFERENSI. Harga hotel naik-turun
// mengikuti musim (season). Integrasi harga real-time dari OTA / data upload
// direncanakan di fase berikutnya — untuk sekarang jemaah bisa override
// dengan input harga manual.
export interface HotelOption {
  id: string;
  name: string;
  stars: number;
  distance: number; // meter ke Masjidil Haram / Masjid Nabawi
  pricePerNight: number; // Rupiah (referensi)
  // Foto hotel: taruh file di public/images/hotels/<id>.jpg lalu isi path di sini,
  // mis. '/images/hotels/m1.jpg'. Kosongkan (undefined) untuk pakai ikon placeholder.
  image?: string;
}

// PENTING: pricePerNight = harga REFERENSI PER KAMAR PER MALAM (musim normal),
// dalam Rupiah. Angka ini estimasi pasar — WAJIB disesuaikan dengan price list
// resmi terbaru Hajar Aswad Barokah. Jemaah juga bisa override via input manual.
export const MAKKAH_HOTELS: HotelOption[] = [
  { id: 'm1', name: 'Fairmont Makkah Clock Royal', stars: 5, distance: 50, pricePerNight: 5000000, image: '/images/hotels/fairmont-makkah.jpg' },
  { id: 'm2', name: 'Address Jabal Omar Makkah', stars: 5, distance: 300, pricePerNight: 4000000, image: '/images/hotels/address-jabal-omar.jpg' },
  { id: 'm3', name: 'InterContinental Dar Attauhid', stars: 5, distance: 100, pricePerNight: 3500000, image: '/images/hotels/dar-attauhid.jpg' },
  { id: 'm4', name: 'Al Marwa Rayhaan by Rotana', stars: 5, distance: 100, pricePerNight: 3000000, image: '/images/hotels/marwa-rotana.jpg' },
  { id: 'm5', name: 'Makarim Ajyad Makkah', stars: 4, distance: 600, pricePerNight: 1300000, image: '/images/hotels/makarim-ajyad.jpg' },
  { id: 'm6', name: 'Time Ruba Hotel & Suites', stars: 4, distance: 700, pricePerNight: 950000, image: '/images/hotels/time-ruba.jpg' },
];

export const MADINAH_HOTELS: HotelOption[] = [
  { id: 'md1', name: 'Sofitel Shahd Al Madinah', stars: 5, distance: 200, pricePerNight: 3500000, image: '/images/hotels/sofitel-madinah.jpg' },
  { id: 'md2', name: 'Hilton Madinah', stars: 5, distance: 100, pricePerNight: 2800000, image: '/images/hotels/hilton-madinah.jpg' },
  { id: 'md3', name: 'Al Aqeeq Hotel Madinah', stars: 4, distance: 50, pricePerNight: 1400000, image: '/images/hotels/al-aqeeq-madinah.jpg' },
  { id: 'md4', name: 'Durrat Al Eiman', stars: 4, distance: 150, pricePerNight: 1100000, image: '/images/hotels/durrat-al-eiman.jpg' },
];

// ============================================================
// TRANSPORTASI
// ============================================================

// ---------- Mobil privat (harga PER KENDARAAN, bukan per pax!) ----------
// Sumber: price list resmi Hajar Aswad Barokah (SAR), terdaftar di Nusuk.
export interface CarVehicle {
  id: 'camry' | 'gmc' | 'staria' | 'hiace';
  name: string;
  seats: number;
  // Foto kendaraan: taruh file di public/images/vehicles/<id>.jpg lalu isi path,
  // mis. '/images/vehicles/camry.jpg'. Kosongkan untuk pakai ikon placeholder.
  image?: string;
}

export const CAR_VEHICLES: CarVehicle[] = [
  { id: 'camry', name: 'Camry Sonata', seats: 4, image: '/images/vehicles/camry.jpg' },
  { id: 'staria', name: 'Hyundai Staria', seats: 7, image: '/images/vehicles/staria.jpg' },
  { id: 'gmc', name: 'GMC New Model', seats: 8, image: '/images/vehicles/gmc.avif' },
  { id: 'hiace', name: 'Hiace', seats: 12, image: '/images/vehicles/hiace.webp' },
];

export interface CarRoute {
  id: string;
  route: string;
  // harga dalam SAR per kendaraan
  prices: { camry: number; gmc: number; staria: number; hiace: number };
}

export const CAR_ROUTES: CarRoute[] = [
  { id: 'jed-mak', route: 'Jeddah Airport → Makkah', prices: { camry: 300, gmc: 550, staria: 400, hiace: 500 } },
  { id: 'mak-jed', route: 'Makkah → Jeddah', prices: { camry: 250, gmc: 450, staria: 350, hiace: 450 } },
  { id: 'mak-mad', route: 'Makkah → Madinah', prices: { camry: 550, gmc: 1100, staria: 680, hiace: 800 } },
  { id: 'mad-mak', route: 'Madinah → Makkah', prices: { camry: 550, gmc: 1100, staria: 680, hiace: 800 } },
  { id: 'jed-mad', route: 'Jeddah Airport → Madinah', prices: { camry: 600, gmc: 1100, staria: 680, hiace: 800 } },
  { id: 'mad-jed', route: 'Madinah → Jeddah Airport', prices: { camry: 600, gmc: 1100, staria: 700, hiace: 800 } },
  { id: 'medair-hotel', route: 'Madinah Airport → Hotel Madinah', prices: { camry: 250, gmc: 400, staria: 300, hiace: 400 } },
  { id: 'hotel-medair', route: 'Hotel Madinah → Madinah Airport', prices: { camry: 200, gmc: 300, staria: 280, hiace: 400 } },
  { id: 'mak-zay', route: 'Makkah Zayarat — 3 jam', prices: { camry: 330, gmc: 500, staria: 350, hiace: 400 } },
  { id: 'mad-zay', route: 'Madinah Zayarat — 3 jam', prices: { camry: 300, gmc: 500, staria: 320, hiace: 420 } },
  { id: 'taif-zay', route: 'Makkah → Taif Zayarat — 6 jam', prices: { camry: 600, gmc: 1100, staria: 750, hiace: 800 } },
  { id: 'mak-train', route: 'Antar/Jemput Stasiun Kereta Makkah', prices: { camry: 190, gmc: 320, staria: 250, hiace: 300 } },
  { id: 'mad-train', route: 'Antar/Jemput Stasiun Kereta Madinah', prices: { camry: 190, gmc: 320, staria: 250, hiace: 300 } },
  { id: 'jed-city', route: 'Jeddah Airport → Jeddah City', prices: { camry: 250, gmc: 350, staria: 300, hiace: 350 } },
];

// ---------- Kereta Cepat Haramain (harga PER PENUMPANG, Rupiah) ----------
export interface TrainRoute {
  id: string;
  route: string;
  economy: number;
  business: number;
}

export const TRAIN_ROUTES: TrainRoute[] = [
  { id: 'hhr-mak-mad', route: 'Makkah → Madinah', economy: 1000000, business: 2100000 },
  { id: 'hhr-mad-mak', route: 'Madinah → Makkah', economy: 1000000, business: 2100000 },
  { id: 'hhr-jed-mak', route: 'Jeddah → Makkah', economy: 460000, business: 680000 },
  { id: 'hhr-jed-mad', route: 'Jeddah → Madinah', economy: 820000, business: 1850000 },
  { id: 'hhr-mad-jed', route: 'Madinah → Jeddah', economy: 820000, business: 1850000 },
];

// ---------- Bus (harga flat per bus, full trip) ----------
export const BUS_FULL_TRIP = {
  id: 'bus-full',
  label: 'Bus Full Trip (Bandara – Makkah – Madinah – Bandara)',
  priceSar: 2500,
  price: sarToIdr(2500), // Rp 12.000.000
};

// ============================================================
// VISA UMRAH — JALUR NORMAL
// ============================================================
// Harga per pax bertingkat sesuai jumlah jemaah.
export interface VisaTier {
  minPax: number;
  maxPax: number;
  pricePerPax: number; // Rupiah
  label: string;
}

export const VISA_TIERS: VisaTier[] = [
  { minPax: 1, maxPax: 1, pricePerPax: 2800000, label: '1 pax' },
  { minPax: 2, maxPax: 3, pricePerPax: 2700000, label: '2–3 pax' },
  { minPax: 4, maxPax: 9, pricePerPax: 2600000, label: '4–9 pax' },
  { minPax: 10, maxPax: 20, pricePerPax: 2500000, label: '10–20 pax' },
  { minPax: 21, maxPax: 34, pricePerPax: 2400000, label: '21–34 pax' },
];

// 35 pax ke atas: paket Visa + Bus USD 130/pax
export const VISA_GROUP_35 = {
  priceUsdPerPax: 130,
  pricePerPax: 130 * USD_RATE, // estimasi Rupiah, kurs di atas
  label: '35+ pax (Visa + Bus, USD 130/pax)',
};

export const SISKOPATUH_PER_PAX = 200000; // wajib, Rp/pax

// Bantuan approval hotel BRN (opsional) — SAR per hari per orang
export const BRN_APPROVAL_SAR_PER_DAY = 15;
export const BRN_APPROVAL_SAR_PER_DAY_RAMADHAN = 27;

export const VISA_REQUIREMENTS = [
  'Paspor',
  'KTP',
  'Kartu Keluarga (KK)',
  'Tiket pesawat PP',
  'Booking hotel yang terdaftar di Nusuk sesuai jumlah hari pada tiket',
  'Bukti transportasi lengkap (kedatangan, perpindahan, kepulangan)',
  'Vaksin Polio & Meningitis',
];

export const VISA_NOTES = [
  'Visa Umrah sudah termasuk asuransi — jika terjadi gangguan kesehatan dan dirawat di RS Arab Saudi, GRATIS.',
  'Approval hotel dilakukan secara mandiri. Jika ingin dibantu approval hotel (BRN): +15 SAR/hari/orang (khusus Ramadhan: 27 SAR/hari/orang). Harga ditentukan di awal pengajuan.',
  '+ Siskopatuh Rp 200.000/pax (pendaftaran resmi Kemenag RI).',
];

// ---------- Layanan tambahan ----------
// Mutawwif: SAR 300 per hari
export const MUTAWWIF = {
  id: 'mutawwif',
  serviceName: 'Mutawwif / Pemandu Ibadah',
  priceSarPerDay: 300,
  pricePerDay: sarToIdr(300), // Rp 1.440.000 / hari
  desc: 'Pemandu ibadah berpengalaman mendampingi rombongan Anda selama di Tanah Suci.',
};

// ============================================================
// TESTIMONI — GANTI dengan testimoni asli Anda!
// Ratusan testimoni real ada di WA/IG admin; salin ke sini
// (nama boleh disingkat demi privasi jemaah).
// ============================================================
export interface Testimonial {
  name: string;
  origin: string;
  service: string; // Transport / Tiket / Visa / Pelayanan / dll
  text: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Bpk. H. Ahmad S.',
    origin: 'Surabaya',
    service: 'Transportasi',
    text: 'Driver sopan dan paham rute, jemput tepat waktu di Bandara Jeddah. Mobil bersih dan wangi. Recommended!',
  },
  {
    name: 'Ibu Siti R.',
    origin: 'Jakarta',
    service: 'Visa',
    text: 'Proses visa umrah jalur normal dibantu sampai tuntas, approval hotel juga dibantu. Semua jelas dari awal, tidak ada biaya tersembunyi.',
  },
  {
    name: 'Kel. Bpk. Dedi',
    origin: 'Bandung',
    service: 'Full Service',
    text: 'Berangkat umrah mandiri 6 orang sekeluarga. Dari tiket, hotel, kereta Haramain sampai mutawwif diurus rapi. Hemat jauh dibanding paket travel.',
  },
  {
    name: 'Bpk. Fauzi',
    origin: 'Semarang',
    service: 'Transportasi',
    text: 'Pakai Hiace untuk rombongan 11 orang, Makkah ke Madinah lancar. Respon WA cepat, harga sesuai price list.',
  },
  {
    name: 'Ibu Aminah',
    origin: 'Makassar',
    service: 'Tiket & Hotel',
    text: 'Dibantu carikan hotel dekat Masjid Nabawi sesuai budget. Pelayanan ramah dan amanah.',
  },
  {
    name: 'Bpk. Rizky',
    origin: 'Yogyakarta',
    service: 'Pelayanan',
    text: 'Sudah 2x umrah pakai jasa Hajar Aswad Barokah. Amanah, nyaman, profesional — sesuai slogannya.',
  },
];
