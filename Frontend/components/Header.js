"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon, UserIcon, GlobeAltIcon, CalendarIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  return (
    <header className="bg-black text-white px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>
        ~booksy
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-white text-black px-3 py-2 rounded-lg w-96">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search services or businesses"
          className="ml-2 outline-none w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Location Input */}
      <div className="flex items-center bg-white text-black px-3 py-2 rounded-lg w-40">
        <GlobeAltIcon className="h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="Where?"
          className="ml-2 outline-none w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Date Input */}
      <div className="flex items-center bg-white text-black px-3 py-2 rounded-lg w-32">
        <CalendarIcon className="h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="When?"
          className="ml-2 outline-none w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Login / Signup */}
      <button
        onClick={() => router.push("/login")}
        className="flex items-center space-x-2 hover:opacity-80"
      >
        <UserIcon className="h-6 w-6" />
        <span>Log In / Sign Up</span>
      </button>

      {/* Country Selector */}
      <div className="flex items-center space-x-2">
        <span>🇨🇦</span>
        <span>CA</span>
      </div>

      {/* List Your Business */}
      <button
        onClick={() => router.push("/list-business")}
        className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200"
      >
        List your business
      </button>
    </header>
  );
};

export default Header;
