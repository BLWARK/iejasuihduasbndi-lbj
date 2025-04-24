import React from "react";
import Image from "next/image";
import Link from "next/link";
import newsData from "@/data/news";
import usersData from "@/data/users";

// Fungsi untuk mendapatkan author berdasarkan ID
const getAuthorById = (authorId) =>
  usersData.find((user) => user.id === authorId) || {};

// Urutkan berita berdasarkan views terbanyak
const popularNews = [...newsData].sort((a, b) => b.views - a.views).slice(0, 12);

const PopularNews = () => {
  return (
    <div className="w-full flex flex-col mt-8 pr-4" >
      {/* Header Popular News */}
      <div className="w-full flex justify-between items-center py-2">
        <div className="w-[80%]">
          <h1 className="text-2xl font-bold text-red-600">Berita Terpopuler</h1>
          <div className="w-[20%] h-[5px] my-4 bg-red-600"></div>
        </div>
        
      </div>

      {/* List Berita Populer */}
      <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-6">
        {popularNews.map((news) => (
          <div key={news.id} className="flex items-start gap-4 border-b border-gray-300 pb-4">
            <Link href={`/post/${news.id}/${news.slug}`} passHref>
            <div className="relative w-[170px] h-[100px] rounded-lg overflow-hidden">
              <Image src={news.image} alt={news.title} fill className="object-cover rounded-lg" />
            </div>
            </Link>
            <div className="flex-1">
              <Link href={`/post/${news.id}/${news.slug}`} passHref>
                <h1 className="text-sm font-semibold leading-tight hover:underline cursor-pointer">
                  {news.title}
                </h1>
              </Link>
              <div className="flex items-center gap-2 mt-2 text-xs opacity-80">
                {getAuthorById(news.authorId)?.photo && (
                  <Image
                    src={getAuthorById(news.authorId)?.photo}
                    alt={getAuthorById(news.authorId)?.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                )}
                <span>{getAuthorById(news.authorId)?.name || "Unknown"}</span>
                <span className="w-[1px] h-3 bg-gray-300"></span>
                <span>{new Date(news.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularNews;
