"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ThankYou() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/onboarding/confirm-profile");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
        <h2 className="text-3xl font-bold text-green-600">🎉 Thank you!</h2>
        <p className="text-gray-700 mt-2">Your subscription was successful.</p>
        <p className="text-sm mt-4 text-gray-500">Redirecting to profile confirmation...</p>
      </div>
    </div>
  );
}
