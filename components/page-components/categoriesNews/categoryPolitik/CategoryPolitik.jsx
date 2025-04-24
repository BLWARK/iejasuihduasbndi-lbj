import React from "react";
import Image from "next/image";
import Link from "next/link";
import newsData from "@/data/news";
import usersData from "@/data/users";

// Fungsi untuk mendapatkan author berdasarkan ID
const getAuthorById = (authorId) =>
  usersData.find((user) => user.id === authorId) || {};

// Fungsi untuk memotong teks menjadi maksimal 10 kata
const truncateText = (text, wordLimit = 10) => {
  const words = text.split(" ");
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};

// Ambil berita Politik, urutkan berdasarkan tanggal terbaru
const politikNews = newsData
  .filter((news) => news.category.some((cat) => cat.toLowerCase() === "politik"))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

// Ambil satu berita utama dan sisanya untuk list kecil
const mainNews = politikNews[0]; // Berita utama
const smallNews = politikNews.slice(1, 4); // Berita kecil

const CategoryPolitik = () => {
  return (
    <div className="flex flex-col">
      {/* Header Kategori */}
      <div className="flex flex-col items-start gap-3 mb-4">
        <h2 className="text-2xl font-bold text-blue-600">Politik</h2>
        <div className="w-[60px] h-[5px] bg-blue-600"></div>
      </div>

      {/* Berita Utama */}
      {mainNews && (
        <div className="relative w-full h-[250px] rounded-lg overflow-hidden mb-4">
          <Image src={mainNews.image} alt={mainNews.title} fill className="object-cover rounded-lg" />
          <Link href={`/post/${mainNews.id}/${mainNews.slug}`} passHref>
          <div className="absolute inset-0 bg-black/50"></div>
          </Link>
          <div className="absolute bottom-4 left-4 text-white">
            <Link href={`/post/${mainNews.id}/${mainNews.slug}`} passHref>
              <h3 className="text-lg font-bold leading-tight hover:underline">
                {truncateText(mainNews.title)}
              </h3>
            </Link>
            <div className="flex items-center gap-2 mt-1 text-xs opacity-80">
              {getAuthorById(mainNews.authorId)?.photo && (
                <Image
                  src={getAuthorById(mainNews.authorId)?.photo}
                  alt={getAuthorById(mainNews.authorId)?.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span>{getAuthorById(mainNews.authorId)?.name || "Unknown"}</span>
              <span className="w-[1px] h-3 bg-white"></span>
              <span>{new Date(mainNews.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* List Berita Kecil */}
      <div className="flex flex-col gap-6">
        {smallNews.length > 0 ? (
          smallNews.map((news) => (
            <div key={news.id} className="flex gap-4 items-start">
              <Link href={`/post/${news.id}/${news.slug}`} passHref>
              <div className="relative w-[100px] h-[70px] rounded-lg overflow-hidden">
                <Image src={news.image} alt={news.title} fill className="object-cover rounded-lg" />
              </div>
              </Link>
              <div className="flex-1">
                <Link href={`/post/${news.id}/${news.slug}`} passHref>
                  <h3 className="text-sm font-semibold leading-tight hover:underline">
                    {truncateText(news.title)}
                  </h3>
                </Link>
                <p className="text-xs text-gray-500 mt-1">{new Date(news.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Belum ada berita di kategori ini.</p>
        )}
         <div>
          <Link href="/politik" passHref>
            <button className="py-2 px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-400 transition text-nowrap">
              Lihat Semua
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryPolitik;
