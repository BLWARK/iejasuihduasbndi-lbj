"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import newsData from "@/data/news";
import Ads from "../../../components/page-components/adv-sect/AdvEditor";
import PopularNews from "@/components/PopularNewsPage";
import LatestNewsList from "@/components/LatestNewsList";

const TagPage = () => {
  const { tag } = useParams();
  const [filteredNews, setFilteredNews] = useState([]);
  const [mostViewedNews, setMostViewedNews] = useState([]);

  useEffect(() => {
    if (!tag) return;

    // ✅ Cari berita berdasarkan tag yang cocok
    const newsWithTag = newsData.filter((news) =>
      news.tags.some((t) => t.toLowerCase().replace(/\s+/g, "-") === tag)
    );

    setFilteredNews(newsWithTag);

    // ✅ Ambil berita dengan jumlah view tertinggi (top 5)
    const topViewed = [...newsData]
      .filter((news) => news.views) // Pastikan berita memiliki views
      .sort((a, b) => b.views - a.views) // Urutkan berdasarkan views tertinggi
      .slice(0, 5); // Ambil 5 berita dengan views tertinggi

    setMostViewedNews(topViewed);
  }, [tag]);

  if (filteredNews.length === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-gray-800">Tag "{tag}" Tidak Ditemukan</h1>
        <p className="text-gray-600">Tidak ada berita dengan tag ini.</p>
      </div>
    );
  }

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-6 flex flex-col lg:flex-row gap-6">
      {/* ✅ Bagian Kiri: Berita Berdasarkan Tag */}
      <div className="lg:w-[75%] w-full flex flex-col gap-2 2xl:px-0 xl:px-0 lg:px-0 px-2">
        <h1 className="text-3xl font-bold text-gray-800 capitalize mb-6">
          Berita {tag.replace("-", " ")} terkini
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <div key={news.id} className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
              {/* ✅ Gambar tanpa overlay */}
              <div className="relative w-full 2xl:h-[200px] xl:h-[200px] lg:h-[200px] h-[250px]">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* ✅ Konten Berita */}
              <div className="p-4">
                <Link href={`/post/${news.id}/${news.slug}`} passHref>
                  <h2 className="text-lg font-semibold hover:underline cursor-pointer text-gray-900">
                    {news.title}
                  </h2>
                </Link>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(news.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Bagian Kanan: Berita dengan View Tertinggi */}
      <div className="lg:w-[25%] w-full flex flex-col gap-6 border-l border-l-gray-300 2xl:pl-5 xl:pl-5 lg:pl-5 2xl:px-0 xl:px-0 lg:px-0 px-2">
        <Ads />

        {/* ✅ Berita dengan View Tertinggi */}
        {mostViewedNews.length > 0 && (
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-red-600">Berita Terpopuler</h2>
            <div className="w-[60px] h-[5px] bg-red-600 rounded-full mb-5 mt-2"></div>
            <div className="flex flex-col gap-4">
              {mostViewedNews.map((news) => (
                <Link key={news.id} href={`/post/${news.id}/${news.slug}`} passHref>
                  <div className="flex flex-col items-start border-b border-gray-300 gap-4 cursor-pointer hover:bg-gray-100 pb-4 rounded-lg">
                    <div className="relative w-full 2xl:h-[160px] xl:h-[160px] lg:h-[160px] h-[250px] rounded-lg overflow-hidden">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-xs text-gray-500">{new Date(news.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagPage;
