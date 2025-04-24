// components/navigation/DropdownRegion.jsx
import React from "react";
import regionalData from "@/data/regionalData";
import Link from "next/link";

const DropdownRegion = ({ isVisible, onMouseEnter, onMouseLeave }) => {
  if (!isVisible) return null;

  return (
    <div
      className="absolute left-0 top-0 z-50 mt-2 bg-white shadow-lg border border-gray-200 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-[1000px]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {regionalData.map((region) => (
        <div key={region.pulau}>
          <h4 className="font-semibold text-red-600 mb-2">{region.pulau}</h4>
          <ul className="space-y-1">
            {region.cities.map((city) => (
              <li key={city}>
                <Link
                  href={`/regional/${city.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-gray-700 hover:text-red-600 transition"
                >
                  {city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DropdownRegion;
