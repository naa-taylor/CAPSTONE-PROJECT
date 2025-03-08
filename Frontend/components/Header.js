import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-black text-white p-4 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center">
        <Image 
          src="/images/b4ea91405ecd919fa4dfedbe1303ecce-removebg-preview.png" // Update with your actual logo filename
          alt="GlowGuide Logo"
          width={60}  // Make it smaller
          height={60} // Keep proportions
        />
      </div>

      {/* Right Section (Login & Dropdown) */}
      <div className="flex items-center space-x-6">
        {/* Login / Account */}
        <button 
          onClick={() => session ? signOut() : signIn()} 
          className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-700"
        >
          {session ? "Account" : "Log In / Sign Up"}
        </button>

        {/* Dropdown Menu */}
        <div className="relative">
          <button className="bg-white text-black px-4 py-2 rounded-lg">▼</button>
          {/* Dropdown Content (Optional) */}
        </div>
      </div>
    </header>
  );
}
