import newsData from "@/data/news";

export async function generateMetadata({ params }) {
  const { id, slug } = params;

  // ✅ Cari artikel berdasarkan ID dan slug
  const article = newsData.find(
    (news) => news.id.toString() === id && news.slug === slug
  );

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan | LBJ - Lensa Berita Jakarta",
      description: "Artikel yang Anda cari tidak tersedia.",
      robots: "noindex, follow",
    };
  }

  return {
    title: `${article.title} | LBJ - Lensa Berita Jakarta`,
    description: article.description || article.content.substring(0, 150) + "...",
    keywords: article.tags?.join(", ") || "berita, jakarta, terkini, informasi",
    openGraph: {
      title: article.title,
      description: article.description || article.content.substring(0, 150) + "...",
      url: `https://lensaberitajakarta.com/post/${article.id}/${article.slug}`,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
      publishedTime: article.date,
      siteName: "LBJ - Lensa Berita Jakarta",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description || article.content.substring(0, 150) + "...",
      images: [article.image],
    },
  };
}

export default function PostLayout({ children }) {
  return <>{children}</>;
}
