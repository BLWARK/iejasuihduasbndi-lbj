import React from 'react'
import { FaYoutube, FaTwitter, FaInstagram, FaRss } from "react-icons/fa";
import PwaButton from "@/components/InstallPWAButton"

const TopNavbar = () => {
    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(today);
  
  return (
    <div className="w-screen   bg-white text-gray-600 text-sm mx-auto  justify-center items-center 2xl:flex xl:flex lg:flex flex">
        <div className="container 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] flex justify-between items-center py-4 px-3">
          <div>
            <span>{formattedDate}</span>
          </div>
          <div className="flex space-x-4 justify-center items-center">
            <a href="#" className="hover:underline 2xl:block xl:block lg:block hidden">
              Advertise with us
            </a>
           
        
            {/* Social Media Icons */}
            <div className="flex space-x-2 ">
            <PwaButton/>
              {/* <FaYoutube className="hover:text-red-500 cursor-pointer" />
              <FaTwitter className="hover:text-blue-400 cursor-pointer" />
              <FaInstagram className="hover:text-pink-500 cursor-pointer" />
              <FaRss className="hover:text-yellow-500 cursor-pointer" /> */}
            </div>
          </div>
        </div>
      </div>
  )
}

export default TopNavbar