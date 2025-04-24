"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import newsData from "@/data/news";
import usersData from "@/data/users";
import PopularNews from "@/components/PopularNewsPage"; // Komponen Berita Terpopuler
import LatestNewsList from "@/components/LatestNewsList"; // Komponen List Berita Terbaru
import Ads from "@/components/page-components/adv-sect/AdvBottomHead"; // Komponen Iklan

// ✅ Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) =>
  usersData.find((user) => user.id === authorId) || {};

// ✅ Filter berita kategori "Lalu Lintas"
const trafficNews = newsData
  .filter((news) => news.category.includes("lalu lintas"))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const mainNews = trafficNews[0]; // Berita utama
const additionalNews = trafficNews.slice(1, 5); // 4 berita tambahan vertikal
const latestNews = trafficNews.slice(1, 10); // 10 berita terkini
const popularNews = trafficNews
  .sort((a, b) => b.views - a.views)
  .slice(0, 4); // 4 berita paling banyak dibaca

const TrafficPage = () => {
  return (
    <div className="w-full 2xl:flex xl:flex lg:flex flex-row 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-6">
      {/* **KIRI: Berita Utama + 4 Berita Vertikal + List Berita Kecil** */}
      <div className="2xl:w-[75%] xl:w-[75%] lg:w-[75%] w-full flex flex-col gap-2 px-2">
        {/* **Bagian Atas: Berita Utama + 4 Berita Vertikal** */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* **Berita Utama (Lebar 2 Kolom)** */}
          {mainNews && (
            <div className="md:col-span-2 relative w-full h-[400px] rounded-lg overflow-hidden">
              <Image
                src={mainNews.image}
                alt={mainNews.title}
                fill
                className="object-cover rounded-lg"
              />
              <Link href={`/post/${mainNews.id}/${mainNews.slug}`} passHref>
              <div className="absolute inset-0 bg-black/50"></div>
              </Link>
              <div className="absolute bottom-6 left-6 text-white max-w-[90%]">
                <Link href={`/post/${mainNews.id}/${mainNews.slug}`} passHref>
                  <h2 className="text-xl md:text-3xl font-bold leading-tight hover:underline">
                    {mainNews.title}
                  </h2>
                </Link>

                <div className="flex items-center gap-2 mt-3 text-xs opacity-80">
                  {getAuthorById(mainNews.authorId)?.photo && (
                    <Image
                      src={getAuthorById(mainNews.authorId)?.photo}
                      alt={getAuthorById(mainNews.authorId)?.name}
                      width={30}
                      height={30}
                      className="rounded-full border border-white"
                    />
                  )}
                  <span>{getAuthorById(mainNews.authorId)?.name || "Unknown"}</span>
                  <span className="w-[1px] h-3 bg-white"></span>
                  <span>{new Date(mainNews.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* **4 Berita Vertikal di Samping Berita Utama** */}
          <div className="flex flex-col gap-4">
            {additionalNews.map((news) => (
              <div key={news.id} className="flex gap-2 border-b pb-4 border-gray-300">
                <div className="flex flex-col gap-2">
                  <Link href={`/post/${news.id}/${news.slug}`} passHref>
                    <h3 className="text-sm font-semibold leading-tight hover:underline text-gray-900">
                      {news.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500">
                    {new Date(news.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* **Iklan** */}
        <Ads />

        {/* **List Berita Kecil (Menggunakan Komponen)** */}
        <LatestNewsList newsList={latestNews} />
      </div>

      {/* **KANAN: Berita Terpopuler (Menggunakan Komponen)** */}
      <PopularNews newsList={popularNews} />
    </div>
  );
};

export default TrafficPage;
