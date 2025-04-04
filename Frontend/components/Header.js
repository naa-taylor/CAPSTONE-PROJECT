'use client';

import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[linear-gradient(90deg,_#1D818A_0%,_#421763_100%)] bg-opacity-90 backdrop-blur-md px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <a href="/" className="flex items-center">
        <Image
          src="/images/logo.png"
          alt="GlowGuide Logo"
          width={40}
          height={40}
          className="object-contain"
        />
      </a>

      {/* Nav Links */}
      <nav className="flex space-x-6 text-white font-semibold">
        {/* ✅ Scrolls smoothly without page reload */}
        <Link href="#how-it-works" scroll={false} className="hover:underline">
          How it Works
        </Link>

        <Link href="/service/about" className="hover:underline">
          About
        </Link>

        <Link href="/login">
          <button className="bg-[#1D818A] text-white text-sm px-3 py-1.5 rounded-md hover:bg-[#176a71] transition">
            Login
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
