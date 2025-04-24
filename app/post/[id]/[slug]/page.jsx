"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import newsData from "@/data/news";
import usersData from "@/data/users";
import RelatedNews from "@/components/RelatedNews";
import MostRead from "@/components/MostRead";
import Share from "@/components/share/Share";
import Follow from "@/components/follow/Follow";
import { FaPlay, FaPause } from "react-icons/fa";
import Adv from "@/components/page-components/adv-sect/AdvTopHeader"
import { notFound } from "next/navigation"; // Untuk handling 404
import Tracking from "@/components/Tracking";

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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechRef = useRef(null);
  

  useEffect(() => {
    if (!params?.id || !params?.slug) return;

    // ✅ Cari article berdasarkan ID & Slug
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

  // ✅ Fungsi untuk mengaktifkan & menonaktifkan Text-to-Speech
  const toggleSpeech = () => {
    if (!window.speechSynthesis) {
      alert("Browser Anda tidak mendukung Text-to-Speech!");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textContent = article.content.replace(/<\/?[^>]+(>|$)/g, ""); // Hapus tag HTML
      const utterance = new SpeechSynthesisUtterance(textContent);
      utterance.lang = "id-ID"; // Bahasa Indonesia
      utterance.rate = 1; // Kecepatan normal

      speechRef.current = utterance;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // ✅ Hentikan TTS saat pindah halaman / refresh
  useEffect(() => {
    const stopSpeech = () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    };

    // Stop speech jika user berpindah halaman
    return () => {
      stopSpeech();
    };
  }, [router.asPath]); // Dipanggil setiap kali URL berubah

  useEffect(() => {
    // ✅ Jalankan script Twitter hanya jika ada embed dalam konten
    if (article?.content.includes("twitter-tweet")) {
      if (window.twttr) {
        window.twttr.widgets.load();
      } else {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        document.body.appendChild(script);
      }
    }
  }, [article])

  if (!article) {
    return <h1 className="text-center text-red-600">Article not found...</h1>;
  }

  return (
    <div className="w-full 2xl:flex-col xl:flex-col lg:flex-col flex-row 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1000px] mx-auto py-6 2xl:px-0 xl:px-0 lg:px-0 px-3">
      <Tracking/>
      {/* Iklan Atas */}
      
      <div className="flex flex-col 2xl:flex-row xl:flex-row lg:flex-row gap-10">
        {/* **Left Section - Article Content** */}
        <div className="lg:w-[75%] w-full lg:pr-10 2xl:border-r xl:border-r lg:border-r border-gray-300">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {article.title}
          </h1>

          {/* ✅ Flex Row untuk Tombol Play & Author Info */}
          <div className="flex flex-col items-start justify-start gap-4">
           

            {/* ✅ Render Author Info */}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
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
             {/* ✅ Tombol Play / Pause Text-to-Speech */}
             <button
              onClick={toggleSpeech}
              className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition ${
                isSpeaking
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isSpeaking ? (
                <>
                  <FaPause className="text-xl" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <FaPlay className="text-xl" />
                  <span>Play</span>
                </>
              )}
            </button>
          </div>

          {/* ✅ Gambar Article */}
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
          

          {/* ✅ SECTION TAGS */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-6 border border-gray-300 rounded-lg p-4 py-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Tags:</h3>
              <div className="flex flex-wrap gap-4">
                {article.tags.map((tag, index) => (
                  <Link key={index} href={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`} passHref>
                    <span className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition rounded-full cursor-pointer ">
                      #{tag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ✅ Share & Follow Section */}
          <Share />
          <Follow />
          
        </div>
          
        {/* **Right Sidebar - Most Read & Related News** */}
        <div className="lg:w-[25%]">
          
          <MostRead mostReadArticles={mostReadArticles} />
        </div>
      </div>
      <div className="mt-10">
      <Adv />
      </div>
      {/* ✅ Berita Terkait */}
      <RelatedNews relatedArticles={relatedArticles} />
    </div>
  );
};

export default PostPage;
