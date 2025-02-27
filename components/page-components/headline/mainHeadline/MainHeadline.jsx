import React from "react";
import Image from "next/image";
import Link from "next/link";
import usersData from "@/data/users";

const getAuthorById = (authorId) =>
  usersData.find((user) => user.id === authorId) || {};

const MainHeadline = ({ mainNews }) => {
  const author = getAuthorById(mainNews.authorId);

  return (
    <div className="md:col-span-2 relative">
      <div className="relative w-full h-[450px] overflow-hidden">
        <Link href={`/post/${mainNews.id}/${mainNews.slug}`} passHref>
          <div className="relative w-full h-full">
            <Image
              src={mainNews.image}
              alt={mainNews.title}
              fill
              className="rounded-lg object-cover"
              priority={true}
              
            />
          </div>
          <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
          <div className="absolute bottom-6 left-6 text-white max-w-[90%]">
            <h2 className="text-2xl md:text-3xl font-bold leading-tight hover:underline">
              {mainNews.title}
            </h2>
            <p className="text-sm mt-2">{mainNews.description}</p>
            <div className="flex items-center gap-2 mt-4 text-sm opacity-80">
              {author.photo && (
                <Image
                  src={author.photo}
                  alt={author.name}
                  width={30}
                  height={30}
                  className="rounded-full border border-white"
                />
              )}
              <span>{author.name || "Unknown"}</span>
              <span className="w-[1px] h-4 bg-white"></span>
              <span>{new Date(mainNews.date).toLocaleDateString()}</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainHeadline;
