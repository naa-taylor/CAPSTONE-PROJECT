'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function ReviewPage() {
  const router = useRouter();
  const [businessData, setBusinessData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("businessData"));
    setBusinessData(saved);
  }, []);

  const handleSubmit = async () => {
    if (!businessData) return;
  
    if (!businessData.contact?.email || !businessData.password) {
      alert("Missing email or password. Please go back and fill in all fields.");
      return;
    }
  
    try {
      setIsSubmitting(true);
  
      const response = await axios.post("http://localhost:5000/api/businesses", businessData);
  
      // ✅ Save returned business to localStorage for dashboard use
      localStorage.setItem("business", JSON.stringify(response.data.business));
  
      alert("✅ Business registered successfully!");
      localStorage.removeItem("businessData");
      router.push("/business/register/thank-you");
    } catch (error) {
      console.error("❌ Error submitting data:", error);
  
      if (error.response?.data?.error === "Email already registered.") {
        alert("❌ That email is already in use. You’ll be redirected to re-enter it.");
        router.push("/business/register/start");
        return;
      } else {
        alert("There was an error submitting the form. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!businessData) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1D818A] to-[#421763] text-white text-lg font-medium">Loading business data...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-[#1D818A] to-[#421763]">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Review Your Business Info</h1>

        <div className="text-sm space-y-2 text-gray-700">
          <p><strong>Owner Name:</strong> {businessData.ownerName}</p>
          <p><strong>Business Name:</strong> {businessData.businessName}</p>
          <p><strong>Email:</strong> {businessData.contact?.email}</p>
          <p><strong>Phone:</strong> {businessData.contact?.phone}</p>
          {businessData.website && <p><strong>Website:</strong> {businessData.website}</p>}
          {businessData.instagram && <p><strong>Instagram:</strong> {businessData.instagram}</p>}
          {businessData.facebook && <p><strong>Facebook:</strong> {businessData.facebook}</p>}

          {businessData.location?.hasPhysicalLocation && (
            <>
              <p><strong>Address:</strong> {businessData.location.address}, {businessData.location.city}, {businessData.location.province}</p>
              <p><strong>Postal Code:</strong> {businessData.location.postalCode}</p>
              <p><strong>Coordinates:</strong> {businessData.location.coordinates?.coordinates.join(", ")}</p>
            </>
          )}

          {businessData.isMobile && (
            <>
              <p><strong>Mobile Only:</strong> {businessData.mobileOnly ? "Yes" : "No"}</p>
              <p><strong>Travel Radius:</strong> {businessData.travelRadius} km</p>
              <p><strong>Service Areas:</strong> {businessData.serviceAreas?.join(", ")}</p>
            </>
          )}

          <p><strong>Price Range:</strong> {businessData.priceRange}</p>
          <p><strong>Services:</strong> {businessData.services?.join(", ")}</p>
          <p><strong>Hours:</strong> {businessData.availability?.openTime} - {businessData.availability?.closeTime}</p>
          <p><strong>Search Tags:</strong> {businessData.searchTags?.join(", ")}</p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-3 rounded-md font-semibold text-white transition ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1D818A] hover:bg-[#176a71]'
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit to Register"}
        </button>
      </div>
    </div>
  );
}
