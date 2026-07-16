'use client';

import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/config/pricing';

const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Assalamu’alaikum, saya ingin bertanya tentang layanan Umrah PT Hajar Aswad Barokah.'
)}`;

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp PT Hajar Aswad Barokah"
      className="print:hidden fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/40 transition-transform hover:scale-110"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
