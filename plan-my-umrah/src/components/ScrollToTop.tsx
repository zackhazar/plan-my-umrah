'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Kembali ke atas"
      className="print:hidden fixed bottom-5 right-22 z-50 w-11 h-11 rounded-full bg-card border border-border text-foreground/70 flex items-center justify-center shadow-md transition-all hover:text-primary hover:border-primary/40"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
