import React from "react";
import Headline from "@/components/page-components/headline/Headline";
import LatestNewsLeft from "../components/page-components/latestnewsLeft/LatestNewsLeft";
import SideContent1 from "@/components/page-components/sideContent1/SideContent1"
import PopularNews from "@/components/page-components/popularNews/PopularNews"
import Ads from "@/components/page-components/adv-sect/AdvTopHeader"
import AnnouncementNews from "@/components/page-components/announcementNews/AnnouncementNews"
import CategoryNews from "@/components/page-components/categoriesNews/CategoriesNews";
import Corner from "@/components/page-components/corner/Corner"


const HomePage = () => {
  return (
    <div className="w-full h-full text-black">
       {/* Announcement News */}
       <section className="announcement-news">
        <AnnouncementNews />
      </section>
      {/* Headline Section */}
      <section className="headline 2xl:px-0 px-3">
        <Headline />
      </section>

      {/* Layout Terbagi 2: Kiri untuk berita, kanan untuk pilihan editor */}
      <section className="w-full 2xl:flex xl:flex lg:flex flex-row  2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-6 ">
        {/* Bagian Kiri - Bisa Ditambahkan Komponen Baru */}
        <div className="2xl:w-[75%] w-full flex flex-col gap-6 px-2">
          <LatestNewsLeft />
          <div className="2xl:hidden xl:hidden lg:hidden block">
          <SideContent1/>
          </div>
          <div className="2xl:pr-4 pr-0">
          <Ads/>
          </div>
          <PopularNews/>
          <div className="pr-4 -mt-3">
          <Ads/>
          </div>
         
          {/* Tambahkan Komponen Baru di Sini Jika Perlu */}
        </div>

        {/* Bagian Kanan - Tetap untuk Pilihan Editor */}
        <div className="w-[25%] 2xl:block hidden">
          <SideContent1 />
        </div>
      </section>
      <section className="2xl:px-0 px-3"><CategoryNews/></section>
      <section className="px-0"><Corner/></section>
    </div>
  );
};

export default HomePage;
