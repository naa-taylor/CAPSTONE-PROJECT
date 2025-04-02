"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ConfirmAddress() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract values from URL query parameters
  const initialStreet = searchParams.get("street") || "";
  const initialCity = searchParams.get("city") || "";
  const initialZip = searchParams.get("zip") || "";

  // Use as default state values
  const [street, setStreet] = useState(initialStreet);
  const [city, setCity] = useState(initialCity);
  const [zip, setZip] = useState(initialZip);
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (!street || !city || !zip) {
      setError("Please fill in all fields before continuing.");
      return;
    }
    setError("");
    router.push("/onboarding/travel-fee");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Confirm Your Address</h2>
        <p className="text-gray-500 text-center mb-4">
          Please confirm your business address before proceeding.
        </p>

        <input
          type="text"
          placeholder="Street Address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="w-full p-3 border rounded-lg mt-2"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 border rounded-lg mt-2"
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="w-full p-3 border rounded-lg mt-2"
        />

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

        <button
          onClick={handleConfirm}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
        >
          Confirm Address & Continue
        </button>
      </div>
    </div>
  );
}
