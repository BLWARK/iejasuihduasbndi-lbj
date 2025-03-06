import newsData from "@/data/news";

export async function generateMetadata() {
  // ✅ Ambil berita terbaru untuk gambar utama
  const latestKhasanahNews = newsData
    .filter((news) => news.category.includes("khasanah"))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const featuredArticle = latestKhasanahNews[0] || null;

  return {
    title: "Berita Khasanah & Keislaman Terkini | LBJ - Lensa Berita Jakarta",
    description:
      "Dapatkan berita terbaru tentang khasanah Islam, sejarah, budaya, dan perkembangan keagamaan di Indonesia serta dunia Islam.",
    keywords:
      "berita khasanah, berita Islam, sejarah Islam, berita keislaman, kebudayaan Islam, khasanah Islam, perkembangan Islam, berita Islami",
    openGraph: {
      title: "Berita Khasanah & Keislaman Terkini | LBJ - Lensa Berita Jakarta",
      description:
        "Dapatkan berita terbaru tentang khasanah Islam, sejarah, budaya, dan perkembangan keagamaan di Indonesia serta dunia Islam.",
      url: "https://lensaberitajakarta.com/category/khasanah",
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
      title: "Berita Khasanah & Keislaman Terkini | LBJ - Lensa Berita Jakarta",
      description:
        "Dapatkan berita terbaru tentang khasanah Islam, sejarah, budaya, dan perkembangan keagamaan di Indonesia serta dunia Islam.",
      images: featuredArticle ? [featuredArticle.image] : [],
    },
  };
}

export default function KhasanahLayout({ children }) {
  return <>{children}</>;
}
