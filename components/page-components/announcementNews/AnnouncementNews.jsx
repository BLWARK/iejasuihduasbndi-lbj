"use client"
import React, { useState, useEffect } from "react";
import { IoMdMegaphone } from "react-icons/io";
import Link from "next/link";
import newsData from "@/data/news";

// Ambil 5 berita dengan views tertinggi
const popularNews = [...newsData]
  .sort((a, b) => b.views - a.views)
  .slice(0, 5);

const AnnouncementNews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % popularNews.length);
    }, 5000); // Ganti berita setiap 3 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full  text-red-600 2xl:px-0 px-4  justify-center items-center gap-2 overflow-hidden  flex 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-3 mt-2">
      {/* Icon Toa */}
      <p className="text-nowrap bg-red-600 text-white py-2 px-4 2xl:block hidden">Trending News: </p>
      <IoMdMegaphone className="2xl:text-2xl text-lg flex-shrink-0" />
        
      {/* Wrapper untuk animasi swipe */}
      <div className="relative w-full h-[1.2rem] overflow-hidden">
        {popularNews.map((news, index) => (
          <Link
            key={news.id}
            href={`/post/${news.id}/${news.slug}`}
            passHref
          >
            <p
              className={`2xl:text-sm xl:text-sm lg:text-sm text-xs cursor-pointer hover:underline whitespace-nowrap absolute inset-0 transition-all duration-500  ${
                index === currentIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {news.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementNews;
