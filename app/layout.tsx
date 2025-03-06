import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import TopNavbar from "@/components/navigation/TopNavbar"
import Navbar from "@/components/navigation/Navbar"
import Footer from "@/components/footer/Footer"
import Ecosystem from "@/components/navigation/Ecosystem"

import "./globals.css";

// Menggunakan font Open Sans dengan semua varian
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", ], // Semua varian
});

export const metadata: Metadata = {
  title: "Lensa Berita Jakarta - informasi berita terkini",
  description: "Lensa Berita Jakarta adalah portal berita terpercaya yang menyajikan informasi terkini indonesia dan internasional.",
  keywords: "Lensa Berita Jakarta, portal berita, berita terkini, berita politik, berita ekonomi, berita hiburan, berita terbaru, politik, kecelakaan, indonesia",
  authors: [{ name: "Lensa Berita Jakarta Team", url: "https://lensaberitajakarta.com" }],
  openGraph: {
    title: "Lensa Berita Jakarta - Portal Berita Terpercaya",
    description: "Dapatkan berita terbaru dari dunia politik, ekonomi, hiburan, dan gaya hidup di Lensa Berita Jakarta.",
    url: "https://lensaberitajakarta.com",
    siteName: "Lensa Berita Jakarta",
    images: [
      {
        url: "https://lensaberitajakarta.com/preview-image.jpg", // Ganti dengan link gambar preview
        width: 800,
        height: 600,
        alt: "Lensa Berita Jakarta",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@LensaBeritaJKT", // Ganti dengan akun Twitter jika ada
    creator: "@LensaBeritaJKT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* SEO Metadata tambahan */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={openSans.className}>
        <div className="flex flex-col justify-center items-center overflow-hidden bg-gray-100 w-full">
          <TopNavbar/>
          <Ecosystem/>
          <Navbar/>
          <main className="w-full 2xl:px-0">{children}</main>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
