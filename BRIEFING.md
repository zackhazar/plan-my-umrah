# BRIEFING CLAUDE CODE — Plan My Umrah & Website PT Hajar Aswad Barokah
> Rangkuman lengkap diskusi Zack Hajar × Claude (chat claude.ai, Juli 2026)
> Cara pakai: buka Claude Code di folder repo `plan-my-umrah`, lalu paste PROMPT SESI 1 di bagian bawah dokumen ini. Simpan file ini di root repo dengan nama `BRIEFING.md` supaya Claude Code bisa membacanya kapan saja.

---

## 1. SIAPA & APA

- **Owner:** Zack Hajar — pembimbing Haji & Umroh bersertifikat BNSP, content creator edukasi umroh (220K+ pengikut organik), pemilik PT Hajar Aswad Barokah (PPIU: visa, tiket, hotel, transport, vaksin, perlengkapan).
- **Repo:** `github.com/zackhazar/plan-my-umrah` (public). Stack: Next.js App Router + TypeScript + Tailwind + Supabase + Prisma. Target deploy: Vercel. Status ±60–70%, dibangun bertahap lewat beberapa AI → kemungkinan ada inkonsistensi, kode mati, data hardcoded. Kemungkinan ada folder nested `plan-my-umrah/plan-my-umrah/` — cek root project sebenarnya.

## 2. KEPUTUSAN STRATEGIS (SUDAH DISEPAKATI)

1. **Arsitektur situs:** SATU project Next.js dengan dua wajah:
   - `/` = **Website utama PT Hajar Aswad Barokah** — company profile: hero, 5 pilar layanan, paket unggulan, testimoni, legalitas PPIU, kontak.
   - `/plan` = **Plan My Umrah** — planner publik: kalkulator biaya umroh mandiri + itinerary otomatis + CTA WhatsApp. TANPA login.
2. **Fase 1 (SEKARANG):** landing utama + planner publik live di Vercel. Data harga hardcoded di SATU file config (`lib/config.ts`). Tidak perlu database untuk kalkulasi.
3. **Fase 2 (NANTI — JANGAN DIKERJAKAN SEKARANG):** auth, admin dashboard, vendor management, quotation generator, harga dari Supabase, fitur AI planner.
4. **Fungsi bisnis planner:** lead magnet. Setiap hasil kalkulasi → tombol WhatsApp dengan pesan otomatis berisi ringkasan estimasi → warm lead untuk PT HAB. Upsell natural: checklist perlengkapan (ihram, koper, vaksin, SIM card) + visa/SISKOPATUH wajib via PPIU.

## 3. DESIGN SYSTEM — "WARM EDITORIAL" (referensi: haramainservices.co.id)

Zack sudah konfirmasi suka gaya haramainservices.co.id. Ekstraksi gayanya:

**Warna**
- Latar hero & section terang: warm off-white / ivory `#F5F1EA`–`#FAF7F1`
- Section gelap (kartu layanan): near-black hangat `#0E0D0B`–`#141210`
- Aksen: coklat hangat `#8A5A33` (kata kunci headline, tombol pill) & copper muda `#C89B6D` (ikon, judul section di dark mode)
- Teks utama: hitam pekat di light, putih di dark

**Typography**
- Headline: sans-serif TEBAL, UPPERCASE, condensed (mis. Archivo Black / Anton / Space Grotesk bold), ukuran sangat besar
- Pola khas: satu-dua kata di headline diberi warna coklat — "SATU PLATFORM, SEJUTA **KEMUDAHAN** MENUJU BAITULLAH"
- Body: sans humanis regular (mis. DM Sans / Plus Jakarta Sans), line-height lega
- Logo: uppercase dengan letter-spacing sangat lebar

**Komponen khas**
- Hero full-screen: FOTO/VIDEO full-bleed dengan overlay putih pudar (light) — konten tetap terbaca
- Tombol utama: pill coklat solid, teks putih, ikon panah →
- Kartu layanan (section gelap): SELURUH kartu adalah foto besar rounded-2xl, chip ikon kecil di kiri-atas, judul + deskripsi menimpa foto di bagian bawah dengan gradient gelap
- Floating WhatsApp button hijau, kanan-bawah, selalu terlihat
- Dark/light mode toggle di navbar — LAYOUT IDENTIK di kedua mode, hanya token warna yang berganti:
  - Light: background ivory + foto/video dengan overlay putih pudar, teks hitam
  - Dark: background near-black + foto/video yang sama dengan overlay gelap (opacity ±60–70%), teks putih, kata aksen headline tetap coklat/copper
  - Implementasi: CSS variables / Tailwind dark: variant, JANGAN duplikasi komponen per tema
- Scroll-to-top button

**Media (Zack yang siapkan)**
- 5–10 foto kuat: Masjidil Haram, Nabawi, jamaah PT HAB, transport, dokumentasi Zack sendiri (dia content creator — pakai aset sendiri, lebih otentik dari stock)
- 1 video hero: loop 10–20 detik, tanpa audio, MP4/WebM terkompresi ≤5MB, `autoplay muted loop playsinline`, dengan poster image fallback
- Sementara aset belum ada: pakai placeholder Unsplash bertema Makkah/Madinah, tandai `// TODO: ganti foto asli`

**Copy yang sudah disetujui (boleh dipoles, jangan diganti total)**
- Headline planner: "Rencanakan Umroh Mandirimu, Setransparan Itu."
- Trust stats: 220K+ Pengikut Edukasi Umroh · BNSP Pembimbing Bersertifikat · 100% Transparan Tanpa Markup
- 5 pilar: Visa & SISKOPATUH / Hotel Makkah & Madinah / Transportasi & Haramain / Muthawwif Bersertifikat / Perlengkapan Umroh
- JANGAN menjiplak kalimat haramainservices.co.id — struktur boleh, copy harus original.

## 4. LOGIKA KALKULATOR (SUDAH DIVALIDASI DI SPREADSHEET)

Semua harga default di `lib/config.ts` — mudah diedit satu tempat:

- Hotel Makkah per malam **per room** (bukan per pax!): Hemat 1.8jt / Nyaman 4jt / Premium (Ring 1) 7.1jt
- Hotel Madinah per malam per room: Hemat 1.2jt / Nyaman 2.5jt / Premium (Markaziyah) 4jt
- Tiket PP per pax: Low 11jt / Reguler 13.5jt / Ramadhan-High 18jt
- Visa + SISKOPATUH: 2.75jt per pax
- Transport: komponen per group (transfer bandara + antar kota ±4.94jt) + komponen per pax (±950rb)
- Uang saku per hari per pax: Hemat 200rb / Standar 300rb / Longgar 500rb
- Perlengkapan opsional per pax: Ihram/Mukena 350rb / Koper set 850rb / Vaksin+ICV 400rb / SIM card 170rb
- Rumus: hotel = harga × malam × room; item per-pax dikali pax; total ÷ pax = estimasi per jamaah
- Output WhatsApp: pesan prefill berisi pax, malam Makkah/Madinah, total, per pax
- ⚠️ Kesalahan yang pernah terjadi & JANGAN diulang: (a) label "per pax" pada harga per-room, (b) qty pax di-hardcode, (c) jam landing tanpa selisih waktu Saudi (WIB − 4 jam)

## 5. ATURAN KONTEN RELIGI (WAJIB)

- Setiap hadits/ayat yang ditampilkan: teks Arab + terjemah Indonesia + sumber lengkap.
- Konten sesuai manhaj: hindari anjuran berbasis hadits lemah (contoh: Shalat Arbain 40 waktu — jangan dijadikan fitur/klaim; cukup "perbanyak shalat berjamaah di Nabawi").
- Tidak memakai gelar "Sayyidina"; gunakan "radhiyallahu 'anhu/'anhuma".

## 6. REFERENSI KODE YANG SUDAH ADA

- Di chat sebelumnya sudah dibuat prototype React satu-file: `plan-my-umrah-premium.jsx` (kalkulator lengkap + landing). **Logika kalkulasinya benar — port logikanya.** Desainnya versi lama (dark luxury) — JANGAN ikuti desainnya; ikuti design system "Warm Editorial" di atas.
- Nomor WhatsApp di semua CTA masih placeholder `6281234567890` → tanyakan nomor asli ke Zack sebelum deploy.

## 7. GAYA KERJA ZACK (PENTING UNTUK CLAUDE CODE)

- Bahasa Indonesia, santai, langsung ke poin, tanpa bahasa korporat.
- Selalu beri blok kode full copy-paste replacement, bukan instruksi edit parsial.
- Zack punya kecenderungan pivot ke ide infrastruktur baru saat eksekusi hampir selesai — kalau di tengah sesi dia minta fitur baru di luar Fase 1, ingatkan dengan sopan dan tetap selesaikan Fase 1 dulu.

---

---

# PROMPT SESI 1 — AUDIT (paste ini dulu, JANGAN ubah kode)

Baca file BRIEFING.md di root repo ini sampai selesai — itu konteks lengkap project. Kamu senior engineer yang baru bergabung. Sesi ini HANYA audit dan dokumentasi. Dilarang mengubah, menghapus, atau menambah kode.

Tugas:
1. Indeks seluruh repository (struktur folder, package.json, konfigurasi Next/Prisma/Supabase, semua route di app/, komponen, schema.prisma). Cek apakah root project ada di folder nested.
2. Buat ARCHITECTURE.md di root berisi: pohon folder beranotasi; tabel route + status (jadi/setengah/kosong); model Prisma + mana yang dipakai vs hanya didefinisikan; titik integrasi Supabase (tersambung vs mock); daftar semua data hardcoded + lokasi file; daftar kode mati/duplikat.
3. Jalankan npm install, npx tsc --noEmit, npm run build. Catat semua error di section "Build Health" — jangan perbaiki.
4. Section "Rekomendasi" berisi tiga daftar: KEEP (fondasi solid), FIX (urut prioritas + effort S/M/L — hanya yang dibutuhkan agar `/` landing PT HAB + `/plan` planner publik bisa live), DEFER (auth/admin/vendor → Fase 2, jangan disentuh).
5. Jawab eksplisit: berapa hari kerja realistis sampai production di Vercel dengan harga hardcoded di lib/config.ts?
6. Kalau ada .env atau credential ter-commit (cek juga git history): laporkan sebagai SECURITY PRIORITAS 1 tanpa menampilkan isinya.

Laporan bahasa Indonesia, ringkas. Setelah selesai, berhenti — tunggu review sebelum sesi berikutnya.

---

# PROMPT SESI 2 — EKSEKUSI (paste SETELAH ARCHITECTURE.md direview Zack)

Baca BRIEFING.md dan ARCHITECTURE.md. Kerjakan HANYA daftar FIX Fase 1, satu per satu urut prioritas. Ikuti design system "Warm Editorial" di BRIEFING.md section 3 untuk semua UI, dan logika kalkulator di section 4. Buat lib/config.ts sebagai satu-satunya sumber harga. Setiap selesai satu item: npm run build harus hijau, lalu commit dengan pesan jelas. Jangan sentuh daftar DEFER. Target akhir: `/` landing PT Hajar Aswad Barokah + `/plan` kalkulator berfungsi penuh di localhost, siap deploy Vercel.
