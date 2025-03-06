import newsData from "@/data/news";

export async function generateMetadata() {
  // ✅ Ambil berita terbaru untuk gambar utama
  const latestHukrimNews = newsData
    .filter((news) => news.category.includes("hukum & kriminal"))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const featuredArticle = latestHukrimNews[0] || null;

  return {
    title: "Berita Hukum dan Kriminal Terkini | LBJ - Lensa Berita Jakarta",
    description:
      "Dapatkan berita terbaru seputar hukum dan kriminal di Indonesia. Kami menyajikan informasi terkini tentang kasus hukum, kebijakan, dan peristiwa kriminal.",
    keywords:
      "berita hukum, berita kriminal, hukum dan kriminal, berita hukum terbaru, berita kriminal terkini, kasus hukum Indonesia, hukum, kriminal",
    openGraph: {
      title: "Berita Hukum & Kriminal Terkini | LBJ - Lensa Berita Jakarta",
      description:
        "Dapatkan berita terbaru seputar hukum dan kriminal di Indonesia. Kami menyajikan informasi terkini tentang kasus hukum, kebijakan, dan peristiwa kriminal.",
      url: "https://lensaberitajakarta.com/category/hukum-kriminal",
      images: featuredArticle
        ? [
            {
              url: featuredArticle.image,
              width: 1200,
              height: 630,
              alt: featuredArticle.title,
            },
          ]
        : [],
      type: "website",
      siteName: "LBJ - Lensa Berita Jakarta",
    },
    twitter: {
      card: "summary_large_image",
      title: "Berita Hukum & Kriminal Terkini | LBJ - Lensa Berita Jakarta",
      description:
        "Dapatkan berita terbaru seputar hukum dan kriminal di Indonesia. Kami menyajikan informasi terkini tentang kasus hukum, kebijakan, dan peristiwa kriminal.",
      images: featuredArticle ? [featuredArticle.image] : [],
    },
  };
}

export default function HukrimLayout({ children }) {
  return <>{children}</>;
}
