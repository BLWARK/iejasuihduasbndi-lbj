import React from "react";
import Image from "next/image";
import Link from "next/link";
import newsData from "@/data/news";
import usersData from "@/data/users";

// Fungsi untuk mendapatkan author berdasarkan ID
const getAuthorById = (authorId) =>
  usersData.find((user) => user.id === authorId) || {};

// Urutkan berita berdasarkan tanggal terbaru
const sortedNews = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));

// Ambil berita utama + 4 berita kecil
const mainNews = sortedNews[0];
const sideNews = sortedNews.slice(1, 5);

// Ambil list berita terbaru


const LatestNewsLeft = () => {
  return (
    <div className=" flex flex-col 2xl:pr-4 pr-0">
      {/* Header Latest News */}
      <div className="w-full flex justify-between items-center py-2">
        <div className="2xl:w-[80%] w-full">
          <h1 className="text-2xl font-bold text-red-600">Berita Terbaru</h1>
          <div className="w-[20%] h-[5px] my-4 bg-red-600"></div>
        </div>
        <div>
          <Link href="/latest-news" passHref>
            <button className="py-2 px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-400 transition text-nowrap">
              View All
            </button>
          </Link>
        </div>
      </div>

      {/* Berita Utama & List 4 Berita Kecil */}
      <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4 mt-5">
        {/* Berita Utama */}
        <div className="gap-2 flex flex-col 2xl:border-b-0 border-b border-b-gray-300 pb-5">
          <div className="relative w-full h-[350px] rounded-lg overflow-hidden">
            <Image src={mainNews.image} alt={mainNews.title} fill className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="text-black">
            <Link href={`/artikel/${mainNews.id}/${mainNews.slug}`} passHref>
              <h2 className="text-xl font-bold leading-tight hover:underline cursor-pointer">
                {mainNews.title}
              </h2>
            </Link>
            <p className="text-xs mt-2">{mainNews.description}</p>
            <div className="flex items-center gap-2 mt-3 text-xs opacity-80">
              {getAuthorById(mainNews.authorId)?.photo && (
                <Image src={getAuthorById(mainNews.authorId)?.photo} alt={getAuthorById(mainNews.authorId)?.name} width={30} height={30} className="rounded-full border border-white" />
              )}
              <span>{getAuthorById(mainNews.authorId)?.name || "Unknown"}</span>
              <span className="w-[1px] h-3 bg-gray-300"></span>
              <span>{new Date(mainNews.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* List 4 Berita Kecil */}
        <div className="flex flex-col justify-start items-start gap-6">
          {sideNews.map((news) => (
            <div key={news.id} className="flex items-start gap-4 border-b border-gray-300 pb-4">
              <div className="relative w-[150px] h-[100px] rounded-lg overflow-hidden">
                <Image src={news.image} alt={news.title} fill className="object-cover rounded-lg" />
              </div>
              <div className="flex-1">
                <Link href={`/artikel/${news.id}/${news.slug}`} passHref>
                  <h3 className="text-sm font-semibold leading-tight hover:underline cursor-pointer">
                    {news.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-3 text-xs opacity-80">
              {getAuthorById(mainNews.authorId)?.photo && (
                <Image src={getAuthorById(mainNews.authorId)?.photo} alt={getAuthorById(mainNews.authorId)?.name} width={30} height={30} className="rounded-full border border-white" />
              )}
              <span>{getAuthorById(mainNews.authorId)?.name || "Unknown"}</span>
              <span className="w-[1px] h-3 bg-gray-300"></span>
              <span>{new Date(mainNews.date).toLocaleDateString()}</span>
            </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     

    </div>
  );
};

export default LatestNewsLeft;
