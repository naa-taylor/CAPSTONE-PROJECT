'use client';

import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-3 bg-transparent absolute top-0 left-0 w-full z-50">
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
        {/* ✅ Scrolls without reloading */}
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
