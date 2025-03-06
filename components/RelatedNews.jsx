"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

// ✅ Komponen RelatedNews untuk menampilkan berita terkait berdasarkan kategori
const RelatedNews = ({ relatedArticles }) => {
  return (
    <div className="mt-10 border-t border-gray-300 pt-6 ">
      <h2 className="text-2xl font-bold text-red-600">Berita Terkait</h2>
      <div className="w-[60px] h-[5px] bg-red-600 rounded-full mb-5 mt-2"></div>

      <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 grid-cols-1 gap-4">
        {relatedArticles.length > 0 ? (
          relatedArticles.map((news) => (
            <div key={news.id} className="flex flex-col  border-gray-300">
              {/* ✅ Gambar Artikel */}
              <div className="relative w-full 2xl:h-[150px] xl:h-[150px] lg:h-[150px] h-[200px] rounded-lg overflow-hidden">
                <Image src={news.image} alt={news.title} fill className="object-cover rounded-lg" />
              </div>

              {/* ✅ Judul Artikel */}
              <Link href={`/post/${news.id}/${news.slug}`} passHref>
                <h3 className="text-sm font-semibold leading-tight hover:underline mt-3 text-gray-900">
                  {news.title}
                </h3>
              </Link>

              {/* ✅ Informasi Author & Tanggal */}
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <span>{new Date(news.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Tidak ada berita terkait.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedNews;
