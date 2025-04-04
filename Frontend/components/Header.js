import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <header className="flex justify-end items-center px-6 py-4 bg-transparent absolute top-0 left-0 w-full z-50">
      <nav className="flex space-x-6 text-white font-semibold">
        {/* Smooth scroll to "How it Works" */}
        <a href="/#how-it-works" className="hover:underline">
          How it Works
        </a>

        {/* About Page Link */}
        <Link href="/service/about" className="hover:underline">
          About
        </Link>

        {/* Login Button with teal gradient color */}
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
