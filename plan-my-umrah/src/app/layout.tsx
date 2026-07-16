import type { Metadata } from "next";
import { Anton, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ScrollToTop } from "@/components/ScrollToTop";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PT Hajar Aswad Barokah — Umrah Mandiri Transparan | Plan My Umrah",
  description:
    "Visa & Siskopatuh, hotel Makkah & Madinah, transportasi Haramain, muthawwif bersertifikat, dan perlengkapan umrah. Rencanakan umrah mandiri Anda dengan kalkulator biaya transparan Plan My Umrah.",
  openGraph: {
    title: "PT Hajar Aswad Barokah — Umrah Mandiri Transparan",
    description:
      "Rencanakan Umroh mandirimu, setransparan itu. Kalkulator biaya + itinerary otomatis, didampingi travel resmi terdaftar Nusuk.",
    type: "website",
    locale: "id_ID",
    siteName: "PT Hajar Aswad Barokah",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${anton.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <FloatingWhatsApp />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
