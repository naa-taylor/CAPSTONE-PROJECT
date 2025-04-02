"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TravelFee() {
  const router = useRouter();
  const [fee, setFee] = useState("");
  const [distance, setDistance] = useState("");

  const handleNext = () => {
    if (!distance) {
      alert("Please enter a maximum travel distance.");
      return;
    }

    // You can save the data here before navigating
    router.push("/onboarding/subscribe");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">What is your travel fee?</h2>
        <p className="text-gray-500 text-center mb-4">Add your minimum travel fee.</p>

        <input
          type="number"
          placeholder="Travel Fee ($)"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="number"
          placeholder="Max Distance (mi)"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <button
          onClick={handleNext}
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
