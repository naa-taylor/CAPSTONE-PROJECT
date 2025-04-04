'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";

// Service options list
const serviceOptions = [
  "Haircut", "Blowout", "Hair Coloring", "Highlights", "Balayage", "Ombre",
  "Deep Conditioning", "Scalp Treatment", "Silk Press", "Keratin Treatment",
  "Perms", "Relaxer Treatment", "Men's Haircut", "Beard Trim", "Fade",
  "Line Up", "Men’s Hair Styling", "Hair Extensions", "Tape-In Extensions",
  "Weave Install", "Wig Install", "Wig Customization", "Braiding", "Box Braids",
  "Knotless Braids", "Cornrows", "Faux Locs", "Locs Retwist", "Twist Out",
  "Curly Hair Styling"
].map(service => ({ label: service, value: service }));

export default function ServicesPage() {
  const router = useRouter();

  const [priceRange, setPriceRange] = useState("$$");
  const [selectedServices, setSelectedServices] = useState([]);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [searchTags, setSearchTags] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("businessData"));
    if (saved?.priceRange) setPriceRange(saved.priceRange);
    if (saved?.services) {
      setSelectedServices(saved.services.map(s => ({ label: s, value: s })));
    }
    if (saved?.availability) {
      setOpenTime(saved.availability.openTime || "");
      setCloseTime(saved.availability.closeTime || "");
    }
    if (saved?.searchTags) {
      setSearchTags(saved.searchTags.join(", "));
    }
  }, []);

  const handleNext = () => {
    const existing = JSON.parse(localStorage.getItem("businessData")) || {};
    const updated = {
      ...existing,
      priceRange,
      services: selectedServices.map(s => s.value),
      availability: {
        openTime,
        closeTime
      },
      searchTags: searchTags
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean)
    };
    localStorage.setItem("businessData", JSON.stringify(updated));
    router.push("/business/register/review");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-[#1D818A] to-[#421763]">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 space-y-5">
        <h1 className="text-2xl font-bold text-center text-gray-800">Services & Availability</h1>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Price Range</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D818A]"
          >
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Select Services</label>
          <Select
            isMulti
            options={serviceOptions}
            value={selectedServices}
            onChange={setSelectedServices}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1 mt-4">Open Time</label>
          <input
            type="time"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D818A]"
            value={openTime}
            onChange={(e) => setOpenTime(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Close Time</label>
          <input
            type="time"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D818A]"
            value={closeTime}
            onChange={(e) => setCloseTime(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Search Tags (comma-separated)</label>
          <input
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D818A]"
            value={searchTags}
            onChange={(e) => setSearchTags(e.target.value)}
            placeholder="e.g. Black hair, Braids, Oshawa"
          />
        </div>

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
