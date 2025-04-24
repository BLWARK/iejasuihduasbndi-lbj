"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Gunakan router untuk navigasi
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import newsData from "@/data/news";
import DropdownMenu from "@/components/navigation/DropDownMenu";
import PwaButton from "@/components/InstallPWAButton";
import regionalData from "@/data/regionalData";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null); // State untuk delay
  const [mobileRegionOpen, setMobileRegionOpen] = useState(false);
  const [openPulau, setOpenPulau] = useState(null); // Nama pulau yang dibuka

  const router = useRouter(); // ✅ Router untuk navigasi

  // Toggle menu mobile
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filteredNews = newsData.filter((news) =>
        news.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredNews.slice(0, 5)); // Tampilkan max 5 hasil
    } else {
      setSearchResults([]);
    }
  };

  // Fungsi Menampilkan Dropdown dengan Delay
  const handleMouseEnter = (category) => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setHoveredCategory(category);
  };

  // Fungsi Menghilangkan Dropdown dengan Delay
  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredCategory(null);
    }, 30); // Delay 300ms agar tidak langsung hilang
    setDropdownTimeout(timeout);
  };

  const handleSelectArticle = (article) => {
    setSearchQuery("");
    setSearchResults([]);
    router.push(`/post/${article.id}/${article.slug}`);
  };

  return (
    <div className="w-full max-w-[1200px] 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1000px] bg-gray-100">
      {/* Main Navbar */}
      <div className="bg-gray-100">
        <div className="container mx-auto 2xl:py-6 xl:py-6 lg:py-6 flex justify-between items-center px-2">
          {/* Logo - Desktop */}
          <a href="/" className="hidden md:block relative w-[70px] h-[70px]">
            <Image
              src="/Final Logo LBJ.png"
              alt="LBJ LOGO"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: "contain" }}
            />
          </a>

          {/* Search Bar */}
          <div className="relative 2xl:w-[800px] xl:w-[800px] lg:w-[600px] hidden md:flex items-center border border-gray-300 rounded-lg px-3 py-4">
            <FiSearch className="text-black text-xl" />
            <input
              type="text"
              placeholder="Cari berita..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-2 text-sm bg-transparent outline-none text-black"
            />
            {/* Hasil Pencarian */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md mt-2 z-50">
                {searchResults.slice(0, 5).map((news) => (
                  <div
                    key={news.id}
                    onClick={() => handleSelectArticle(news)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-200 cursor-pointer transition"
                  >
                    <Image
                      src={news.image}
                      alt={news.title}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800">
                        {news.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(news.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Join WhatsApp Button */}
          <a
            href="#"
            className="hidden md:flex items-center space-x-2 text-green-600 font-semibold hover:underline"
          >
            <FaWhatsapp className="text-2xl" />
            <span>Join WhatsApp Channel</span>
          </a>
        </div>

        {/* Mobile Navbar */}
        <div className="bg-red-600 md:hidden flex items-center justify-end gap-4 px-4 py-4">
          <div className="flex items-center w-full gap-4 justify-start">
            <button
              title="Hamburger Toggle"
              aria-label="Hamburger"
              onClick={toggleMenu}
              className="text-white text-2xl"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>

            <a href="/" className="relative w-10 h-10">
              <Image
                src="/LBJ white.png"
                alt="XYZONE Logo Mobile"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: "contain" }}
              />
            </a>
          </div>
          {/* Search Bar */}
          <div className="relative w-full max-w-[200px] flex md:flex  2xl:hidden xl:hidden lg:hidden ">
            <form className="flex items-center w-full bg-white border border-gray-300 rounded-lg px-2 py-2 shadow-sm">
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-2 text-sm bg-transparent outline-none text-black"
              />
            </form>
            {/* Hasil Pencarian */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md mt-2 z-50">
                {searchResults.map((news) => (
                  <Link
                    key={news.id}
                    href={`/post/${news.id}/${news.slug}`}
                    className="block px-4 py-2 hover:bg-gray-100 text-sm text-black"
                  >
                    {news.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden  bg-gray-100 p-4 space-y-4 text-gray-700">
            <button
              onClick={() => setMobileRegionOpen(!mobileRegionOpen)}
              className="flex justify-start gap-2 items-center w-full text-left text-black hover:underline"
            >
              <span>Regional</span>
              {mobileRegionOpen ? (
                <FiChevronUp className="text-lg" />
              ) : (
                <FiChevronDown className="text-lg" />
              )}
            </button>

            {mobileRegionOpen && (
              <div className="pl-4 space-y-2">
                {regionalData.map((region) => (
                  <div key={region.pulau}>
                    <button
                      onClick={() =>
                        setOpenPulau(
                          openPulau === region.pulau ? null : region.pulau
                        )
                      }
                      className="text-sm font-semibold text-red-600 flex items-center justify-between w-full"
                    >
                      {region.pulau}
                      {openPulau === region.pulau ? (
                        <FiChevronUp className="ml-2" />
                      ) : (
                        <FiChevronDown className="ml-2" />
                      )}
                    </button>

                    {openPulau === region.pulau && (
                      <ul className="pl-4 mt-1 space-y-1">
                        {region.cities.map((city) => (
                          <li key={city}>
                            <Link
                              href={`/regional/${city
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              onClick={() => setMobileMenuOpen(false)} // Tutup menu setelah klik
                              className="text-sm text-gray-700 hover:underline"
                            >
                              {city}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            <a href="/hukrim" className="block hover:underline">
              Hukum & Kriminal
            </a>
            <a href="/politik" className="block hover:underline">
              Politik
            </a>
            <a href="/lalu-lintas" className="block hover:underline">
              Lalu Lintas
            </a>
            <a href="/khasanah" className="block hover:underline">
              Khasanah
            </a>
            <a href="/indeks" className="block hover:underline">
              Indeks
            </a>
            <PwaButton />
          </nav>
        )}

        {/* Menu Navigation */}
        <nav className="bg-gray-100 w-full mt-2 relative 2xl:block hidden">
          <div className="2xl:max-w-[1400px] xl:max-w-[1200px] lg:max-w-[1000px] flex justify-start items-center space-x-4 py-6 border-b border-red-600 border-t-4 overflow-x-auto">
            {/* Menu Regional dengan Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setHoveredCategory("regional")}
              onMouseLeave={handleMouseLeave}
            >
              <span className="flex items-center gap-1 text-black whitespace-nowrap hover:underline px-4 border-r border-r-gray-300 pr-10 cursor-pointer">
                Regional{" "}
                <FiChevronDown className="text-sm mt-[1px] group-hover:rotate-180 transition-transform duration-200" />
              </span>
            </div>

            {[
              {
                name: "Hukum & Kriminal",
                path: "/hukrim",
                category: "hukum & kriminal",
              },
              { name: "Politik", path: "/politik", category: "politik" },
              {
                name: "Lalu Lintas",
                path: "/lalu-lintas",
                category: "lalu lintas",
              },
              { name: "Khasanah", path: "/khasanah", category: "khasanah" },
              { name: "Indeks", path: "/indeks" },
            ].map((menu) => (
              <div
                key={menu.name}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(menu.category)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={menu.path}
                  className="text-black whitespace-nowrap hover:underline px-4 border-r border-r-gray-300 pr-10"
                >
                  {menu.name}
                </a>
              </div>
            ))}

            <a
              href="https://www.youtube.com/@XYZoneTV"
              target="blank"
              className="hidden md:block relative w-28 h-10"
            >
              <Image
                src="/Logo XYZone-Solid.png"
                alt="XYZONETV"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: "contain" }}
              />
            </a>
          </div>
        </nav>
      </div>

      {/* Dropdown Menu */}
      {hoveredCategory && (
        <DropdownMenu
          category={hoveredCategory}
          isVisible={hoveredCategory !== null}
          onMouseEnter={() => handleMouseEnter(hoveredCategory)}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </div>
  );
};

export default Navbar;
