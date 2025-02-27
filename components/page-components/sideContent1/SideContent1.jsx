import React from "react";
import Image from "next/image";
import Link from "next/link";
import newsData from "@/data/news";
import usersData from "@/data/users";
import Ads from "@/components/page-components/adv-sect/AdvEditor";

// Fungsi untuk mendapatkan author berdasarkan ID
const getAuthorById = (authorId) =>
  usersData.find((user) => user.id === authorId) || {};

// Ambil berita "editor picks"
const editorNews = newsData.filter((news) => news.type === "editor").slice(0, 5);

const SideContent1 = () => {
  return (
    <div className="flex flex-col gap-4 border-l-2 2xl:pl-4 xl:pl-4 lg:pl-4 pl-0 ">
      <Ads />
      <h1 className="text-2xl font-bold text-blue-700 2xl:mt-0 xl:mt-0 lg:mt-0 mt-10">Pilihan Editor</h1>
      <div className="w-[20%] h-[5px]  bg-blue-700"></div>
      
      {editorNews.map((news, index) => (
        <div key={news.id} className="flex flex-col">
          {/* Gambar */}
          <div className="relative w-full 2xl:h-[150px] xl:h-[150px] lg:h-[150px] h-[200px] rounded-lg overflow-hidden">
            <Image src={news.image} alt={news.title} fill className="object-cover rounded-lg" />
          </div>

          {/* Judul */}
          <Link href={`/artikel/${news.id}/${news.slug}`} passHref>
            <h3 className="text-sm font-semibold hover:underline mt-3">{news.title}</h3>
          </Link>

          {/* Author & Date */}
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            {getAuthorById(news.authorId)?.photo && (
              <Image
                src={getAuthorById(news.authorId)?.photo}
                alt={getAuthorById(news.authorId)?.name}
                width={20}
                height={20}
                className="rounded-full border border-gray-300"
              />
            )}
            <span>{getAuthorById(news.authorId)?.name || "Unknown"}</span>
            <span className="w-[1px] h-3 bg-gray-300"></span>
            <span>{new Date(news.date).toLocaleDateString()}</span>
          </div>

          {/* Garis Pemisah (jika bukan item terakhir) */}
          {index < editorNews.length - 1 && <div className="w-full h-[1px] bg-gray-300 my-4"></div>}
        </div>
      ))}
    </div>
  );
};

export default SideContent1;
