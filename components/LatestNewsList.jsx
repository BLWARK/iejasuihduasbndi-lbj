"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const LatestNewsList = ({ newsList }) => {
  const [visibleCount, setVisibleCount] = useState(6); // Menampilkan 6 berita awal

  // Fungsi untuk menampilkan lebih banyak berita
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <div className="flex flex-col gap-4 mt-10" >
      {/* **Judul Section** */}
      <h2 className="text-2xl font-bold text-red-600">Berita Terkini</h2>
      <div className="w-[60px] h-[5px] bg-red-600 rounded-full mb-3"></div>

      {/* **List Berita Kecil (Horizontal)** */}
      <div className="grid grid-cols-1 gap-4">
        {newsList.slice(0, visibleCount).map((news) => (
          <div key={news.id} className="2xl:flex xl:flex lg:flex  flex-row gap-4 items-start border-b border-gray-300 pb-4">
            <div className="relative 2xl:w-[250px] xl:w-[250px] lg:w-[250px] w-full 2xl:h-[150px] xl:h-[150px] lg:h-[150px] h-[200px]  rounded-lg overflow-hidden">
              <Image src={news.image} alt={news.title} fill className="object-cover rounded-lg" />
            </div>
            <div className="flex-1 2xl:mt-0 xl:mt-0 lg:mt-0 mt-4">
              <Link href={`/post/${news.id}/${news.slug}`} passHref>
                <h3 className="text-lg font-semibold leading-tight hover:underline text-gray-900">
                  {news.title}
                </h3>
              </Link>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(news.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* **Tombol Load More** */}
      {visibleCount < newsList.length && (
        <button
          onClick={loadMore}
          className="py-2 px-10 mt-4 self-center bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition 2xl:mb-0 xl:mb-0 lg:mb-0 mb-10"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default LatestNewsList;
