import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plan My Umrah — Kalkulator Biaya Umrah Mandiri",
  description:
    "Rancang perjalanan Umrah Anda sendiri: pilih hotel Makkah & Madinah, transportasi, dan visa, lalu dapatkan estimasi biaya transparan dalam hitungan menit. Oleh PT Hajar Aswad Barokah.",
  openGraph: {
    title: "Plan My Umrah — Kalkulator Biaya Umrah Mandiri",
    description:
      "Estimasi biaya Umrah mandiri yang transparan: hotel, transportasi, visa, dan layanan ekstra sesuai kebutuhan Anda.",
    type: "website",
    locale: "id_ID",
    siteName: "Plan My Umrah",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
