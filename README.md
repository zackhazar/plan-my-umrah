# plan-my-umrah

AI-powered Umrah planning platform that helps Muslims estimate travel costs, compare options, and plan Umrah smarter. Built by Zack Hajar &amp; PT Hajar Aswad Barokah.

## Struktur Repo

Aplikasi Next.js sebenarnya berada di subfolder [`plan-my-umrah/`](./plan-my-umrah) (nested), bukan di root repo ini.

## Menjalankan Lokal

```bash
cd plan-my-umrah
npm install
npm run dev   # buka http://localhost:3000
```

## Deploy ke Vercel

Karena project berada di subfolder, **wajib** set Root Directory saat import project:

1. Vercel Dashboard → Import repo ini
2. **Settings → General → Root Directory** → isi dengan `plan-my-umrah`
3. Framework preset: Next.js (terdeteksi otomatis setelah root directory benar)
4. Build command & output: biarkan default (`next build`)
5. Tidak ada environment variable yang dibutuhkan untuk Fase 1 (semua harga di `src/config/pricing.ts`)

## Update Harga (Fase 1)

Semua harga (hotel, transport, visa, layanan ekstra) dan nomor WhatsApp CS ada di satu file:
`plan-my-umrah/src/config/pricing.ts` — edit file itu, commit, Vercel auto-redeploy.
