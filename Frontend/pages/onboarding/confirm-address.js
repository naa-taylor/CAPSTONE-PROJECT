"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ConfirmAddress() {
  const router = useRouter();

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setProvince] = useState("");
  const [error, setError] = useState("");

  // 🧠 Load initial address data from localStorage (set in address.js)
  useEffect(() => {
    const savedAddress = JSON.parse(localStorage.getItem("business_address"));
    if (savedAddress) {
      setStreet(savedAddress.street || "");
      setCity(savedAddress.city || "");
      setPostalCode(savedAddress.postalCode || "");
      setProvince(savedAddress.province || "");
    }
  }, []);

  const handleConfirm = () => {
    if (!street || !city || !postalCode || !province) {
      setError("Please fill in all fields before continuing.");
      return;
    }

    // 📝 Update localStorage with confirmed/edited values
    const existingData = JSON.parse(localStorage.getItem("business_address")) || {};
    localStorage.setItem("business_address", JSON.stringify({
      ...existingData,
      street,
      city,
      postalCode,
      province,
    }));

    setError("");

    // 🔁 Check what path to go next
    const workType = localStorage.getItem("business_work_type");

    if (workType === "both") {
      router.push("/onboarding/travel-fee");
    } else {
      // either physical only OR fallback
      router.push("/onboarding/subscribe");
    }
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
  placeholder="Postal Code"
  value={postalCode}
  onChange={(e) => setPostalCode(e.target.value)} // ✅
  className="w-full p-3 border rounded-lg mt-2"
/>
<input
  type="text"
  placeholder="Province"
  value={province}
  onChange={(e) => setProvince(e.target.value)} // ✅
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
