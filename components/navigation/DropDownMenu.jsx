"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import newsData from "@/data/news";

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
      <div className="grid grid-cols-4 gap-4">
        {articles.map((news) => (
          <div key={news.id} className="flex flex-col gap-2">
            <div className="relative w-full h-[150px]">
              <Image src={news.image} alt={news.title} fill className="rounded-lg object-cover" />
            </div>
            <Link href={`/post/${news.id}/${news.slug}`}>
              <h4 className="text-sm font-semibold hover:underline cursor-pointer text-gray-800">
                {news.title}
              </h4>
            </Link>
            <p className="text-xs text-gray-500">{new Date(news.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
