import React from "react";
import CategoryHukrim from "@/components/page-components/categoriesNews/categoryHukrim/CategoryHukrim";
import CategoryPolitik from "@/components/page-components/categoriesNews/categoryPolitik/CategoryPolitik";
import CategoryKhasanah from "@/components/page-components/categoriesNews/categoryKhasanah/CategoryKhasanah";

const CategoriesNews = () => {
  return (
    <div className="w-full flex 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-6">
      {/* Layout 3 Kolom Horizontal */}
      <div className="grid grid-cols-1 md:grid-cols-3 2xl:gap-12 xl:gap-12 lg:gap-12 gap-10">
        <CategoryHukrim />
        <CategoryPolitik />
        <CategoryKhasanah />
      </div>
    </div>
  );
};

export default CategoriesNews;
