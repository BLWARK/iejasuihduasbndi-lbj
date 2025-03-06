import newsData from "@/data/news";

export async function generateMetadata() {
  // ✅ Ambil berita terbaru untuk gambar utama
  const latestTrafficNews = newsData
    .filter((news) => news.category.includes("lalu lintas"))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const featuredArticle = latestTrafficNews[0] || null;

  return {
    title: "Berita Lalu Lintas Terkini | LBJ - Lensa Berita Jakarta",
    description:
      "Dapatkan informasi terbaru tentang kondisi lalu lintas di Indonesia. Berita terkini tentang kecelakaan, kemacetan, tilang elektronik, dan kebijakan transportasi.",
    keywords:
      "berita lalu lintas, kondisi lalu lintas, kecelakaan, kemacetan, tilang elektronik, kebijakan transportasi, lalin terkini, info lalu lintas",
    openGraph: {
      title: "Berita Lalu Lintas Terkini | LBJ - Lensa Berita Jakarta",
      description:
        "Dapatkan informasi terbaru tentang kondisi lalu lintas di Indonesia. Berita terkini tentang kecelakaan, kemacetan, tilang elektronik, dan kebijakan transportasi.",
      url: "https://lensaberitajakarta.com/category/lalu-lintas",
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
      title: "Berita Lalu Lintas Terkini | LBJ - Lensa Berita Jakarta",
      description:
        "Dapatkan informasi terbaru tentang kondisi lalu lintas di Indonesia. Berita terkini tentang kecelakaan, kemacetan, tilang elektronik, dan kebijakan transportasi.",
      images: featuredArticle ? [featuredArticle.image] : [],
    },
  };
}

export default function LaluLintasLayout({ children }) {
  return <>{children}</>;
}
