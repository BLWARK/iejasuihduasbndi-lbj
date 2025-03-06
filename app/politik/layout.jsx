import newsData from "@/data/news";

export async function generateMetadata() {
  // ✅ Ambil berita terbaru di kategori Politik
  const latestPoliticsNews = newsData
    .filter((news) => news.category.includes("politik"))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const featuredArticle = latestPoliticsNews[0] || null;

  return {
    title: "Berita Politik Terkini | LBJ - Lensa Berita Jakarta",
    description:
      "Dapatkan berita terbaru seputar politik nasional dan internasional. Kami menyajikan informasi terkini tentang kebijakan pemerintah, pemilu, serta dinamika politik Indonesia.",
    keywords:
      "berita politik, berita politik terkini, politik Indonesia, kebijakan pemerintah, berita pemilu, partai politik, politik nasional, politik internasional",
    openGraph: {
      title: "Berita Politik Terkini | LBJ - Lensa Berita Jakarta",
      description:
        "Dapatkan berita terbaru seputar politik nasional dan internasional. Kami menyajikan informasi terkini tentang kebijakan pemerintah, pemilu, serta dinamika politik Indonesia.",
      url: "https://lensaberitajakarta.com/category/politik",
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
      title: "Berita Politik Terkini | LBJ - Lensa Berita Jakarta",
      description:
        "Dapatkan berita terbaru seputar politik nasional dan internasional. Kami menyajikan informasi terkini tentang kebijakan pemerintah, pemilu, serta dinamika politik Indonesia.",
      images: featuredArticle ? [featuredArticle.image] : [],
    },
  };
}

export default function PolitikLayout({ children }) {
  return <>{children}</>;
}
