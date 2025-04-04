import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // cleanup if unmounted
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-10 text-center space-y-4">
        <h1 className="text-2xl font-bold">🎉 Thank You!</h1>
        <p>Your business has been registered successfully.</p>
        <p className="text-gray-500">You’ll be redirected to your dashboard shortly...</p>
        <a href="/dashboard" className="text-blue-600 underline">Go now</a>
      </div>
    </div>
  );
}
