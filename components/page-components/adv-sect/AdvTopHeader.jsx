import React from 'react'
import Image from "next/image";

const AdvBottomHead = () => {
  return (
    <div className="bg-gray-100 w-full 2xl:h-[240px] xl:h-[240px]  lg:h-[230px] h-[100px]  rounded-lg overflow-hidden 2xl:mt-4 xl:mt-4 lg:mt-4 mt-0 relative">
    <Image src="/SALE.jpg" alt="Advertisement" fill  className="object-contain" priority={true} />
  </div>
  )
}

export default AdvBottomHead