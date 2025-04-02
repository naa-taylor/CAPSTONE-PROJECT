"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Address() {
  const router = useRouter();

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    // Check if fields are filled
    if (!street || !city || !zip) {
      setError("Please fill in all the fields before continuing.");
      return;
    }

    setError(""); // Clear error if all fields are valid

    const query = new URLSearchParams({
      street,
      city,
      zip,
    }).toString();

    router.push(`/onboarding/confirm-address?${query}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Enter Your Address</h2>
        <p className="text-gray-500 text-center">Where can clients find you?</p>

        <input
          type="text"
          placeholder="Street Address"
          className="w-full p-3 border rounded-lg mt-4"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          className="w-full p-3 border rounded-lg mt-4"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Zip Code"
          className="w-full p-3 border rounded-lg mt-4"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />

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
