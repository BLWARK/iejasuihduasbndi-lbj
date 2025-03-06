import newsData from "@/data/news";

export async function generateMetadata({ params }) {
  const { tag } = params;

  if (!tag) {
    return {
      title: "Tag Tidak Ditemukan | LBJ - Lensa Berita Jakarta",
      description: "Tag yang Anda cari tidak tersedia dalam sistem kami.",
      robots: "noindex, follow",
    };
  }

  // ✅ Ambil berita berdasarkan tag yang sesuai
  const articlesWithTag = newsData.filter((article) =>
    article.tags.some((t) => t.toLowerCase().replace(/\s+/g, "-") === tag)
  );

  if (articlesWithTag.length === 0) {
    return {
      title: `Berita dengan Tag "${tag.replace("-", " ")}" Tidak Ditemukan | LBJ`,
      description: `Tidak ada berita dengan tag "${tag.replace("-", " ")}" di LBJ.`,
      robots: "noindex, follow",
    };
  }

  // ✅ Ambil berita terbaru sebagai referensi utama
  const featuredArticle = articlesWithTag[0];

  return {
    title: `Berita ${tag.replace("-", " ")} terkini`,
    description: `Dapatkan berita terbaru "${tag.replace("-", " ")}" hanya di LBJ - Lensa Berita Jakarta.`,
    keywords: articlesWithTag.length > 0 ? articlesWithTag.map((news) => news.tags).flat().join(", ") : "berita, berita terkini, LBJ",
    openGraph: {
      title: `Berita dengan Tag "${tag.replace("-", " ")}" | LBJ - Lensa Berita Jakarta`,
      description: `Baca berita terbaru tentang "${tag.replace("-", " ")}" hanya di LBJ.`,
      url: `https://www.lensaberitajakarta.com/tag/${tag}`,
      images: [
        {
          url: featuredArticle.image,
          width: 1200,
          height: 630,
          alt: `Gambar untuk tag ${tag.replace("-", " ")}`,
        },
      ],
      type: "website",
      siteName: "LBJ - Lensa Berita Jakarta",
    },
    twitter: {
      card: "summary_large_image",
      title: `Berita dengan Tag "${tag.replace("-", " ")}" | LBJ - Lensa Berita Jakarta`,
      description: `Dapatkan berita terbaru tentang "${tag.replace("-", " ")}" di LBJ.`,
      images: [featuredArticle.image],
    },
  };
}

export default function TagLayout({ children }) {
  return <>{children}</>;
}
