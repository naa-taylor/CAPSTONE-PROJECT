import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center space-x-6 text-gray-400 text-sm">
          <a href="#" className="hover:text-white">Blog</a>
          <a href="/service/about" className="hover:text-white">About Us</a>
          <a href="" className="hover:text-white">FAQ</a>
          <a href="" className="hover:text-white">Privacy Policy</a>
          <a href="" className="hover:text-white">Terms of Service</a>
          <a href="" className="hover:text-white">Careers</a>
          <a href="" className="hover:text-white">GlowGuide Biz</a>
          <a href="" className="hover:text-white">Contact</a>
        </nav>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Branding */}
        <div className="flex items-center space-x-2">
          <Image src="/images/logo.png" alt="GlowGuide" width={100} height={40} />
          <p className="text-gray-400 text-sm">© 2025 GlowGuide. All rights reserved.</p>
        </div>

        
      </div>
    </footer>
  );
}
