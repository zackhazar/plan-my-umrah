import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Building, MapPin, Compass } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-secondary relative overflow-hidden">
      
      {/* Navbar Minimalis & Bersih */}
      <nav className="container mx-auto px-6 md:px-12 py-6 relative z-30 flex justify-between items-center">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-widest text-secondary flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span>PLAN MY UMRAH</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide text-secondary/80">
          <Link href="#" className="hover:text-primary transition-colors">Cara Kerja</Link>
          <Link href="#" className="hover:text-primary transition-colors">Akomodasi</Link>
          <Link href="#" className="hover:text-primary transition-colors">Tentang Kami</Link>
        </div>
        <Button variant="outline" className="border-secondary/20 text-secondary hover:bg-secondary/5 rounded-full px-8 hidden md:flex font-medium">
          Login Admin
        </Button>
      </nav>

      {/* Hero Section (Clean & Spacious) */}
      <main className="container mx-auto px-6 md:px-12 pt-16 pb-24 relative z-20 flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        
        {/* Konten Kiri (Teks) */}
        <div className="flex-1 lg:max-w-xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-8">
            Pengalaman Umrah Kustomisasi Penuh
          </div>

          <h1 className="text-4xl md:text-6xl font-heading font-medium text-secondary leading-[1.1] mb-6">
            Rancang Ibadah Anda dengan <span className="italic text-primary font-normal">Sempurna.</span>
          </h1>

          <p className="text-lg text-secondary/60 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Tinggalkan batasan paket travel konvensional. Kini Anda bebas memilih hotel, transportasi, dan layanan ekstra sesuai standar kenyamanan keluarga Anda.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link href="/planner">
              <Button size="lg" className="bg-secondary text-white hover:bg-secondary/90 px-8 h-14 rounded-full text-base font-medium transition-transform hover:-translate-y-1 w-full sm:w-auto shadow-lg shadow-secondary/20">
                Mulai Rencanakan <ArrowRight className="ml-3 w-4 h-4" />
              </Button>
            </Link>
            <Link href="#">
              <Button variant="ghost" size="lg" className="text-secondary hover:bg-secondary/5 px-8 h-14 rounded-full text-base font-medium w-full sm:w-auto">
                Lihat Panduan Video
              </Button>
            </Link>
          </div>
        </div>

        {/* Konten Kanan (Visual Placeholder / Tipografi) */}
        <div className="flex-1 w-full relative lg:h-[600px] flex items-center justify-center">
           {/* Elemen Dekoratif pengganti gambar jika belum ada gambar asli */}
           <div className="relative w-full max-w-md aspect-[4/5] bg-secondary rounded-[2rem] overflow-hidden shadow-2xl flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
              <div className="relative z-10 text-center text-white">
                <Compass className="w-16 h-16 text-primary mx-auto mb-6 opacity-80" />
                <h3 className="font-heading text-3xl font-light italic mb-4 text-white/90">&ldquo;Perjalanan Suci, <br/> Dirancang Oleh Anda.&rdquo;</h3>
                <div className="w-12 h-[1px] bg-primary/50 mx-auto mt-8"></div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl glass-panel text-left">
                 <div className="flex items-center gap-3 mb-2">
                    <Building className="w-5 h-5 text-primary" />
                    <span className="font-bold text-secondary text-sm">Pilihan Hotel VIP</span>
                 </div>
                 <p className="text-xs text-secondary/50 max-w-[180px]">Akses langsung ke hotel bintang 5 terbaik di Makkah & Madinah.</p>
              </div>
           </div>
        </div>
      </main>

      {/* Bagian Bawah Sederhana (Trust Indicators) */}
      <section className="border-t border-border bg-white py-12 relative z-10">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 opacity-70">
           <div className="text-sm font-medium text-secondary/60 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Berkantor di Jakarta & Jeddah
           </div>
           <div className="flex gap-8 text-sm font-medium text-secondary/60">
              <span>Transparan</span>
              <span>•</span>
              <span>Eksklusif</span>
              <span>•</span>
              <span>Terpercaya</span>
           </div>
        </div>
      </section>

    </div>
  );
}