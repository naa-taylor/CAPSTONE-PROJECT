'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function LocationPage() {
  const router = useRouter();

  const [hasPhysicalLocation, setHasPhysicalLocation] = useState(true);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [coordinates, setCoordinates] = useState([-78.8966, 43.9447]); // Oshawa

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("businessData"));
    if (saved?.location) {
      setHasPhysicalLocation(saved.location.hasPhysicalLocation ?? true);
      setAddress(saved.location.address || "");
      setCity(saved.location.city || "");
      setProvince(saved.location.province || "");
      setPostalCode(saved.location.postalCode || "");
      setCoordinates(saved.location.coordinates?.coordinates || coordinates);
    }
  }, []);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.longitude, pos.coords.latitude];
          setCoordinates(coords);
        },
        (err) => {
          alert("Geolocation failed. Please allow location access.");
          console.error(err);
        }
      );
    } else {
      alert("Geolocation not supported by your browser.");
    }
  };

  const handleNext = () => {
    const existing = JSON.parse(localStorage.getItem("businessData")) || {};
    const updated = {
      ...existing,
      location: {
        hasPhysicalLocation,
        address,
        city,
        province,
        postalCode,
        coordinates: {
          type: "Point",
          coordinates,
        },
      },
    };
    localStorage.setItem("businessData", JSON.stringify(updated));
    router.push("/business/register/mobility");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-[#1D818A] to-[#421763]">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 space-y-5">
        <h1 className="text-2xl font-bold text-center text-gray-800">Business Location</h1>

        <label className="flex items-center space-x-2 text-gray-700">
          <input
            type="checkbox"
            checked={hasPhysicalLocation}
            onChange={(e) => setHasPhysicalLocation(e.target.checked)}
          />
          <span>This business has a physical location</span>
        </label>

        {hasPhysicalLocation && (
          <>
            <input
              placeholder="Street Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D818A]"
              required
            />
            <input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D818A]"
              required
            />
            <input
              placeholder="Province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D818A]"
              required
            />
            <input
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D818A]"
            />

            <button
              type="button"
              className="w-full bg-[#1D818A] text-white py-3 rounded-md hover:bg-[#176a71] transition font-semibold"
              onClick={handleGetLocation}
            >
              📍 Use My Location
            </button>

            <p className="text-sm text-gray-500">
              Coordinates saved:<br />
              Longitude: {coordinates[0]}, Latitude: {coordinates[1]}
            </p>
          </>
        )}

        <button
          onClick={handleNext}
          className="w-full bg-[#421763] text-white py-3 rounded-md hover:bg-[#310F4E] transition font-semibold"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
