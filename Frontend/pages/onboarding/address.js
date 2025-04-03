"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import useGeoLocation from "../../hooks/useGeoLocation";

export default function Address() {
  const router = useRouter();
  const location = useGeoLocation();

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setProvince] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!street || !city || !postalCode || !province) {
      setError("Please fill in all the fields before continuing.");
      return;
    }

    const geoCoords =
      location.loaded && !location.error
        ? location.coordinates
        : { lat: 43.9454, lng: -78.8965 }; // Default: Durham College

    // ✅ Save address info and geo-coordinates to localStorage
    localStorage.setItem(
      "business_address",
      JSON.stringify({
        street,
        city,
        postalCode: postalCode,
        province,
        coordinates: [geoCoords.lng, geoCoords.lat],
      })
    );

    setError("");

    // ✅ Always go to confirmation page after entering address
    router.push("/onboarding/confirm-address");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Enter Your Address</h2>
        <p className="text-gray-500 text-center">Where can clients find you?</p>

        <input
          type="text"
          placeholder="Street Address"
          className="w-full p-3 border rounded-lg mt-4"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          className="w-full p-3 border rounded-lg mt-4"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Postal Code"
          className="w-full p-3 border rounded-lg mt-4"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Province"
          className="w-full p-3 border rounded-lg mt-4"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        <button
          onClick={handleContinue}
          className="w-full bg-black text-white py-2 rounded-lg mt-4"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
