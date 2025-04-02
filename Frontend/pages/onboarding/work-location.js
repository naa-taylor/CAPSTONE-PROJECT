"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WorkLocation() {
  const router = useRouter();

  const [atMyPlace, setAtMyPlace] = useState(false);
  const [atClientLocation, setAtClientLocation] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!atMyPlace && !atClientLocation) {
      setError("Please select at least one option.");
      return;
    }

    setError("");
    router.push("/onboarding/address");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Where do you work?</h2>
        <p className="text-gray-500 text-center mb-4">
          Do your clients come to you, do you go to them, or both?
        </p>

        <label className={`flex items-center space-x-3 p-3 border rounded-lg mt-2 cursor-pointer ${atMyPlace ? "bg-gray-200" : "bg-gray-100"}`}>
          <input
            type="checkbox"
            checked={atMyPlace}
            onChange={() => setAtMyPlace(!atMyPlace)}
          />
          <span>At my place</span>
        </label>

        <label className={`flex items-center space-x-3 p-3 border rounded-lg mt-2 cursor-pointer ${atClientLocation ? "bg-gray-200" : "bg-gray-100"}`}>
          <input
            type="checkbox"
            checked={atClientLocation}
            onChange={() => setAtClientLocation(!atClientLocation)}
          />
          <span>At the client's location</span>
        </label>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        <button
          onClick={handleContinue}
          className="w-full bg-black text-white py-2 rounded-lg mt-4"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
