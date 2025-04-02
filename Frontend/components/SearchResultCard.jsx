import React from "react";
import { useRouter } from "next/router";

// 🌍 Helper to calculate distance using Haversine Formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance.toFixed(1); // Return 1 decimal place
}

const SearchResultCard = ({ business, userCoords }) => {
  const router = useRouter();
  const image = business.images && business.images.length > 0 ? business.images[0] : null;

  const businessCoords = business.location?.coordinates?.coordinates || [];
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
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* 📷 Featured Image */}
      {image && (
        <img
          src={image}
          alt={`${business.businessName} Preview`}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}

      {/* 🏪 Business Name */}
      <h3 className="text-xl font-bold text-gray-900">
        {business.businessName}
      </h3>

      {/* 📍 Location */}
      <p className="text-gray-600">
        {business.location?.city}, {business.location?.province}
      </p>

      {/* 📏 Distance */}
      {distanceKm && (
        <p className="text-sm text-gray-500">~ {distanceKm} km from you</p>
      )}

      {/* 🔧 Services (short list) */}
      {business.services?.length > 0 && (
        <p className="mt-2 text-sm text-gray-700">
          <span className="font-semibold">Services:</span> {business.services.slice(0, 3).join(", ")}...
        </p>
      )}

      {/* ⭐ Rating + 💵 Price */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-yellow-500">⭐ {business.rating.toFixed(1)}</span>
        <span className="text-gray-500">{business.priceRange}</span>
      </div>

      {/* 🔗 View More Button */}
      <button
        className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        onClick={() => router.push(`/business/${business._id}`)}
      >
        View Business Profile
      </button>
    </div>
  );
};

export default SearchResultCard;