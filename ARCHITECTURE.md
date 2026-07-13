# ARCHITECTURE.md — Audit Codebase Plan My Umrah

Tanggal audit: 2026-07-13. Sesi audit-only, tidak ada kode yang diubah.

---

## 0. Temuan Kunci (TL;DR)

1. **Root project ada di subfolder** `plan-my-umrah/plan-my-umrah/` — repo root hanya berisi README. Ini akan menyulitkan deploy Vercel (harus set *Root Directory*).
2. **Tidak ada Prisma sama sekali** — tidak ada `schema.prisma`, tidak ada dependency `prisma`/`@prisma/client`. Deskripsi project "Supabase + Prisma" belum terealisasi di kode.
3. **Supabase belum tersambung sama sekali** — paket `@supabase/ssr` dan `@supabase/supabase-js` ter-install di `package.json`, tapi **nol** pemakaian di source code. Semua data 100% hardcoded.
4. **`npm run build` GAGAL** di tahap ESLint (6 error). Typecheck (`tsc --noEmit`) lolos. Detail di bagian Build Health.
5. **Sistem theming Tailwind v4 rusak**: utility `bg-primary`, `text-secondary`, `bg-background`, `border-border`, `bg-card`, dll **tidak tergenerate** di CSS hasil build (diverifikasi dengan grep pada output `.next`). Penyebab: variabel didefinisikan di `:root` sebagai `--primary` dst., tapi Tailwind v4 butuh `@theme` dengan namespace `--color-*`. Blok `@theme inline` khas shadcn/Tailwind-v4 tidak ada di `globals.css`.
6. **Keamanan: AMAN.** Tidak ada file `.env` atau credential yang ter-commit, baik di working tree maupun di seluruh git history (dicek via `git log --all --diff-filter=A`). `.gitignore` sudah meng-ignore `.env*`.
7. Aplikasi inti (wizard 9 langkah + kalkulasi biaya) **secara logika sudah lengkap dan berfungsi** — ini fondasi Fase 1 yang bagus. Yang belum ada untuk Fase 1: CTA WhatsApp, dan konsistensi tema visual.

---

## 1. Struktur Folder Beranotasi

```
plan-my-umrah/                          ← REPO ROOT (hanya README + subfolder)
├── README.md                           ← deskripsi produk 1 paragraf
└── plan-my-umrah/                      ← ROOT PROJECT SEBENARNYA (Next.js app)
    ├── package.json                    ← Next 15.5 + React 19 + Tailwind v4 + zustand; supabase ter-install tapi tak dipakai
    ├── next.config.ts                  ← kosong (default)
    ├── tsconfig.json                   ← strict mode, alias @/* → src/*
    ├── components.json                 ← konfigurasi shadcn (style radix-nova)
    ├── eslint.config.mjs               ← config ESLint Next default
    ├── postcss.config.mjs              ← Tailwind v4 via @tailwindcss/postcss
    ├── public/                         ← HANYA aset default create-next-app (next.svg, vercel.svg, dll) — semuanya tak dipakai
    └── src/
        ├── app/
        │   ├── layout.tsx              ← root layout; MASIH default create-next-app (title "Create Next App", lang="en", font Geist)
        │   ├── page.tsx                ← landing page (tema terang, bahasa Indonesia, CTA → /planner)
        │   ├── planner/page.tsx        ← wizard 9 langkah (client component, tema gelap)
        │   ├── globals.css             ← tema "Clean & Elegant" terang; KONFIGURASI @theme TIDAK LENGKAP (lihat Temuan #5)
        │   └── favicon.ico
        ├── components/ui/              ← komponen shadcn: button, calendar, input, progress
        │   └── (progress.tsx tidak pernah dipakai — planner pakai progress bar manual)
        ├── features/planner/
        │   ├── store/usePlannerStore.ts    ← Zustand store + persist ke localStorage; sumber kebenaran state wizard
        │   └── components/
        │       ├── Step1Travellers.tsx     ← jumlah dewasa/anak/bayi
        │       ├── Step2Dates.tsx          ← kalender berangkat & pulang
        │       ├── Step3Flights.tsx        ← bandara + input harga tiket manual
        │       ├── Step4HotelMakkah.tsx    ← pilih hotel Makkah (DATA HARDCODED) atau harga kustom
        │       ├── Step5HotelMadinah.tsx   ← pilih hotel Madinah (DATA HARDCODED) — copy-paste Step4
        │       ├── Step6Transport.tsx      ← 3 paket transport (DATA HARDCODED)
        │       ├── Step7Visa.tsx           ← 2 paket visa (DATA HARDCODED)
        │       ├── Step8Optionals.tsx      ← 4 layanan ekstra (DATA HARDCODED)
        │       └── Step9Summary.tsx        ← rekap grand total + tombol "Cetak PDF" (window.print)
        ├── lib/utils.ts                ← helper cn() (clsx + tailwind-merge)
        └── types/planner.types.ts      ← seluruh tipe state planner
```

Total source code: ±1.600 baris. Tidak ada folder `api/`, tidak ada middleware, tidak ada server action — murni aplikasi client-side.

## 2. Route / Halaman & Status

| Route | File | Status | Catatan |
|---|---|---|---|
| `/` | `src/app/page.tsx` | **Setengah jadi** | Konten & copy jadi, tapi styling bergantung pada utility (`text-secondary`, `bg-background`, `font-heading`) yang tidak tergenerate → tampilan aktual rusak/polos. Link navbar semuanya `#` (dummy). Tombol "Login Admin" tidak berfungsi (Fase 2). |
| `/planner` | `src/app/planner/page.tsx` | **Setengah jadi** | Logika wizard 9 langkah LENGKAP dan kalkulasi benar. Masalah: tema gelap hardcoded bertabrakan dengan tema terang landing/globals.css; utility `bg-primary`/`bg-card` tidak tergenerate. |

Tidak ada route lain. Tidak ada halaman admin, auth, atau API route (bagus untuk Fase 1 — belum ada yang perlu di-defer secara kode).

## 3. Skema Database (Prisma)

**Tidak ada.** Tidak ditemukan `prisma/schema.prisma`, tidak ada dependency Prisma, tidak ada migrasi. Seluruh "model data" saat ini hanya berupa TypeScript interfaces di `src/types/planner.types.ts`:

- `HotelSelection`, `TransportSelection`, `VisaSelection`, `OptionalService`, `PlannerState`

Interfaces ini bisa jadi cetak biru skema database Fase 2 (tabel `hotels`, `transport_packages`, `visa_packages`, `optional_services`), tapi untuk Fase 1 tidak diperlukan.

## 4. Titik Integrasi Supabase

| Item | Status |
|---|---|
| Paket `@supabase/supabase-js` + `@supabase/ssr` di package.json | Ter-install, **0 pemakaian** di kode |
| Client Supabase (`createClient` dsb.) | **Tidak ada** |
| File `.env` / env vars Supabase | **Tidak ada** |
| Satu-satunya jejak | Komentar di `Step4HotelMakkah.tsx:14`: *"Mock data: Di tahap produksi, ini akan di-fetch dari Supabase"* |

Kesimpulan: integrasi Supabase = 0%. Semua data mock/hardcoded (daftar di bawah). Untuk Fase 1 ini justru menguntungkan — tidak ada dependensi backend yang harus disiapkan.

## 5. Daftar Data Hardcoded

| Data | Lokasi | Isi |
|---|---|---|
| Hotel Makkah (4 hotel) | `src/features/planner/components/Step4HotelMakkah.tsx:16-21` | Fairmont Rp 3,5jt/mlm, Swissôtel Rp 2,8jt, Hilton Suites Rp 2,5jt, Elaf Kinda Rp 1,2jt |
| Hotel Madinah (4 hotel) | `src/features/planner/components/Step5HotelMadinah.tsx:16-21` | Oberoi Rp 4,5jt/mlm, Mövenpick Rp 2,6jt, Pullman Zamzam Rp 2,3jt, Rove Rp 1,1jt |
| Paket transport (3) | `src/features/planner/components/Step6Transport.tsx:17-39` | Bus Rp 1,5jt, Kereta Haramain Rp 3,5jt, Private GMC Rp 6,5jt (per pax) |
| Paket visa (2) | `src/features/planner/components/Step7Visa.tsx:15-30` | Visa Umrah+Siskopatuh Rp 3,5jt, Visa Turis Rp 2,8jt (per pax) |
| Layanan ekstra (4) | `src/features/planner/components/Step8Optionals.tsx:14-19` | Mutawwif Rp 1,5jt, Taif Tour Rp 1,2jt, Lounge Rp 500rb, Handling Rp 1jt |
| Bandara tujuan (JED/MED) | `src/features/planner/components/Step3Flights.tsx:47-53` | Hardcoded `<option>` di JSX |
| Warna hex tema gelap | Semua Step1–Step9 | `#121212`, `rgba(214,175,55,...)`, `#E5C158` tersebar di className |

Rekomendasi (untuk sesi berikutnya, bukan sekarang): satukan semua ke satu file `src/config/pricing.ts`.

## 6. Kode Mati / Duplikat / Sisa Eksperimen (aman dihapus nanti)

- `src/components/ui/progress.tsx` — di-import di `planner/page.tsx` tapi tidak pernah dirender (progress bar dibuat manual dengan div).
- Import tak terpakai: `Image` (`app/page.tsx:4`), `Progress` (`planner/page.tsx:5`), `ShieldCheck` (`Step7Visa.tsx:5`), `Printer` (`Step9Summary.tsx:5`).
- Variabel tak terpakai: `totalTravellers` di `Step7Visa.tsx:13`.
- `public/*.svg` (next.svg, vercel.svg, file.svg, globe.svg, window.svg) — aset default create-next-app, tidak direferensikan di mana pun.
- Duplikasi besar: `Step4HotelMakkah.tsx` dan `Step5HotelMadinah.tsx` ±95% identik (kandidat merge jadi satu komponen `StepHotel` berparameter kota — tapi ini refactor Fase pemolesan, bukan blocker).
- Dependency mencurigakan di package.json: `shadcn` (^4.11.0) sebagai runtime dependency — ini CLI, seharusnya tidak ada di `dependencies`. `next-themes` ter-install tapi tidak dipakai. `tailwindcss-animate` DAN `tw-animate-css` dua-duanya ter-install (redundan; hanya `tailwindcss-animate` yang di-@plugin).
- Field `dates` sengaja tidak masuk `partialize` persist di store — kemungkinan disengaja (Date tidak survive JSON), tapi efeknya: refresh halaman di step ≥3 membuat `step` tersimpan tapi tanggal hilang. Dicatat sebagai bug minor, bukan kode mati.

## 7. Build Health

Dijalankan di `plan-my-umrah/plan-my-umrah/` pada 2026-07-13:

| Perintah | Hasil |
|---|---|
| `npm install` | ✅ Sukses, tanpa error |
| `npx tsc --noEmit` | ✅ Lolos, 0 error |
| `npm run build` | ❌ **GAGAL** — kompilasi Turbopack sukses, tapi tahap "Linting and checking validity of types" gagal dengan 6 error ESLint |

Error ESLint (memblokir build):

1. `app/page.tsx:64` — 2× `react/no-unescaped-entities` (tanda kutip `"` di JSX)
2. `features/planner/components/Step6Transport.tsx:42` — `@typescript-eslint/no-explicit-any`
3. `features/planner/store/usePlannerStore.ts:44, 52, 56` — 3× `@typescript-eslint/no-explicit-any`

Warning (tidak memblokir): 5 unused imports/variables (daftar di bagian 6).

Temuan build tambahan (tidak muncul sebagai error, tapi fatal secara visual):

- **CSS token tidak tergenerate.** Grep pada CSS hasil build (`.next/static/chunks/*.css`) hanya menemukan `.font-heading`; `.bg-primary`, `.text-primary`, `.bg-background`, `.text-secondary`, `.border-border`, `.bg-card` **tidak ada**. Penyebab: `globals.css` mendefinisikan `--primary`, `--background`, dll. di `:root` tanpa blok `@theme inline { --color-primary: var(--primary); ... }` yang diwajibkan Tailwind v4. Kelas seperti `hover:bg-primary-hover` juga tidak valid (`--color-primary-hover` didefinisikan di `:root`, bukan `@theme`).
- **Font tidak nyambung.** `globals.css` mereferensikan `var(--font-inter)` dan `var(--font-playfair)`, tapi `layout.tsx` hanya me-load Geist (`--font-geist-sans`/`--font-geist-mono`). Akibatnya `font-heading` jatuh ke fallback Georgia.
- `layout.tsx` masih metadata default: `title: "Create Next App"`, `lang="en"` — buruk untuk SEO/lead magnet.

## 8. Keamanan

✅ **Tidak ada temuan.** Tidak ada `.env*`, API key, atau credential di working tree maupun di seluruh riwayat git. `.gitignore` sudah benar meng-exclude `.env*`. Belum ada secret yang dibutuhkan karena belum ada integrasi backend.

---

## 9. Rekomendasi

### KEEP — fondasi solid Fase 1

- **Wizard 9 langkah + Zustand store** (`features/planner/*`): arsitektur state bersih, logika kalkulasi di Step9 sudah benar (pax dewasa+anak untuk tiket/transport, semua pax termasuk bayi untuk visa), persist ke localStorage berfungsi.
- **Struktur feature-folder** (`src/features/planner/`): pola yang tepat, siap menampung fitur Fase 2 tanpa refactor.
- **Tipe TypeScript** (`types/planner.types.ts`): lengkap dan bisa jadi cetak biru skema DB Fase 2.
- **Copywriting bahasa Indonesia** di landing dan seluruh step — sudah bagus, tinggal poles.
- **Keputusan tanpa backend** untuk Fase 1: tidak ada auth, API, atau DB yang menghambat go-live.

### FIX — wajib sebelum planner publik live (urut prioritas)

| # | Item | Effort |
|---|---|---|
| 1 | Perbaiki 6 error ESLint yang memblokir `npm run build` (escape kutipan, ganti `any` dengan tipe yang sudah ada di `planner.types.ts`) | **S** |
| 2 | Perbaiki `globals.css`: tambah blok `@theme inline` Tailwind v4 agar `bg-primary`, `bg-background`, dll. tergenerate; putuskan satu tema (terang atau gelap) dan selaraskan landing vs planner | **M** |
| 3 | Konfigurasi Vercel: set *Root Directory* ke `plan-my-umrah/` (atau pindahkan project ke repo root — lebih bersih tapi butuh persetujuan) | **S** |
| 4 | **Tambah CTA WhatsApp** di Step9Summary (tujuan utama lead magnet — saat ini hanya ada tombol print). Link `wa.me` berisi ringkasan estimasi | **S** |
| 5 | `layout.tsx`: metadata proper (title, description, OG), `lang="id"`, load font Inter + Playfair sesuai referensi globals.css | **S** |
| 6 | Sembunyikan/hapus tombol "Login Admin" dan link navbar dummy (`#`) di landing | **S** |
| 7 | Ekstrak semua data hardcoded (bagian 5) ke satu file `src/config/pricing.ts` supaya update harga = edit satu file | **S–M** |
| 8 | Bug minor: `dates` tidak di-persist → user yang refresh di step ≥3 kehilangan tanggal tapi tetap di step tsb; tambahkan juga guard hydration zustand-persist (risiko flash/mismatch SSR) | **S** |
| 9 | QA mobile + cetak (tombol "Cetak PDF" belum punya print stylesheet; hasil print tema gelap akan boros tinta/jelek) | **M** |

### DEFER — milik Fase 2, jangan disentuh sekarang

- Integrasi Supabase (hotel/harga dari DB) — paket sudah ter-install, biarkan.
- Prisma + skema database (belum ada; desain dari `planner.types.ts` saat dibutuhkan).
- Auth & halaman admin (tombol "Login Admin" indikasi rencana ini).
- Vendor management & quotation engine.
- Merge duplikasi Step4/Step5 dan pembersihan dependency (`shadcn`, `next-themes`, `tw-animate-css`) — bagus dilakukan, tapi bukan blocker go-live.

---

## 10. Jawaban Pertanyaan Kunci: Berapa Hari ke Production?

**Estimasi realistis: 3–5 hari kerja** (1 developer, harga tetap hardcoded di satu file config).

Rincian:

- **Hari 1**: FIX #1 + #3 → build hijau dan ter-deploy ke Vercel (preview). Ini tercapai cepat karena logika aplikasi sudah utuh.
- **Hari 2**: FIX #2 + #5 → tema konsisten dan tampilan sesuai desain. Ini item terbesar karena styling saat ini rusak diam-diam.
- **Hari 3**: FIX #4, #6, #7 → CTA WhatsApp, bersihkan landing, konsolidasi config harga.
- **Hari 4–5**: FIX #8, #9 → QA mobile/print, polish, domain + production deploy.

Skenario tercepat (minimum layak, tanpa polish print/mobile mendalam): **3 hari**. Skenario aman dengan QA menyeluruh: **5 hari**. Tidak ada risiko teknis besar yang tersembunyi — tidak ada backend, tidak ada auth, dan seluruh masalah yang ditemukan bersifat lokal dan terdefinisi jelas.
