"use client";

import Header from "../../components/Header";
import Footer from "../../components/footer";
import ImageGrid from "../../components/imagegrid";
import FeatureSection from "../../components/FeatureSection";
import HowItWorksSection from "../../components/HowItWorksSection";
import GradientParticles from "../../components/GradientParticles";
import { useState } from "react";
import { Button } from "@heroui/react";
import useGeoLocation from "../../hooks/useGeoLocation";
import { FaStar, FaUserCircle } from "react-icons/fa";

export default function Home() {
  const location = useGeoLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const serviceList = [
    "Haircut", "Blowout", "Hair Coloring", "Highlights", "Balayage", "Ombre",
    "Deep Conditioning", "Scalp Treatment", "Silk Press", "Keratin Treatment",
    "Perms", "Relaxer Treatment", "Men's Haircut", "Beard Trim", "Fade", "Line Up",
    "Men's Hair Styling", "Hair Extensions", "Tape-In Extensions", "Weave Install", "Wig Install",
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
    window.open(`/service/search-results?query=${encodeURIComponent(service)}`, "_self");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      window.open(`/service/search-results?query=${encodeURIComponent(searchTerm)}`, "_self");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[linear-gradient(90deg,_#1D818A_0%,_#421763_100%)] text-white relative overflow-hidden">
      <GradientParticles />
      <Header />

      {/* Hero */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-center pb-40 pt-28">
        <h1 className="text-white text-5xl md:text-6xl font-bold mt-10">Welcome to GlowGuide</h1>
        <p className="mt-2 text-lg md:text-xl text-gray-200">
          Discover and book top hair salon professionals near you.
        </p>

        {/* Search */}
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
            <div className="absolute w-full bg-white shadow-md rounded-lg mt-1 z-10 text-black">
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

        {/* CTA Button */}
        <div className="mt-6 flex gap-4">
          <a
            href="/service/grow-business"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#421763] text-white px-6 py-3 rounded-lg font-medium text-lg inline-flex items-center justify-center hover:bg-[#310F4E] transition"
          >
            List Your Business
          </a>
        </div>

        <div className="relative w-full mt-16 z-0">
          <ImageGrid />
        </div>
      </div>

      {/* Features - Now with text-white instead of text-black */}
      <div className="text-white">
        <FeatureSection />

        {/* How It Works Section */}
        <div id="how-it-works">
          <HowItWorksSection />
        </div>

        {/* Testimonials - Now with transparent background */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Users Say</h2>
            <p className="text-gray-200 text-lg">
              Hear from clients and professionals who love using GlowGuide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[{
              name: "Jessica Wilson",
              role: "Client • Toronto",
              quote: "I've been using GlowGuide for the past 6 months and it's completely transformed how I find new stylists. The booking process is seamless and I love being able to see portfolios before I book. Never had a bad experience!"
            }, {
              name: "Daniel Thompson",
              role: "Salon Owner • Oshawa",
              quote: "As a salon owner, GlowGuide has been a game-changer for my business. The platform makes it easy to showcase our work and has brought in so many new clients. The booking system integrates perfectly with our schedule."
            }, {
              name: "Angela Rivera",
              role: "Client • Mississauga",
              quote: "GlowGuide saved me so much time. I was able to find a great stylist in my area and book instantly. The reminders are super helpful, and everything is just smooth."
            }].map((user, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm shadow-xl rounded-2xl p-6 text-left">
                <div className="text-yellow-400 flex mb-2">
                  {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                </div>
                <p className="italic text-white mb-4">"{user.quote}"</p>
                <div className="flex items-center gap-3">
                  <FaUserCircle className="text-4xl text-gray-200" />
                  <div>
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="text-sm text-gray-200">{user.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
