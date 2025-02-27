import React from "react";
import Image from "next/image";
import Link from "next/link";
import usersData from "@/data/users";

const getAuthorById = (authorId) =>
  usersData.find((user) => user.id === authorId) || {};

const SideHeadline = ({ sideNews }) => {
  return (
    <div className="flex flex-col gap-2">
      {sideNews.map((news) => {
        const author = getAuthorById(news.authorId);
        return (
          <div key={news.id} className="relative w-full h-[220px] overflow-hidden rounded-lg">
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
                <h3 className="text-lg font-semibold leading-tight hover:underline">
                  {news.title}
                </h3>
                <div className="flex items-center gap-2 mt-3 text-xs opacity-80">
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

export default SideHeadline;
