// Logo Hajar Aswad Barokah — memakai file logo resmi di /public/images/logo.
// Varian: 'gold' (default, untuk latar terang) & 'white' (untuk latar gelap).

type Variant = 'gold' | 'white';

export function LogoMark({ className = 'w-9 h-9', variant = 'gold' }: { className?: string; variant?: Variant }) {
  const src = variant === 'white' ? '/images/logo/icon-white.svg' : '/images/logo/icon-gold.svg';
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="Hajar Aswad Barokah" className={`${className} object-contain`} />
  );
}

export function LogoFull({
  markClass = 'w-10 h-10',
  variant = 'gold',
}: {
  markClass?: string;
  variant?: Variant;
}) {
  const src = variant === 'white' ? '/images/logo/horizontal-white.svg' : '/images/logo/horizontal-gold-black.svg';
  // markClass menentukan tinggi ikon; lebar mengikuti rasio logo horizontal.
  const height = markClass.match(/h-\d+/)?.[0] ?? 'h-10';
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="Hajar Aswad Barokah" className={`${height} w-auto object-contain`} />
  );
}
