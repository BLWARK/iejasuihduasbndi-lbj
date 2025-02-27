import React from "react";
import MainHeadline from "@/components/page-components/headline/mainHeadline/MainHeadline";
import SideHeadline from "@/components/page-components/headline/sideHeadline/SideHeadline";
import Ads from "@/components/page-components/adv-sect/AdvBottomHead"
import BottomHeadline from "@/components/page-components/headline/bottomHeadline/BottomHeadline";
import newsData from "@/data/news";

const Headline = () => {
  // Filter berita dengan type "headline"
  const headlineNews = newsData.filter((news) => news.type === "headline");

  if (headlineNews.length < 6) {
    return <p className="text-center py-10">Belum ada cukup berita headline.</p>;
  }

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 py-4 gap-2">
        <MainHeadline mainNews={headlineNews[0]} />
        <SideHeadline sideNews={headlineNews.slice(1, 3)} />
      </div>
      <BottomHeadline bottomNews={headlineNews.slice(3, 7)} />
      <div className="py-5">
      <Ads/>
      </div>
    </div>
  );
};

export default Headline;
