import React from "react";
import Image from "next/image";
import Link from "next/link";
import usersData from "@/data/users";
import Ads from "../components/page-components/adv-sect/AdvEditor"

// Fungsi untuk mendapatkan author berdasarkan ID
const getAuthorById = (authorId) =>
  usersData.find((user) => user.id === authorId) || {};

const PopularNewsPage = ({ newsList }) => {
  return (
    <div className="2xl:w-[25%] xl:w-[25%] lg:w-[25%] w-full flex flex-col gap-4 2xl:border-l-2 xl:border-l-2 lg:border-l-2 2xl:pl-4 xl:pl-4 lg:pl-4 px-2">
        <div className="2xl:mt-0 xl:mt-0 lg:mt-0 mt-10 ">
        <Ads/>
        </div>
        <div className="2xl:mb-0 xl:mb-0 lg:mb-0 mb-10 ">
        <Ads/>
        </div>
        
      <h2 className="text-2xl font-bold text-red-600">Berita Terpopuler</h2>
      <div className="w-[60px] h-[5px] bg-red-600 rounded-full mb-5 mt-2"></div>
      {newsList.map((news, index) => (
        <div key={news.id} className="flex flex-col">
          <div className="relative w-full 2xl:h-[150px] xl:h-[150px] lg:h-[150px] h-[200px] rounded-lg overflow-hidden">
            <Image src={news.image} alt={news.title} fill className="object-cover rounded-lg" />
          </div>
          <Link href={`/post/${news.id}/${news.slug}`} passHref>
            <h3 className="text-sm font-semibold leading-tight hover:underline mt-3 text-gray-900">
              {news.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            {getAuthorById(news.authorId)?.photo && (
              <Image
                src={getAuthorById(news.authorId)?.photo}
                alt={getAuthorById(news.authorId)?.name}
                width={24}
                height={24}
                className="rounded-full border border-white"
              />
            )}
            <span>{getAuthorById(news.authorId)?.name || "Unknown"}</span>
            <span className="w-[1px] h-3 bg-gray-300"></span>
            <span className="text-black">{new Date(news.date).toLocaleDateString()}</span>
          </div>
          {index < newsList.length - 1 && <div className="w-full h-[1px] bg-gray-300 my-4"></div>}
        </div>
      ))}
    </div>
  );
};

export default PopularNewsPage;
