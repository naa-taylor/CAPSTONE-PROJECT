"use client";

import Header from "../../components/Header";
import Footer from "../../components/footer";
import ImageGrid from "../../components/imagegrid";
import LoginCard from "../../components/LoginCard";
import FeatureSection from "../../components/FeatureSection";
import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import useGeoLocation from "../../hooks/useGeoLocation";

export default function Home() {
  const router = useRouter();
  const location = useGeoLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const serviceList = [
    "Haircut", "Blowout", "Hair Coloring", "Highlights", "Balayage", "Ombre",
      "Deep Conditioning", "Scalp Treatment", "Silk Press", "Keratin Treatment",
      "Perms", "Relaxer Treatment", "Men's Haircut", "Beard Trim", "Fade", "Line Up",
       "Men’s Hair Styling", "Hair Extensions", "Tape-In Extensions", "Weave Install", "Wig Install",
        "Wig Customization", "Braiding", "Box Braids", "Knotless Braids", "Cornrows", "Faux Locs",
          "Locs Retwist", "Twist Out", "Curly Hair Styling"
  ];

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 0) {
      const filtered = serviceList.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (service) => {
    setSearchTerm(service);
    setSuggestions([]);
    router.push(`/service/search-results?query=${encodeURIComponent(service)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      router.push(`/service/search-results?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="w-full">
      <Header />

      {/* Hero Section */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-center bg-black pb-40">
        <h1 className="text-white text-5xl md:text-6xl font-bold mt-10">
          Welcome to GlowGuide
        </h1>
        <p className="mt-2 text-lg md:text-xl text-gray-300">
          Discover and book top hair salon professionals near you.
        </p>

        {/* Search Bar */}
        <div className="mt-6 w-full max-w-md relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search hair salons"
              className="w-full p-4 pl-10 rounded-full border-none text-black"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <span className="absolute left-3 top-4 text-gray-400">🔍</span>
          </div>

          {suggestions.length > 0 && (
            <div className="absolute w-full bg-white shadow-md rounded-lg mt-1 z-10">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="p-3 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectSuggestion(s)}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <Button
            color="primary"
            size="lg"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            onPress={() => router.push("/service/login")}
          >
            Login
          </Button>
          <Button
            color="secondary"
            size="lg"
            className="bg-gray-700 text-white px-6 py-3 rounded-lg"
            onPress={() => router.push("/list-business")}
          >
            List Your Business
          </Button>
        </div>

        <div className="relative w-full mt-16 z-0">
          <ImageGrid />
        </div>
      </div>

      {/* Features */}
      <FeatureSection />

      {/* Login */}
      <LoginCard />

      <Footer />
    </div>
  );
}
