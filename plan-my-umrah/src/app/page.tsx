import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Bus,
  Compass,
  Globe,
  MapPin,
  MessageCircle,
  Package,
  Quote,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react';
import { WHATSAPP_NUMBER, COMPANY_NAME, TESTIMONIALS, INSTAGRAM_HANDLE } from '@/config/pricing';
import { LogoFull, LogoMark } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';

const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  `Assalamu’alaikum, saya ingin bertanya tentang layanan Umrah ${COMPANY_NAME}.`
)}`;

// Trust stats — copy sudah disetujui, jangan diganti total
const trustStats = [
  { value: '220K+', label: 'Pengikut Edukasi Umroh' },
  { value: 'BNSP', label: 'Pembimbing Bersertifikat' },
  { value: '100%', label: 'Transparan Tanpa Markup' },
];

// 5 pilar layanan — kartu foto besar di section gelap
// TODO: ganti foto asli dokumentasi PT HAB (jamaah, muthawwif, perlengkapan)
const pillars = [
  {
    icon: Globe,
    title: 'Visa & Siskopatuh',
    desc: 'Visa Umrah jalur normal include asuransi, plus pendaftaran resmi Siskopatuh Kemenag RI. Dokumen diurus sampai tuntas.',
    image: '/images/kabbah/kabbah-1.jpg',
  },
  {
    icon: Building2,
    title: 'Hotel Makkah & Madinah',
    desc: 'Bintang 4–5 dekat Masjidil Haram & Masjid Nabawi, terdaftar di Nusuk — dari Ring 1 sampai pilihan hemat.',
    image: '/images/hotels/fairmont-makkah.jpg',
  },
  {
    icon: Bus,
    title: 'Transportasi & Haramain',
    desc: 'Mobil privat (Camry, Staria, GMC, Hiace), Kereta Cepat Haramain, hingga bus full trip — driver berpengalaman rute Saudi.',
    image: '/images/vehicles/gmc.avif',
  },
  {
    icon: Compass,
    title: 'Muthawwif Bersertifikat',
    desc: 'Pemandu ibadah mendampingi dari umrah pertama hingga ziyarah, dengan bimbingan manasik yang sesuai tuntunan.',
    image: '/images/hotels/dar-attauhid.jpg',
  },
  {
    icon: Package,
    title: 'Perlengkapan Umroh',
    desc: 'Kain ihram, mukena, koper set, vaksin meningitis, hingga SIM card Saudi — semua siap sebelum berangkat.',
    image: '/images/hotels/marwa-rotana.jpg',
  },
];

export default function CompanyProfilePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/25">

      {/* ===== Navbar ===== */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 md:px-12 h-18 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <LogoMark className="w-10 h-10" />
            <div className="leading-tight">
              <div className="font-heading text-base md:text-lg tracking-[0.22em] text-foreground">HAJAR ASWAD BAROKAH</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground hidden sm:block">Amanah · Nyaman · Profesional</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <a href="#layanan" className="hidden lg:block text-sm text-foreground/60 hover:text-primary px-3 transition-colors">Layanan</a>
            <a href="#testimoni" className="hidden lg:block text-sm text-foreground/60 hover:text-primary px-3 transition-colors">Testimoni</a>
            <a href="#kontak" className="hidden lg:block text-sm text-foreground/60 hover:text-primary px-3 mr-1 transition-colors">Kontak</a>
            <ThemeToggle />
            <Link href="/plan">
              <Button className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-full px-6 h-10 font-semibold">
                Plan My Umrah <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== Hero full-bleed ===== */}
      <header className="relative overflow-hidden min-h-[88vh] flex items-center">
        {/* TODO: ganti dengan video hero loop 10–20 dtk (autoplay muted loop playsinline) + poster */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/kabbah/kabbah-1.jpg"
            alt="Ka'bah, Masjidil Haram"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Overlay putih pudar di light, gelap di dark — layout identik */}
          <div className="absolute inset-0 bg-background/78 dark:bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>

        <div className="container mx-auto px-6 md:px-12 py-24 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-[11px] font-semibold uppercase tracking-[0.22em] mb-8">
              <BadgeCheck className="w-3.5 h-3.5" />
              Travel Resmi · Terdaftar di Nusuk
            </div>

            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[0.98] text-foreground mb-8">
              Jalan Tenang<br />
              Menuju <span className="text-primary">Baitullah</span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/65 mb-10 leading-relaxed max-w-xl">
              {COMPANY_NAME} mengurus visa, hotel, transportasi, muthawwif, dan perlengkapan —
              Anda cukup fokus pada ibadah. Berangkat mandiri, didampingi yang berpengalaman.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14">
              <Link href="/plan">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-hover px-9 h-14 rounded-full text-base font-semibold transition-transform hover:-translate-y-0.5 shadow-xl shadow-primary/25">
                  Hitung Biaya Umrah Saya <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="border-foreground/20 text-foreground hover:bg-foreground/5 px-8 h-14 rounded-full text-base font-medium bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2 text-[#25D366]" /> Konsultasi Gratis
                </Button>
              </a>
            </div>

            {/* Trust stats */}
            <div className="grid grid-cols-3 max-w-xl gap-4 border-t border-border pt-8">
              {trustStats.map((s) => (
                <div key={s.label}>
                  <div className="font-heading text-2xl md:text-3xl text-primary">{s.value}</div>
                  <div className="text-[11px] md:text-xs text-foreground/55 mt-1 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ===== 5 Pilar Layanan — section gelap (gelap di kedua mode) ===== */}
      <section id="layanan" className="bg-[#12100D] text-[#F5F1EA] py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-[#C89B6D] font-semibold mb-4">Lima Pilar Layanan</div>
              <h2 className="font-heading text-4xl md:text-6xl leading-[1.02] max-w-2xl">
                Semua Kebutuhan, <span className="text-[#C89B6D]">Satu Pintu</span>
              </h2>
            </div>
            <p className="text-[#F5F1EA]/55 max-w-sm text-sm leading-relaxed">
              Ambil satu layanan saja atau serahkan semuanya — setiap komponen berdiri sendiri, tanpa paket paksaan.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="group relative rounded-2xl overflow-hidden min-h-[320px]"
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                  <div className="absolute top-5 left-5 w-11 h-11 rounded-xl bg-[#F5F1EA]/12 backdrop-blur-md border border-[#F5F1EA]/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#C89B6D]" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <h3 className="font-heading text-xl text-[#F5F1EA] mb-2">{p.title}</h3>
                    <p className="text-[13px] text-[#F5F1EA]/70 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              );
            })}

            {/* Kartu CTA penutup grid */}
            <Link
              href="/plan"
              className="group relative rounded-2xl min-h-[320px] bg-[#8A5A33] p-6 flex flex-col justify-between transition-colors hover:bg-[#734A28]"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F5F1EA]/15 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#F5F1EA]" />
              </div>
              <div>
                <h3 className="font-heading text-2xl text-[#F5F1EA] mb-3 leading-tight">Susun Sendiri Rencana Anda</h3>
                <p className="text-[13px] text-[#F5F1EA]/75 leading-relaxed mb-5">
                  Kalkulator biaya umrah mandiri — pilih hotel, transport, visa, lihat estimasinya per item.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5F1EA]">
                  Buka Plan My Umrah <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Planner CTA band ===== */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold mb-5">Plan My Umrah</div>
          <h2 className="font-heading text-4xl md:text-6xl leading-[1.02] text-foreground max-w-3xl mx-auto mb-6">
            Rencanakan Umroh Mandirimu, <span className="text-primary">Setransparan Itu.</span>
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto mb-10 leading-relaxed">
            Tentukan jumlah jemaah, tanggal, hotel, transportasi, dan visa dalam 9 langkah.
            Estimasi lengkap + itinerary harian otomatis, langsung bisa dikonsultasikan via WhatsApp. Gratis, tanpa daftar akun.
          </p>
          <Link href="/plan">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-hover px-10 h-14 rounded-full text-base font-semibold transition-transform hover:-translate-y-0.5 shadow-xl shadow-primary/25">
              Mulai Sekarang — Gratis <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ===== Testimoni ===== */}
      <section id="testimoni" className="border-t border-border bg-card py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold mb-4">Testimoni Jemaah</div>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground">
              Ratusan Jemaah <span className="text-primary">Sudah Membuktikan</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-3xl border border-border bg-background p-7 flex flex-col transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <Quote className="w-6 h-6 text-primary/40 mb-4" />
                <p className="text-sm text-foreground/70 leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 pt-5 border-t border-border flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
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

      {/* ===== Legalitas & Kontak ===== */}
      <section id="kontak" className="py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold mb-4">Legalitas & Amanah</div>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-6 leading-[1.05]">
              Berangkat dengan <span className="text-primary">Tenang</span>
            </h2>
            <ul className="space-y-4">
              {[
                'Terdaftar resmi di Nusuk (platform resmi Kerajaan Arab Saudi)',
                'Pembimbing Haji & Umroh bersertifikat BNSP',
                'Pendaftaran Siskopatuh Kemenag RI untuk setiap jemaah',
                'Visa Umrah include asuransi kesehatan selama di Arab Saudi',
                'Harga transparan per item — tanpa markup tersembunyi',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-foreground/70 leading-relaxed">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] bg-[#12100D] text-[#F5F1EA] p-8 md:p-12">
            <h3 className="font-heading text-2xl md:text-3xl mb-3">Konsultasi <span className="text-[#C89B6D]">Gratis</span></h3>
            <p className="text-sm text-[#F5F1EA]/60 leading-relaxed mb-8">
              Ceritakan rencana keberangkatan Anda — tim kami balas dalam hitungan jam, tanpa kewajiban apa pun.
            </p>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="block mb-4">
              <Button size="lg" className="w-full bg-[#25D366] text-black hover:bg-[#20bd5a] h-13 rounded-full text-base font-semibold">
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp 0821-3988-1976
              </Button>
            </a>
            <Link href="/plan" className="block">
              <Button variant="outline" size="lg" className="w-full border-[#F5F1EA]/25 text-[#F5F1EA] hover:bg-[#F5F1EA]/10 h-13 rounded-full text-base font-medium bg-transparent">
                Atau hitung dulu estimasinya <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <div className="mt-8 pt-6 border-t border-[#F5F1EA]/10 text-sm text-[#F5F1EA]/55 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C89B6D]" /> Berkantor di Jakarta &amp; Jeddah
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <LogoFull markClass="w-12 h-12" />
            <div className="text-sm text-foreground/50 mt-3">{COMPANY_NAME} &mdash; Terdaftar di Nusuk &middot; Amanah, Nyaman, Profesional</div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <Link href="/plan" className="text-sm font-medium text-primary hover:underline">Plan My Umrah — Kalkulator Biaya Umrah Mandiri</Link>
            <div className="text-xs text-foreground/40">
              &copy; {new Date().getFullYear()} {COMPANY_NAME}. Transparan &middot; Eksklusif &middot; Terpercaya
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
