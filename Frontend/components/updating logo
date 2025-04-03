import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-black text-white p-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <Image 
          src="/images/logo.png"
          alt="GlowGuide Logo"
          width={60}
          height={60}
        />
      </div>

      {/* Login Button only */}
      <div>
        <button 
          onClick={() => router.push("/login")}
          className="bg-blue-500 px-6 py-2 rounded-lg text-white hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </header>
  );
}
