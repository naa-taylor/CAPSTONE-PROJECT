"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ThankYou() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard"); // Route to dashboard after 3 sec
    }, 3000);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-600">Thank you!</h2>
        <p className="text-gray-600 mt-2">Your subscription was successful.</p>
        <p className="text-sm mt-4 text-gray-500">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
