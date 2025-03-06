"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // ✅ Import React Icons
import newsData from "@/data/news";
import PopularNews from "@/components/PopularNewsPageOnAllLatest";

const LatestNewsPage = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [mostViewedNews, setMostViewedNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 🔥 Jumlah berita per halaman

  useEffect(() => {
    // ✅ Urutkan berita berdasarkan tanggal terbaru
    const sortedNews = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));

    setLatestNews(sortedNews);

    // ✅ Ambil ID berita terbaru untuk menghindari duplikasi di popular news
    const latestNewsIds = new Set(sortedNews.slice(0, 30).map((news) => news.id)); 

    // ✅ Ambil berita dengan views tertinggi yang **bukan** berita terbaru
    const topViewed = [...newsData]
      .filter((news) => news.views && !latestNewsIds.has(news.id)) // **🔥 Pastikan tidak bentrok dengan berita terbaru**
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // ✅ Jika tidak ada berita terpopuler, tetap tampilkan 10 berita terbaru (fallback)
    setMostViewedNews(topViewed.length > 0 ? topViewed : sortedNews.slice(10, 20));
  }, []);

  // ✅ Hitung total halaman
  const totalPages = Math.ceil(latestNews.length / itemsPerPage);

  // ✅ Hitung indeks data yang akan ditampilkan
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = latestNews.slice(startIndex, endIndex);

  // ✅ Pagination Logic untuk Menampilkan Maksimal 5 Tombol Halaman
  const maxVisiblePages = 3;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // ✅ Fungsi untuk Scroll ke Atas setelah Klik Pagination
  const handlePagination = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" }); // 🔥 Auto scroll ke atas
    }
  };

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-6 flex flex-col lg:flex-row gap-6">
      {/* ✅ Bagian Kiri: Berita Terbaru */}
      <div className="lg:w-[75%] w-full flex flex-col gap-2 px-2">
        <h1 className="text-3xl font-bold text-red-600 mb-6">Berita Terbaru</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentNews.map((news) => (
            <div key={news.id} className="relative w-full rounded-lg overflow-hidden border border-gray-300">
              <div className="relative w-full h-[200px]">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>

              <div className="p-4">
                <Link href={`/post/${news.id}/${news.slug}`} passHref>
                  <h2 className="text-lg font-semibold hover:underline cursor-pointer text-gray-900">
                    {news.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(news.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Pagination dengan Tombol Angka & Previous/Next */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 gap-2 ">
            {/* 🔥 Tombol Previous */}
            <button
              onClick={() => handlePagination(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 text-lg font-semibold rounded-md transition bg-gray-300 text-gray-800 hover:bg-gray-400 ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <FaArrowLeft size={16} /> Prev
            </button>

            {/* 🔥 Tombol Halaman (Maksimal 5) */}
            {startPage > 1 && (
              <button
                onClick={() => handlePagination(1)}
                className="px-4 py-2 text-lg font-semibold rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                1
              </button>
            )}
            {startPage > 2 && <span className="px-2 text-gray-500">...</span>}

            {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePagination(pageNumber)}
                className={`px-4 py-2 text-lg font-semibold rounded-md transition bg-gray-300 text-gray-800 hover:bg-gray-400 ${
                  pageNumber === currentPage ? "bg-red-600 text-white" : ""
                }`}
              >
                {pageNumber}
              </button>
            ))}

            {endPage < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
            {endPage < totalPages && (
              <button
                onClick={() => handlePagination(totalPages)}
                className="px-4 py-2 text-lg font-semibold rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                {totalPages}
              </button>
            )}

            {/* 🔥 Tombol Next */}
            <button
              onClick={() => handlePagination(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 text-lg font-semibold rounded-md transition bg-gray-300 text-gray-800 hover:bg-gray-400 ${
                currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Next <FaArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* ✅ Bagian Kanan: Berita Terpopuler */}
      <div className="lg:w-[25%] w-full flex flex-col gap-6 border-l border-gray-300 2xl:pl-5 xl:pl-5 lg:pl-5">
        <PopularNews newsList={mostViewedNews} />
      </div>
    </div>
  );
};

export default LatestNewsPage;
