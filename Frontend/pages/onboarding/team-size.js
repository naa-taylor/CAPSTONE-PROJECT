"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TeamSize() {
  const router = useRouter();
  const [teamSize, setTeamSize] = useState("");

  const handleContinue = () => {
    if (teamSize) {
      router.push("/onboarding/business-hours"); // Move to next step
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">What’s Your Team Size?</h2>
        <p className="text-gray-500 text-center">Choose how many staff members work with you.</p>

        <div className="mt-4 space-y-2">
          {["Just me", "2-3 staff members", "4-6 staff members", "More than 6 staff members"].map((size) => (
            <button
              key={size}
              className={`w-full p-3 border rounded-lg ${teamSize === size ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
              onClick={() => setTeamSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!teamSize}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 disabled:bg-gray-400"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
