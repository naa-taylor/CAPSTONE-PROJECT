'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ContactPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("businessData"));
    if (saved?.contact?.phone) setPhone(saved.contact.phone);
    if (saved?.website) setWebsite(saved.website);
    if (saved?.instagram) setInstagram(saved.instagram);
    if (saved?.facebook) setFacebook(saved.facebook);
  }, []);

  const handleNext = () => {
    if (!phone.trim()) {
      alert("Phone number is required.");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("businessData")) || {};

    const updated = {
      ...existing,
      contact: {
        ...(existing.contact || {}),
        phone,
      },
      website: website || "",
      instagram: instagram || "",
      facebook: facebook || "",
    };

    localStorage.setItem("businessData", JSON.stringify(updated));
    router.push("/business/register/services");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-[#1D818A] to-[#421763]">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 space-y-5">
        <h1 className="text-2xl font-bold text-center text-gray-800">Contact Information</h1>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Phone Number *</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D818A]"
            placeholder="e.g. 647-123-4567"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Website (optional)</label>
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D818A]"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Instagram (optional)</label>
          <input
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D818A]"
            placeholder="https://instagram.com/yourbusiness"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Facebook (optional)</label>
          <input
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D818A]"
            placeholder="https://facebook.com/yourbusiness"
          />
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-[#421763] text-white py-3 rounded-md hover:bg-[#310F4E] transition font-semibold"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
