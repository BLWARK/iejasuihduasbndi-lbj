import React from "react";
import Image from "next/image";
import Link from "next/link";
import usersData from "@/data/users";

const getAuthorById = (authorId) =>
  usersData.find((user) => user.id === authorId) || {};

const BottomHeadline = ({ bottomNews }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {bottomNews.map((news) => {
        const author = getAuthorById(news.authorId);
        return (
          <div key={news.id} className="relative w-full h-[200px] overflow-hidden rounded-lg">
            <Link href={`/post/${news.id}/${news.slug}`} passHref>
              <div className="relative w-full h-full">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
              <div className="absolute bottom-4 left-4 text-white max-w-[90%]">
                <h3 className="text-sm font-semibold leading-tight hover:underline">
                  {news.title}
                </h3>
                <div className=" items-center gap-2 mt-3 text-xs text-gray-300 2xl:flex hidden">
                  {author.photo && (
                    <Image
                      src={author.photo}
                      alt={author.name}
                      width={24}
                      height={24}
                      className="rounded-full border border-white"
                    />
                  )}
                  <span>{author.name || "Unknown"}</span>
                  <span className="w-[1px] h-3 bg-white"></span>
                  <span>{new Date(news.date).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default BottomHeadline;
