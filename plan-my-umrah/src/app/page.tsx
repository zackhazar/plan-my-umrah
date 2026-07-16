import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Sparkles,
  Building2,
  MapPin,
  BadgeCheck,
  CalendarDays,
  Bus,
  Globe,
  Wallet,
  MessageCircle,
  Users,
  ReceiptText,
  ShieldCheck,
} from 'lucide-react';
import { Quote, Star } from 'lucide-react';
import { WHATSAPP_NUMBER, COMPANY_NAME, TESTIMONIALS, INSTAGRAM_HANDLE } from '@/config/pricing';
import { LogoFull, LogoMark } from '@/components/Logo';

const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Assalamu’alaikum, saya ingin bertanya tentang Umrah mandiri via Plan My Umrah.'
)}`;

const steps = [
  {
    icon: Users,
    title: 'Susun Rencana',
    desc: 'Tentukan jumlah jemaah, tanggal, hotel di Makkah & Madinah, transportasi, hingga visa — semua dalam 9 langkah sederhana.',
  },
  {
    icon: ReceiptText,
    title: 'Lihat Estimasi Transparan',
    desc: 'Setiap komponen biaya dihitung terbuka per item. Tidak ada biaya tersembunyi, tidak ada paket paksaan.',
  },
  {
    icon: MessageCircle,
    title: 'Konsultasi via WhatsApp',
    desc: 'Kirim hasil estimasi Anda langsung ke tim kami dan dapatkan penawaran resmi dalam hitungan jam.',
  },
];

const controls = [
  { icon: Building2, title: 'Hotel Pilihan Anda', desc: 'Bintang 4–5 dekat Masjidil Haram & Masjid Nabawi, atau masukkan harga hotel Anda sendiri.' },
  { icon: Bus, title: 'Transportasi Fleksibel', desc: 'Mobil privat (Camry, Staria, GMC, Hiace), Kereta Cepat Haramain, hingga bus full trip.' },
  { icon: Globe, title: 'Visa & Siskopatuh', desc: 'Visa Umrah jalur normal include asuransi, plus pendaftaran resmi Siskopatuh Kemenag RI.' },
  { icon: CalendarDays, title: 'Tanggal Bebas', desc: 'Berangkat kapan pun Anda siap — bukan mengikuti jadwal rombongan travel.' },
  { icon: Wallet, title: 'Anggaran Terkendali', desc: 'Grand total terlihat sejak awal dan berubah real-time mengikuti pilihan Anda.' },
  { icon: ShieldCheck, title: 'Didampingi Travel Resmi', desc: `Direncanakan mandiri, dieksekusi bersama ${COMPANY_NAME}.` },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-secondary">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 md:px-12 h-18 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <LogoMark className="w-10 h-10" />
            <div className="leading-tight">
              <div className="font-heading text-lg font-bold tracking-[0.18em] text-secondary">PLAN MY UMRAH</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground hidden sm:block">by Hajar Aswad Barokah</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="hidden md:block">
              <Button variant="ghost" className="rounded-full px-5 h-10 text-secondary/80 hover:text-secondary">
                <MessageCircle className="w-4 h-4 mr-1.5" /> Hubungi Kami
              </Button>
            </a>
            <Link href="/plan">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-6 h-10 font-medium shadow-md shadow-secondary/15">
                Mulai Rencanakan
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative overflow-hidden">
        {/* Latar foto Ka'bah dengan overlay krem agar teks tetap terbaca */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/kabbah/kabbah-1.jpg"
            alt="Ka'bah, Masjidil Haram"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/25" />
        </div>

        <div className="pointer-events-none absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute top-40 -left-40 w-[420px] h-[420px] rounded-full bg-secondary/10 blur-[120px]" />

        <div className="container mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          {/* Kiri */}
          <div className="flex-1 lg:max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-[11px] font-semibold uppercase tracking-[0.22em] mb-8">
              <BadgeCheck className="w-3.5 h-3.5" />
              Kalkulator Biaya Umrah Mandiri
            </div>

            <h1 className="font-heading text-[2.6rem] leading-[1.12] md:text-6xl md:leading-[1.08] font-medium text-secondary mb-6">
              Rancang Ibadah Anda dengan{' '}
              <span className="italic text-primary">Sempurna.</span>
            </h1>

            <p className="text-lg text-foreground/60 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Tinggalkan batasan paket travel konvensional. Pilih sendiri hotel, transportasi, visa, dan layanan ekstra —
              lalu lihat estimasi biayanya secara transparan, per item.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Link href="/plan" className="w-full sm:w-auto">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-9 h-14 rounded-full text-base font-medium transition-transform hover:-translate-y-0.5 w-full shadow-xl shadow-secondary/20">
                  Hitung Estimasi Saya <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="border-secondary/20 text-secondary hover:bg-secondary/5 px-8 h-14 rounded-full text-base font-medium w-full bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2 text-primary" /> Tanya Dulu
                </Button>
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 text-sm text-foreground/50">
              <div className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-primary" /> Tanpa daftar akun</div>
              <div className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-primary" /> Gratis 100%</div>
              <div className="hidden sm:flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-primary" /> Hasil instan</div>
            </div>
          </div>

          {/* Kanan: mock kartu estimasi */}
          <div className="flex-1 w-full flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-primary/15 via-transparent to-secondary/15 blur-2xl" />

              <div className="relative bg-secondary text-secondary-foreground rounded-[2rem] p-8 shadow-2xl shadow-secondary/30 overflow-hidden">
                <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary/15 blur-3xl" />
                <div className="flex items-center justify-between mb-8">
                  <div className="text-[11px] uppercase tracking-[0.25em] text-secondary-foreground/60">Estimasi Anda</div>
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>

                <div className="space-y-4 text-sm">
                  {[
                    { label: 'Hotel Makkah · 4 malam', value: 'Rp 10.000.000' },
                    { label: 'Hotel Madinah · 3 malam', value: 'Rp 6.900.000' },
                    { label: 'Kereta Cepat Haramain · 2 pax', value: 'Rp 7.000.000' },
                    { label: 'Visa Umrah + Siskopatuh · 2 pax', value: 'Rp 7.000.000' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center gap-3 border-b border-white/8 pb-3.5">
                      <span className="text-secondary-foreground/65 text-[13px] sm:text-sm">{row.label}</span>
                      <span className="font-mono text-secondary-foreground/90 whitespace-nowrap text-[13px] sm:text-sm">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-1.5">Grand Total</div>
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-primary whitespace-nowrap">Rp 30.900.000</div>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30">
                    <MessageCircle className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-7 -left-4 sm:-left-8 glass-panel rounded-2xl px-5 py-4">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold text-secondary text-sm">Hotel Bintang 5</div>
                    <div className="text-xs text-foreground/50">50 m ke Masjidil Haram</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Cara Kerja */}
      <section className="border-t border-border bg-card py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold mb-4">Cara Kerja</div>
            <h2 className="font-heading text-3xl md:text-4xl text-secondary font-medium">
              Tiga Langkah Menuju Tanah Suci
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="relative rounded-3xl border border-border bg-background p-8 transition-shadow hover:shadow-lg hover:shadow-secondary/5">
                  <div className="absolute top-8 right-8 font-heading text-5xl text-secondary/8 font-bold select-none">0{i + 1}</div>
                  <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-6">
                    <Icon className="w-5.5 h-5.5 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl text-secondary font-semibold mb-3">{s.title}</h3>
                  <p className="text-sm text-foreground/55 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Yang Anda Kendalikan */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold mb-4">Kendali Penuh</div>
              <h2 className="font-heading text-3xl md:text-4xl text-secondary font-medium max-w-lg">
                Semua Keputusan di Tangan Anda
              </h2>
            </div>
            <p className="text-foreground/55 max-w-sm text-sm leading-relaxed">
              Setiap keluarga punya kebutuhan berbeda. Karena itu setiap komponen perjalanan bisa Anda tentukan sendiri.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {controls.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="group rounded-3xl border border-border bg-card p-7 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                  <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center mb-5 transition-colors group-hover:bg-primary/15">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-secondary mb-2">{c.title}</h3>
                  <p className="text-sm text-foreground/55 leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="border-t border-border bg-card py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold mb-4">Testimoni Jemaah</div>
            <h2 className="font-heading text-3xl md:text-4xl text-secondary font-medium">
              Ratusan Jemaah Sudah Membuktikan
            </h2>
            <p className="text-sm text-foreground/55 mt-4 leading-relaxed">
              Dari transportasi, tiket, visa, hingga pendampingan — inilah kata mereka yang sudah berangkat bersama {COMPANY_NAME}.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-3xl border border-border bg-background p-7 flex flex-col transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <Quote className="w-6 h-6 text-primary/40 mb-4" />
                <p className="text-sm text-foreground/70 leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 pt-5 border-t border-border flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-secondary">{t.name}</div>
                    <div className="text-xs text-foreground/45">{t.origin} &middot; {t.service}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={`https://instagram.com/${INSTAGRAM_HANDLE.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline font-medium"
            >
              Lihat ratusan testimoni lainnya di Instagram {INSTAGRAM_HANDLE} &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="container mx-auto px-6 md:px-12 pb-20 md:pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-secondary text-secondary-foreground px-8 py-16 md:px-16 md:py-20 text-center">
          <div className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-primary/15 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[100px]" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl md:text-5xl font-medium mb-5 leading-tight">
              Berapa Biaya Umrah <span className="italic text-primary">Versi Anda?</span>
            </h2>
            <p className="text-secondary-foreground/65 mb-10 leading-relaxed">
              Luangkan 3 menit, dapatkan estimasi lengkap yang bisa langsung Anda konsultasikan dengan tim kami.
            </p>
            <Link href="/plan">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-hover px-10 h-14 rounded-full text-base font-semibold transition-transform hover:-translate-y-0.5 shadow-xl shadow-primary/25">
                Mulai Sekarang — Gratis <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <LogoFull markClass="w-12 h-12" />
            <div className="text-sm text-foreground/50 mt-3">{COMPANY_NAME} &mdash; Terdaftar di Nusuk &middot; Amanah, Nyaman, Profesional</div>
            <div className="text-sm text-foreground/50 flex items-center justify-center md:justify-start gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5" /> Berkantor di Jakarta &amp; Jeddah
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors">
              <MessageCircle className="w-4 h-4 text-[#25D366]" /> 0821-3988-1976
            </a>
            <div className="text-xs text-foreground/40">
              &copy; {new Date().getFullYear()} {COMPANY_NAME}. Transparan &middot; Eksklusif &middot; Terpercaya
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
