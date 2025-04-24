"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import newsData from "@/data/news";
import regionalData from "@/data/regionalData";

// Fungsi untuk mendapatkan berita berdasarkan kategori
const getNewsByCategory = (category) => {
  return newsData
    .filter((news) => news.category.includes(category))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);
};

const DropdownMenu = ({ category, isVisible, onMouseEnter, onMouseLeave }) => {
  const [articles, setArticles] = useState([]);
  const [animationClass, setAnimationClass] = useState(""); // 🔥 Animasi class

  useEffect(() => {
    setArticles(getNewsByCategory(category));
  }, [category]);

  useEffect(() => {
    if (isVisible) {
      setAnimationClass("dropdown-enter"); // Tambahkan animasi saat muncul
    } else {
      setAnimationClass("dropdown-exit"); // Tambahkan animasi saat menghilang
    }
  }, [isVisible]);

  return (
    <div
      className={`absolute top-[520px] bg-white shadow-lg rounded-lg w-full 2xl:w-[1200px] xl:w-[1200px] lg:w-[1000px] p-6 z-50 transition-opacity 2xl:block xl:block lg:block hidden ${animationClass}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="grid grid-cols-1 gap-4">
        {/* Jika menu Regional, tampilkan menu multi-level */}
        {category === "regional" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {regionalData.map((region) => (
              <div key={region.pulau}>
                <h4 className="font-semibold text-red-600 mb-2">
                  {region.pulau}
                </h4>
                <ul className="space-y-1">
                  {region.cities.map((city) => (
                    <li key={city}>
                      <Link
                        href={`/regional/${city
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-sm text-gray-700 hover:text-red-600 transition"
                      >
                        {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {articles.map((news) => (
              <div key={news.id} className="flex flex-col gap-2">
                <Link href={`/post/${news.id}/${news.slug}`}>
                  <div className="relative w-full h-[150px]">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <h4 className="text-sm font-semibold hover:underline cursor-pointer text-gray-800">
                    {news.title}
                  </h4>
                </Link>
                <p className="text-xs text-gray-500">
                  {new Date(news.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
