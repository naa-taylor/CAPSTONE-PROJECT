'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function OwnerInfoPage() {
  const router = useRouter();

  const [ownerName, setOwnerName] = useState("");
  const [businessName, setBusinessName] = useState("");

  // Load existing values if returning to this step
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("businessData"));
    if (saved) {
      setOwnerName(saved.ownerName || "");
      setBusinessName(saved.businessName || "");
    }
  }, []);

  const handleNext = () => {
    const existing = JSON.parse(localStorage.getItem("businessData")) || {};
    const updated = {
      ...existing,
      ownerName,
      businessName,
    };
    localStorage.setItem("businessData", JSON.stringify(updated));
    router.push("/business/register/location");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1D818A] to-[#421763] px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 space-y-5">
        <h1 className="text-2xl font-bold text-center text-gray-800">Business Owner Info</h1>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Owner Name</label>
          <input
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D818A]"
            placeholder="e.g. Jane Doe"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Business Name</label>
          <input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D818A]"
            placeholder="e.g. Crown & Glory Studio"
            required
          />
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-[#1D818A] text-white py-3 rounded-md font-semibold hover:bg-[#176a71] transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
