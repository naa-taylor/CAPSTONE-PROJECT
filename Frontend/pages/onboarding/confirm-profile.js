"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmBusinessProfile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const collectedData = {
      owner: JSON.parse(localStorage.getItem("business_owner")),
      workType: localStorage.getItem("business_work_type"),
      address: JSON.parse(localStorage.getItem("business_address")),
      availability: JSON.parse(localStorage.getItem("business_availability")),
      services: JSON.parse(localStorage.getItem("business_services")),
      travel: JSON.parse(localStorage.getItem("business_travel")),
      subscription: JSON.parse(localStorage.getItem("business_subscription")),
    };

    setProfileData(collectedData);
  }, []);

  const handleSubmit = async () => {
    try {
      console.log("🧾 Raw profileData:", profileData);
  
      const {
        owner = {},
        workType = "",
        address = null,
        travel = null,
        availability = {},
        services = [],
        subscription = {}
      } = profileData ?? {};
  
      const firstName = owner?.firstName ?? "";
      const lastName = owner?.lastName ?? "";
      const ownerName = `${firstName} ${lastName}`.trim();
      const isMobile = workType === "mobile" || workType === "both";
      const hasPhysicalLocation = workType === "physical" || workType === "both";
  
      // ✅ Basic checks
      if (!ownerName) return alert("Missing owner name.");
      if (!owner?.email || !owner?.phone) return alert("Missing owner contact info.");
      if (!workType) return alert("Missing work type.");
  
      // ✅ Conditionally construct location only if needed
      let location;
      if (hasPhysicalLocation) {
        if (!address?.province || !address?.city) {
          return alert("Missing required address fields.");
        }
  
        location = {
          hasPhysicalLocation,
          address: address.street ?? "",
          city: address.city ?? "Unknown",
          province: address.province ?? "",
          postalCode: address.postalCode ?? "",
          coordinates: {
            type: "Point",
            coordinates: address.coordinates ?? [-78.8658, 43.8971]
          }
        };
      }
  
      const payload = {
        ownerName,
        businessName: owner.businessName ?? "Untitled Business",
        isMobile,
        services,
        availability,
        location: location ?? undefined, // undefined won't get saved if not applicable
        contact: {
          email: owner.email,
          phone: owner.phone,
        },
        travelRadius: isMobile ? travel?.travelRadius ?? 0 : 0,
        serviceAreas: isMobile ? travel?.serviceAreas ?? [] : [],
        instagram: "@placeholder",
        website: "",
        rating: 0,
        priceRange: "$",
        subscription,
      };
  
      console.log("📦 Final Payload Sent:", payload);
  
      const response = await fetch("http://localhost:5000/api/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Business profile created successfully!");
        router.push("/dashboard");
      } else {
        console.error("❌ Server error:", data);
        alert(`Error: ${data.error || "Something went wrong."}`);
      }
    } catch (error) {
      console.error("❌ Submission Error:", error);
      alert("Network error. Please try again.");
    }
  };
  
 

  // 🧭 Controlled back logic based on where user came from
  const handleBack = () => {
    if (from === "payment") {
      router.push("/onboarding/subscribe");
    } else if (from === "subscribe") {
      router.push("/onboarding/subscribe");
    } else {
      router.push("/onboarding/services"); // default/fallback
    }
  };

  if (!profileData) return <p className="text-center mt-10">Loading summary...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🎯 Confirm Your Business Profile</h2>
  
      <div className="space-y-6 text-gray-700">
        <section>
          <h3 className="font-semibold text-lg border-b pb-1">👤 Owner Info</h3>
          <p>{profileData.owner?.businessName}</p>
          <p>{profileData.owner?.firstName} {profileData.owner?.lastName}</p>
          <p>{profileData.owner?.email}</p>
          <p>{profileData.owner?.phone}</p>
        </section>
  
        <section>
          <h3 className="font-semibold text-lg border-b pb-1">💼 Work Type</h3>
          <p className="capitalize">{profileData.workType}</p>
        </section>
  
        {profileData.address && (
          <section>
            <h3 className="font-semibold text-lg border-b pb-1">📍 Address</h3>
            <p>{profileData.address.street}, {profileData.address.city}</p>
            <p>{profileData.address.postalCode}</p>
          </section>
        )}
  
        {profileData.availability && (
          <section>
            <h3 className="font-semibold text-lg border-b pb-1">🕒 Business Hours</h3>
            <ul className="ml-4 list-disc">
              {Object.entries(profileData.availability).map(([day, times]) => (
                <li key={day}>
                  <span className="capitalize">{day}</span>:{" "}
                  {times.active ? `${times.open} - ${times.close}` : "Closed"}
                </li>
              ))}
            </ul>
          </section>
        )}
  
        {profileData.services?.length > 0 && (
          <section>
            <h3 className="font-semibold text-lg border-b pb-1">💇 Services Offered</h3>
            <p>{profileData.services.join(", ")}</p>
          </section>
        )}
  
        {profileData.workType !== "physical" && profileData.travel && (
          <section>
            <h3 className="font-semibold text-lg border-b pb-1">🚗 Mobile Details</h3>
            <p>Travel Fee: ${profileData.travel.travelFee}</p>
            <p>Max Distance: {profileData.travel.travelRadius} km</p>
            <p>Service Areas: {profileData.travel.serviceAreas?.map(area => (
              area.charAt(0).toUpperCase() + area.slice(1)
            )).join(", ")}</p>
          </section>
        )}
  
        {profileData.subscription && (
          <section>
            <h3 className="font-semibold text-lg border-b pb-1">💳 Subscription</h3>
            <p>Plan: {profileData.subscription.plan}</p>
            {profileData.subscription.status && (
              <p>Status: {profileData.subscription.status}</p>
            )}
          </section>
        )}
      </div>
  
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleBack}
          className="bg-gray-200 hover:bg-gray-300 transition-colors text-gray-800 px-6 py-3 rounded-xl w-full sm:w-auto"
        >
          ← Back
        </button>
  
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white text-lg font-semibold px-6 py-3 rounded-xl w-full sm:w-auto"
        >
          ✅ Submit & Finish
        </button>
      </div>
    </div>
  );  
}
