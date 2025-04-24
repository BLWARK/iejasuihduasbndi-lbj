"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import cornerNews from "@/data/cornerNews";

// Filter berita kategori "corner"
const filteredNews = cornerNews
  .filter((news) => news.category.includes("corner"))
  .sort((a, b) => new Date(b.date) - new Date(a.date)); // Urutkan berdasarkan tanggal terbaru

const Corner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToShow = 4;
  const totalSlides = Math.ceil(filteredNews.length / slidesToShow);

  const [visibleCount, setVisibleCount] = useState(4); // Untuk "Load More" di mobile

  // Geser ke slide berikutnya
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  // Geser ke slide sebelumnya
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  // Auto swipe setiap 5 detik (hanya di desktop)
  useEffect(() => {
    if (window.innerWidth > 640) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  // Load More di Mobile
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <div className="w-screen bg-gray-100 mt-10">
      <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto 2xl:py-20 xl:py-20 lg:py-20 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 px-4">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-red-600">Jak Chill</h2>
            <div className="w-[60px] h-[5px] bg-red-600 rounded-full mb-5 mt-3"></div>
          </div>
          {/* Tombol navigasi hanya tampil di desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button onClick={prevSlide} aria-label="arrowleft" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
              <FaArrowLeft />
            </button>
            <button onClick={nextSlide} aria-label="arrowright" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* **Desktop View: Slider** */}
        <div className="hidden md:block overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {filteredNews.map((news) => (
              <div key={news.id} className="w-[25%] flex-shrink-0 p-2">
                <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                  <Image src={news.image} alt={news.title} fill className="object-cover rounded-lg" />
                  <Link href={`/post/${news.id}/${news.slug}`} passHref>
                  <div className="absolute inset-0 bg-black/50"></div>
                  </Link>
                  <div className="absolute bottom-4 left-4 text-white">
                    <Link href={`/post/${news.id}/${news.slug}`} passHref>
                      <h3 className="text-lg font-bold leading-tight hover:underline">{news.title}</h3>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* **Mobile View: List dengan Load More** */}
        <div className="md:hidden flex flex-col gap-4 px-4">
          {filteredNews.slice(0, visibleCount).map((news) => (
            <div key={news.id} className="flex flex-col">
              <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
                <Image src={news.image} alt={news.title} fill className="object-cover rounded-lg" />
                <Link href={`/post/${news.id}/${news.slug}`} passHref>
                <div className="absolute inset-0 bg-black/50"></div>
                </Link>
                <div className="absolute bottom-4 left-4 text-white">
                  <Link href={`/post/${news.id}/${news.slug}`} passHref>
                    <h3 className="text-lg font-bold leading-tight hover:underline">{news.title}</h3>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Tombol Load More */}
          {visibleCount < filteredNews.length && (
            <button
              onClick={loadMore}
              className="mt-4 mx-auto bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Corner;
