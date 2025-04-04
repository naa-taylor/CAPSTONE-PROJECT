import React from "react";
import { useRouter } from "next/router";

// 🌍 Helper to calculate distance using Haversine Formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
}

const SearchResultCard = ({ business, userCoords }) => {
  const router = useRouter();

  const businessCoords = business?.location?.coordinates?.coordinates || [];
  const hasCoords = userCoords && businessCoords.length === 2;

  const distanceKm = hasCoords
    ? getDistanceFromLatLonInKm(
        userCoords.latitude,
        userCoords.longitude,
        businessCoords[1], // lat
        businessCoords[0]  // lng
      )
    : null;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col justify-between">
      {/* ✅ Logo in place of dynamic image */}
      <div className="w-full h-36 flex items-center justify-center bg-gray-100 border-b mb-4">
        <img
          src="/images/Logo.png" // make sure it's inside public/images/
          alt="GlowGuide logo"
          className="h-14 object-contain"
        />
      </div>

      {/* 🏪 Business Name */}
      <h3 className="text-xl font-bold text-gray-900 mb-1">
        {business?.businessName || "Business Name"}
      </h3>

      {/* 📍 Location */}
      <p className="text-gray-600 mb-1">
        {business?.location?.city || "N/A"}, {business?.location?.province || ""}
      </p>

      {/* 📏 Distance */}
      {distanceKm && (
        <p className="text-sm text-gray-500 mb-1">~ {distanceKm} km from you</p>
      )}

      {/* 🔧 Services */}
      {business?.services?.length > 0 && (
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">Services:</span>{" "}
          {business.services.slice(0, 3).join(", ")}...
        </p>
      )}

      {/* ⭐ Rating + 💵 Price */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-yellow-500">⭐ {business?.rating?.toFixed(1) || "0.0"}</span>
        <span className="text-gray-500">{business?.priceRange || "$$"}</span>
      </div>

      {/* 🔗 View More Button */}
      <button
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        onClick={() => router.push(`/business/${business._id}`)}
      >
        View Business Profile
      </button>
    </div>
  );
};

export default SearchResultCard;
