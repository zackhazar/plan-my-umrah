'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // Hindari mismatch hidrasi: ikon baru dirender setelah mount di client
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={dark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
      className="w-10 h-10 rounded-full border border-border bg-card/60 flex items-center justify-center text-foreground/70 transition-colors hover:text-primary hover:border-primary/40"
    >
      {mounted ? (dark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />) : <Moon className="w-4.5 h-4.5 opacity-0" />}
    </button>
  );
}
