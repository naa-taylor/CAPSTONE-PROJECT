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
  
    // Ensure email and password are present
    if (!businessData.contact?.email || !businessData.password) {
      alert("Missing email or password. Please go back and fill in all fields.");
      return;
    }
  
    try {
      setIsSubmitting(true);
  
      const response = await axios.post("http://localhost:5000/api/businesses", businessData);
  
      alert("✅ Business registered successfully!");
      localStorage.removeItem("businessData");
      router.push("/business/register/thank-you");
    } catch (error) {
      console.error("❌ Error submitting data:", error);
  
      if (error.response?.data?.error === "Email already registered.") {
        alert("❌ That email is already in use. You’ll be redirected to re-enter it.");
        router.push("/business/register/start"); // 🔁 Send them back to fix it
        return;
      } else {
        alert("There was an error submitting the form. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!businessData) {
    return <p className="text-center p-6">Loading business data...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white shadow-md rounded-xl w-full max-w-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Review Your Business Info</h1>

        <div className="text-sm space-y-2">
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
          className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700"
        >
          {isSubmitting ? "Submitting..." : "Submit to Register"}
        </button>
      </div>
    </div>
  );
}
