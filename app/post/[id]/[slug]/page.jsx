"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
// import Link from "next/link";
import newsData from "@/data/news";
import usersData from "@/data/users";
// import RelatedNews from "@/components/relatedNews/RelatedNews";
// import MostRead from "@/components/mostRead/MostRead";
// import Share from "@/components/share/Share";
// import Follow from "@/components/follow/Follow";
// import Adv from "@/components/page-components/adv-sect/AdvBottomHead";
import { notFound } from "next/navigation"; // Untuk handling 404

// ✅ Fungsi untuk mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => {
  return usersData.find((user) => user.id === authorId) || null;
};

const PostPage = () => {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [mostReadArticles, setMostReadArticles] = useState([]);

  useEffect(() => {
    if (!params?.id || !params?.slug) return;

    // ✅ Cari artikel berdasarkan ID & Slug
    const foundArticle = newsData.find(
      (news) => news.id.toString() === params.id && news.slug === params.slug
    );

    if (!foundArticle) {
      notFound(); // Jika tidak ditemukan, redirect ke halaman 404
    }

    setArticle(foundArticle);

    // ✅ Ambil berita terkait (berdasarkan kategori yang sama)
    const related = newsData
      .filter(
        (news) =>
          news.id !== foundArticle.id &&
          news.category.some((cat) => foundArticle.category.includes(cat))
      )
      .slice(0, 4); // Ambil 4 berita terkait

    setRelatedArticles(related);

    // ✅ Ambil berita paling banyak dibaca
    const mostRead = [...newsData]
      .filter((news) => news.id !== foundArticle.id && news.views)
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    setMostReadArticles(mostRead);
  }, [params?.id, params?.slug]);

  if (!article) {
    return <h1 className="text-center text-red-600">Artikel tidak ditemukan...</h1>;
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto py-10">
      {/* Iklan Atas */}
      {/* <Adv /> */}

      <div className="flex flex-col lg:flex-row gap-10">
        {/* **Left Section - Article Content** */}
        <div className="lg:w-[70%] w-full border-gray-300 lg:pr-10">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{article.title}</h1>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {/* ✅ Render Author */}
            {article.authorId && getAuthorById(article.authorId)?.photo && (
              <Image
                src={getAuthorById(article.authorId).photo}
                alt={getAuthorById(article.authorId).name}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <span>{getAuthorById(article.authorId)?.name || "Unknown"}</span>
            <span className="w-[1px] h-4 bg-gray-300"></span>
            <span>{new Date(article.date).toLocaleDateString()}</span>
          </div>

          {/* ✅ Gambar Artikel */}
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden mt-4">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* ✅ Isi Konten */}
          <div
            className="mt-4 text-md leading-relaxed text-gray-800"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* ✅ Share & Follow Section */}
          {/* <Share /> */}
          {/* <Follow /> */}
        </div>

        {/* **Right Sidebar - Most Read & Related News** */}
        {/* <div className="lg:w-[30%]">
          <MostRead articles={mostReadArticles} />
        </div> */}
      </div>

      {/* ✅ Iklan Bawah */}
      {/* <Adv /> */}

      {/* ✅ Berita Terkait */}
      {/* <RelatedNews relatedArticles={relatedArticles} /> */}
    </div>
  );
};

export default PostPage;
