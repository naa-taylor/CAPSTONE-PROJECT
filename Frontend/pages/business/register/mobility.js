'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function MobilityPage() {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [mobileOnly, setMobileOnly] = useState(false);
  const [travelRadius, setTravelRadius] = useState(0);
  const [serviceAreas, setServiceAreas] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("businessData"));
    if (saved?.isMobile !== undefined) setIsMobile(saved.isMobile);
    if (saved?.mobileOnly !== undefined) setMobileOnly(saved.mobileOnly);
    if (saved?.travelRadius) setTravelRadius(saved.travelRadius);
    if (saved?.serviceAreas) setServiceAreas(saved.serviceAreas.join(", "));
  }, []);

  const handleNext = () => {
    const existing = JSON.parse(localStorage.getItem("businessData")) || {};
    const updated = {
      ...existing,
      isMobile,
      mobileOnly,
      travelRadius: isMobile ? parseInt(travelRadius) : 0,
      serviceAreas: isMobile ? serviceAreas.split(",").map((s) => s.trim()) : [],
    };
    localStorage.setItem("businessData", JSON.stringify(updated));
    router.push("/business/register/contact");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-[#1D818A] to-[#421763]">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 space-y-5">
        <h1 className="text-2xl font-bold text-center text-gray-800">Mobility Options</h1>

        <label className="flex items-center space-x-2 text-gray-700">
          <input
            type="checkbox"
            checked={isMobile}
            onChange={(e) => setIsMobile(e.target.checked)}
          />
          <span>This business offers mobile services</span>
        </label>

        {isMobile && (
          <>
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                checked={mobileOnly}
                onChange={(e) => setMobileOnly(e.target.checked)}
              />
              <span>This business is mobile only (no physical location)</span>
            </label>

            <div>
              <label className="block font-medium text-gray-700 mt-4 mb-1">Travel Radius (km)</label>
              <input
                type="number"
                min="0"
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D818A]"
                value={travelRadius}
                onChange={(e) => setTravelRadius(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mt-4 mb-1">Service Areas</label>
              <input
                placeholder="e.g. Oshawa, Ajax, Pickering"
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D818A]"
                value={serviceAreas}
                onChange={(e) => setServiceAreas(e.target.value)}
              />
            </div>
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
