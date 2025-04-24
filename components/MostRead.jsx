"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Ads from "@/components/page-components/adv-sect/AdvEditor"

// ✅ Komponen MostRead untuk menampilkan artikel berdasarkan views tertinggi
const MostRead = ({ mostReadArticles }) => {
  return (
    <div className="">
      <div className="mb-10">
        <Ads/>
        </div>
        <div className="">
        <Ads/>
        </div>
      <h2 className="text-2xl font-bold text-red-500 mt-10">Most Read</h2>
      <div className="w-[60px] h-[5px] bg-red-500 rounded-full mb-5 mt-2"></div>

      <div className="flex flex-col gap-4">
        {mostReadArticles.length > 0 ? (
          mostReadArticles.map((news, index) => (
            <div key={news.id} className="flex flex-col gap-4 border-b  pb-4 border-gray-300">
              {/* ✅ Gambar Artikel */}
              <Link href={`/post/${news.id}/${news.slug}`} passHref>
              <div className="relative w-full 2xl:h-[170px] xl:h-[170px] lg:h-[170px] h-[200px] rounded-lg overflow-hidden">
                <Image src={news.image} alt={news.title} fill className="object-cover rounded-lg" />
              </div>
              </Link>

              {/* ✅ Judul Artikel */}
              <div className="flex-1">
                <Link href={`/post/${news.id}/${news.slug}`} passHref>
                  <h3 className="text-sm font-semibold leading-tight hover:underline text-gray-900">
                    {news.title}
                  </h3>
                </Link>

                {/* ✅ Jumlah Views */}
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <span>{new Date(news.date).toLocaleDateString()}</span>
              </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Belum ada artikel populer.</p>
        )}
      </div>
    </div>
  );
};

export default MostRead;
