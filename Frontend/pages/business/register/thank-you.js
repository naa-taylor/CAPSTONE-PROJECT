'use client';

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-[#1D818A] to-[#421763]">
      <div className="bg-white shadow-2xl rounded-xl max-w-md w-full p-8 text-center space-y-5">
        <h1 className="text-3xl font-bold text-gray-800">🎉 Thank You!</h1>
        <p className="text-gray-700">Your business has been registered successfully.</p>
        <p className="text-gray-500">You’ll be redirected to your dashboard shortly...</p>
        <a
          href="/dashboard"
          className="inline-block mt-2 text-[#1D818A] font-medium underline hover:text-[#176a71] transition"
        >
          Go now
        </a>
      </div>
    </div>
  );
}
