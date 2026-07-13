// Logo Hajar Aswad Barokah — rekreasi SVG dari logo resmi
// (cincin bulan sabit + bingkai oktagonal + batu oval).
// Jika ingin memakai file logo asli, taruh di /public/logo.png lalu
// ganti komponen ini dengan <Image src="/logo.png" ... />.

export function LogoMark({ className = 'w-9 h-9', color = '#B9924F' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      {/* Cincin luar terbuka (bulan sabit) */}
      <path
        d="M 50 6 A 42 42 0 1 0 88 30"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bingkai oktagonal luar */}
      <path
        d="M50 20 L68 28 L76 46 L72 66 L57 78 L40 77 L27 64 L24 44 L33 27 Z"
        stroke={color}
        strokeWidth="5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Batu oval di tengah */}
      <ellipse cx="50" cy="49" rx="13" ry="17" fill={color} />
      {/* Kilau batu */}
      <path d="M55 38 Q58 42 57 47" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85" />
    </svg>
  );
}

export function LogoFull({
  markClass = 'w-10 h-10',
  color = '#B9924F',
  textColor = 'text-secondary',
}: {
  markClass?: string;
  color?: string;
  textColor?: string;
}) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark className={markClass} color={color} />
      <span className="flex flex-col leading-none">
        <span className={`font-heading font-bold tracking-[0.14em] text-sm ${textColor}`}>HAJAR ASWAD</span>
        <span className={`tracking-[0.42em] text-[9px] mt-1 ${textColor} opacity-80`}>BAROKAH</span>
      </span>
    </span>
  );
}
