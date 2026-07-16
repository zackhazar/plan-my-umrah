# ARCHITECTURE.md — Audit Codebase Plan My Umrah (v2)

Tanggal audit: **2026-07-16**. Sesi audit-only, tidak ada kode yang diubah.
Menggantikan audit lama (2026-07-13) yang sudah basi — sebagian besar temuan FIX audit lama **sudah dikerjakan** di commit-commit terakhir.

---

## 0. Temuan Kunci (TL;DR)

1. **Build 100% HIJAU.** `npm install` ✅ · `npx tsc --noEmit` ✅ 0 error · `npm run build` ✅ sukses · `next lint` ✅ 0 warning. Semua 6 error ESLint audit lama sudah diperbaiki.
2. **Root project masih nested** di `plan-my-umrah/plan-my-umrah/`. Bukan blocker — Vercel tinggal set *Root Directory* = `plan-my-umrah`.
3. **Sebagian besar FIX audit lama SUDAH SELESAI**: config harga terpusat (`src/config/pricing.ts`), CTA WhatsApp dengan pesan prefill lengkap di Step9, nomor WA asli (6282139881976), metadata + `lang="id"` + font Inter/Playfair, `@theme inline` Tailwind v4 sudah benar, tema landing & planner konsisten terang, Step4/Step5 sudah di-merge ke `HotelStep` bersama, persist tanggal (reviver Date) + guard hidrasi, print stylesheet dasar ada.
4. **Gap terbesar vs BRIEFING.md**: (a) `/` saat ini adalah landing *Plan My Umrah*, **bukan** company profile PT Hajar Aswad Barokah (5 pilar, legalitas PPIU, trust stats 220K); (b) desain memakai tema "ivory + emas + zamrud, serif Playfair" — **bukan** design system "Warm Editorial" (headline sans tebal uppercase, aksen coklat `#8A5A33`, section gelap foto-card, dark/light toggle); (c) planner di `/planner`, briefing menyebut `/plan`; (d) belum ada floating WhatsApp button & scroll-to-top.
5. **Harga di `pricing.ts` berbeda dari angka BRIEFING §4** — model kode lebih granular (rute per kendaraan SAR, tier visa per pax, kereta per rute) daripada model briefing (3 tier hotel, tier tiket, transport ±4.94jt/grup). Butuh keputusan Zack: mana sumber kebenaran. (Catatan: kode ini justru berasal dari price list resmi + Excel, kemungkinan lebih baru dari briefing.)
6. **Keamanan: AMAN.** Tidak ada `.env`/credential di working tree maupun seluruh git history. `.gitignore` benar.
7. Tidak ada Prisma, tidak ada pemakaian Supabase di kode (paket ter-install tapi 0 pemakaian) — sesuai rencana Fase 1 tanpa backend.

---

## 1. Struktur Folder Beranotasi

```
plan-my-umrah/                          ← REPO ROOT (README, BRIEFING.md, ARCHITECTURE.md)
└── plan-my-umrah/                      ← ROOT PROJECT SEBENARNYA (Next.js 15.5 + React 19 + Tailwind v4)
    ├── package.json                    ← zustand, date-fns, lucide, radix; supabase/next-themes/shadcn ter-install tapi TAK dipakai
    ├── next.config.ts                  ← kosong (default)
    ├── public/images/
    │   ├── hotels/ (10 foto)           ← foto hotel asli, dipakai pricing.ts
    │   ├── vehicles/ (6 foto)          ← foto kendaraan (camry, gmc, staria, hiace, bus, coaster)
    │   ├── kabbah/kabbah-1.jpg         ← foto hero landing
    │   └── logo/ (4 SVG)               ← logo brand emas/putih
    └── src/
        ├── app/
        │   ├── layout.tsx              ← metadata proper, lang="id", font Inter + Playfair ✅
        │   ├── page.tsx                ← landing Plan My Umrah (bukan company profile PT HAB)
        │   ├── planner/page.tsx        ← wizard 9 langkah + progress bar + step dots
        │   └── globals.css             ← tema terang ivory/emas/zamrud; @theme inline Tailwind v4 BENAR ✅
        ├── components/
        │   ├── Logo.tsx                ← LogoMark + LogoFull
        │   └── ui/                     ← shadcn: button, calendar, input, progress (progress = MATI)
        ├── config/pricing.ts           ← ★ SATU-SATUNYA sumber harga/kontak/testimoni (264 baris)
        ├── features/planner/
        │   ├── itinerary.ts            ← generator itinerary harian D1..Dn dari Excel ✅
        │   ├── store/usePlannerStore.ts← Zustand + persist v2 (reviver Date) ✅
        │   └── components/
        │       ├── HotelStep.tsx           ← komponen hotel bersama (Makkah/Madinah) ✅ merge selesai
        │       ├── Step1Travellers.tsx … Step9Summary.tsx  (wizard lengkap)
        │       └── Step9Summary.tsx        ← breakdown %, itinerary, CTA WhatsApp prefill ✅
        ├── lib/utils.ts                ← cn()
        └── types/planner.types.ts      ← tipe state planner (multi-leg transport, visa tier, dll.)
```

±2.050 baris source. Murni client-side: tidak ada API route, middleware, server action, database.

## 2. Route & Status

| Route | Status | Catatan |
|---|---|---|
| `/` | **Jadi & berfungsi** — tapi SALAH PERAN vs briefing | Landing kalkulator (hero foto Ka'bah, cara kerja, kendali, testimoni dari config, footer WA). Briefing minta `/` = company profile PT HAB (5 pilar, legalitas, trust stats). Tombol "Login Admin" & link dummy sudah HILANG ✅ |
| `/planner` | **Jadi & berfungsi penuh** | Wizard 9 langkah, kalkulasi benar (hotel per-kamar × malam × kamar; tiket/transport per pax dewasa+anak; visa semua pax + tier + BRN; opsional per_pax/per_day_pax/flat), itinerary otomatis, CTA WA + cetak. Briefing menyebut path `/plan` — perlu rename atau redirect |

## 3. Prisma / Database

**Tidak ada** — tidak ada schema.prisma, dependency, atau migrasi. Sesuai Fase 1. `planner.types.ts` tetap cetak biru bagus untuk skema Fase 2.

## 4. Supabase

Paket `@supabase/supabase-js` + `@supabase/ssr` ter-install, **0 pemakaian** di src (bahkan komentar mock lama sudah hilang). Tidak ada env vars. Fase 1 tidak membutuhkannya — biarkan.

## 5. Data Hardcoded

**Semua data sudah terpusat di `src/config/pricing.ts`** ✅ — hotel (10), rute mobil SAR (14 rute × 4 kendaraan), kereta Haramain (5 rute), bus full trip, tier visa (5 tier + grup 35+), Siskopatuh, BRN, layanan opsional (8 komponen dari Excel), kurs SAR/USD, nomor WA, testimoni (6, ditandai "GANTI dengan testimoni asli").
Tidak ditemukan harga hardcoded di komponen lain. Satu-satunya "hardcoded" tersisa: mock kartu estimasi di hero `page.tsx` (angka display statis — wajar) dan bandara di config (JED/MED).

⚠️ **Diskrepansi harga vs BRIEFING §4** (perlu keputusan Zack sebelum Sesi 2):

| Item | BRIEFING §4 | pricing.ts sekarang |
|---|---|---|
| Hotel | 3 tier per kota (1.8/4/7.1jt & 1.2/2.5/4jt) | 10 hotel riil per nama, 0.95–5jt/kamar/malam |
| Tiket | 3 tier (11/13.5/18jt) | Input manual per pax (tanpa tier preset) |
| Visa+Siskopatuh | flat 2.75jt/pax | Tier 2.4–2.8jt + Siskopatuh 200rb terpisah |
| Transport | ±4.94jt/grup + 950rb/pax | Rute riil per kendaraan (SAR) / kereta / bus 2500 SAR |
| Uang saku | 3 tier (200/300/500rb) | Default 250rb/hari/pax (editable) |
| Perlengkapan dll. | 4 item | 8 komponen (dari Excel terbaru) |

Model kode lebih detail dan tampak bersumber dari price list resmi + Excel terbaru → kemungkinan besar KEEP, tapi konfirmasi.

## 6. Kode Mati / Duplikat / Dependency Tak Terpakai

- `src/components/ui/progress.tsx` — tidak di-import di mana pun (progress bar dibuat manual). Aman dihapus.
- `public/*.svg` bawaan create-next-app (next, vercel, file, globe, window) — tak dipakai.
- `public/images/vehicles/coaster.png` — tidak direferensikan di pricing.ts (hanya bus-vip.jpg pun tidak dipakai; bus tak punya field image).
- Dependencies tak terpakai di package.json: `@supabase/*` (Fase 2 — biarkan), `next-themes`, `shadcn` (CLI, salah tempat di dependencies), `tw-animate-css` (redundan dengan `tailwindcss-animate`).
- Duplikasi Step4/Step5 SUDAH diselesaikan via `HotelStep.tsx` ✅.
- Warning build: Next mendeteksi lockfile lain di `C:\Users\Dynabook\package-lock.json` (di luar repo) — kosmetik; bisa disenyapkan dengan `outputFileTracingRoot`.

## 7. Build Health (2026-07-16, di `plan-my-umrah/plan-my-umrah/`)

| Perintah | Hasil |
|---|---|
| `npm install` | ✅ sukses (ada npm audit advisory minor, tidak memblokir) |
| `npx tsc --noEmit` | ✅ 0 error |
| `npm run build` | ✅ **SUKSES** — `/` 8.6 kB, `/planner` 64.6 kB, semua static prerender |
| `next lint` | ✅ 0 error, 0 warning |

Tidak ada lagi masalah CSS token: `@theme inline` lengkap, `bg-primary`/`bg-secondary` dkk. tergenerate, font Inter/Playfair tersambung ke `--font-sans`/`--font-heading`.

## 8. Keamanan

✅ **Tidak ada temuan.** Tidak ada `.env*`, API key, atau credential di working tree maupun seluruh git history (dicek `git log --all --diff-filter=A --name-only`). `.gitignore` meng-exclude `.env*`. Nomor WA & harga memang publik by design.

---

## 9. Rekomendasi

### KEEP — fondasi solid

- **Seluruh planner** (`/planner`): wizard 9 langkah, store, itinerary generator, Step9 (breakdown %, WA prefill, print). Ini produk inti dan sudah production-quality secara fungsi.
- **`src/config/pricing.ts`** sebagai single source of truth (briefing menyebut `lib/config.ts` — tidak perlu pindah, cukup catat bahwa file ini yang dimaksud).
- **Aset asli** di `public/images/` (hotel, kendaraan, logo, Ka'bah).
- **Build pipeline** — hijau total, siap deploy hari ini juga.

### FIX — sisa pekerjaan Fase 1 (urut prioritas)

| # | Item | Effort |
|---|---|---|
| 1 | **Keputusan Zack (bukan kode)**: (a) validasi harga pricing.ts vs briefing §4 — mana yang benar; (b) konfirmasi arah desain: redesign penuh ke "Warm Editorial" atau pertahankan tema ivory/emas/zamrud yang sudah jadi & konsisten | — |
| 2 | **Bangun `/` company profile PT Hajar Aswad Barokah** (hero, 5 pilar layanan, paket unggulan, testimoni, legalitas PPIU/Nusuk, kontak) dan pindahkan landing planner menjadi bagian `/plan` | **L** |
| 3 | **Rename `/planner` → `/plan`** + redirect permanen `/planner` → `/plan` | **S** |
| 4 | **Terapkan design system "Warm Editorial"** (jika dikonfirmasi di #1): token warna coklat/copper + ivory/near-black, font display condensed uppercase, kartu layanan foto gelap, dark/light toggle via CSS variables (next-themes sudah ter-install), floating WA button, scroll-to-top | **L** |
| 5 | Deploy Vercel: Root Directory = `plan-my-umrah`, atau angkat project ke repo root (lebih bersih, butuh persetujuan) | **S** |
| 6 | Ganti 6 testimoni placeholder di pricing.ts dengan testimoni asli (sudah ditandai di kode) | **S** |
| 7 | Bersih-bersih: hapus `ui/progress.tsx`, svg default, dependency `shadcn`/`tw-animate-css`; rapikan `next-themes` (pakai atau buang setelah #4) | **S** |
| 8 | QA mobile + print menyeluruh sebelum production | **M** |

### DEFER — Fase 2, jangan disentuh

- Supabase (harga dari DB), Prisma/skema, auth & admin dashboard, vendor management, quotation generator, harga hotel real-time/season, fitur AI planner.

---

## 10. Berapa Hari ke Production di Vercel?

**Estimasi realistis: 2–4 hari kerja** (1 developer, harga tetap di `pricing.ts`).

- **Skenario tercepat — 0.5–1 hari**: deploy apa adanya. Build sudah hijau, planner fungsional penuh dengan CTA WA. Tinggal set Root Directory di Vercel. Yang belum: company profile `/` dan desain Warm Editorial.
- **Skenario lengkap Fase 1 — 2–4 hari**:
  - Hari 1: keputusan #1 + deploy preview (#5) + rename `/plan` (#3).
  - Hari 2–3: company profile `/` (#2) + design system Warm Editorial (#4) — ini blok kerja terbesar.
  - Hari 4: testimoni asli (#6), bersih-bersih (#7), QA (#8), production + domain.

Tidak ada risiko teknis tersembunyi: tanpa backend, tanpa auth, build stabil. Risiko satu-satunya adalah **keputusan produk** (harga & arah desain) — selesaikan #1 dulu sebelum Sesi 2.
