import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import TopNavbar from "@/components/navigation/TopNavbar";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import Ecosystem from "@/components/navigation/Ecosystem";

import "./globals.css";

// Menggunakan font Open Sans dengan semua varian
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// ✅ Tambahkan metadata lebih lengkap
export const metadata: Metadata = {
  title: "Lensa Berita Jakarta - Informasi Berita Terkini",
  description: "Lensa Berita Jakarta adalah portal berita terpercaya yang menyajikan informasi terkini Indonesia dan internasional.",
  keywords: [
    "Lensa Berita Jakarta",
    "portal berita",
    "berita terkini",
    "berita politik",
    "berita ekonomi",
    "berita hiburan",
    "berita terbaru",
    "politik",
    "kecelakaan",
    "indonesia"
  ].join(", "),
  authors: [{ name: "Lensa Berita Jakarta Team", url: "https://lensaberitajakarta.com" }],
  metadataBase: new URL("https://lensaberitajakarta.com"),
  robots: "index, follow",
  alternates: {
    canonical: "https://lensaberitajakarta.com",
  },
  
  openGraph: {
    title: "Lensa Berita Jakarta - Portal Berita Terpercaya",
    description: "Dapatkan berita terbaru dari dunia politik, ekonomi, hiburan, dan gaya hidup di Lensa Berita Jakarta.",
    url: "https://lensaberitajakarta.com",
    siteName: "Lensa Berita Jakarta",
    images: [
      {
        url: "https://lensaberitajakarta.com/preview-image.jpg", // Pastikan gambar tersedia
        width: 1200,
        height: 630,
        alt: "Lensa Berita Jakarta",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@LensaBeritaJKT",
    creator: "@LensaBeritaJKT",
    title: "Lensa Berita Jakarta - Portal Berita Terpercaya",
    description: "Dapatkan berita terbaru dari dunia politik, ekonomi, hiburan, dan gaya hidup di Lensa Berita Jakarta.",
    images: ["https://lensaberitajakarta.com/preview-image.jpg"],
  },
  manifest: "/site.webmanifest", // Ini yang penting!
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
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ff4500" />

        {/* ✅ JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              "name": "Lensa Berita Jakarta",
              "url": "https://lensaberitajakarta.com",
              "logo": "https://lensaberitajakarta.com/logo.png",
              "sameAs": [
                "https://twitter.com/LensaBeritaJKT",
                "https://www.facebook.com/LensaBeritaJakarta",
                "https://www.instagram.com/LensaBeritaJKT"
              ],
              "publisher": {
                "@type": "Organization",
                "name": "Lensa Berita Jakarta",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://lensaberitajakarta.com/logo.png",
                  "width": 600,
                  "height": 60
                }
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://lensaberitajakarta.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </head>
      <body className={openSans.className}>
        <div className="flex flex-col justify-center items-center overflow-hidden bg-gray-100 w-full">
          <TopNavbar />
          <Ecosystem />
          <Navbar />
          <main className="w-full 2xl:px-0">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
