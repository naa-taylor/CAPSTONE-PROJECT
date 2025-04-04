'use client';

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/service"); // Redirect to /service after 2 seconds
    }, 2000); // Adjust delay if needed

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#1D818A] to-[#421763] text-white">
      <h1 className="text-[48px] md:text-[64px] font-bold rotate text-aquamarine">
        GlowGuide
      </h1>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

        .rotate {
          font-family: 'Lobster', cursive;
          animation: spin 4s linear infinite;
          filter: blur(1.2px) contrast(3);
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
