"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterBusiness() {
  const router = useRouter();

  const [owner, setOwner] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [businessName, setBusinessName] = useState("");
  const [workType, setWorkType] = useState("");
  const [address, setAddress] = useState({ street: "", city: "", province: "", postalCode: "" });
  const [travel, setTravel] = useState({ travelRadius: 0, travelFee: 0, serviceAreas: "" });
  const [availability, setAvailability] = useState({});
  const [services, setServices] = useState([]);
  const [subscription, setSubscription] = useState("free");

  const allServices = [
    "Haircut", "Blowout", "Hair Coloring", "Highlights",
    "Men's Haircut", "Wig Install", "Braiding", "Cornrows"
  ];

  const handleSubmit = async () => {
    const ownerName = `${owner.firstName} ${owner.lastName}`.trim();
    const isMobile = workType === "mobile" || workType === "both";
    const hasPhysicalLocation = workType === "physical" || workType === "both";
  
    if (!ownerName || !owner.email || !owner.phone || !businessName || !workType) {
      alert("Please fill in all required fields.");
      return;
    }
  
    if (isMobile && (!travel.travelRadius || !travel.serviceAreas)) {
      alert("Please fill in all travel information for mobile service.");
      return;
    }
  
    if (hasPhysicalLocation && (!address.street || !address.city || !address.province)) {
      alert("Please fill in all address fields for physical location.");
      return;
    }
  
    const payload = {
      ownerName,
      businessName,
      isMobile,
      mobileOnly: workType === "mobile",
      services,
      location: {
        hasPhysicalLocation,
        ...(hasPhysicalLocation && {
          address: address.street,
          city: address.city,
          province: address.province,
          postalCode: address.postalCode,
          coordinates: {
            type: "Point",
            coordinates: [-78.8658, 43.8971], // static default
          },
        }),
      },
      contact: {
        email: owner.email,
        phone: owner.phone,
      },
      travelRadius: isMobile ? parseInt(travel.travelRadius) || 0 : undefined,
      serviceAreas: isMobile
        ? travel.serviceAreas.split(",").map((s) => s.trim())
        : undefined,
      instagram: "@placeholder",
      website: "",
      rating: 0,
      priceRange: "$",
      subscription: { plan: subscription },
    };
  
    // ✅ Local Debug Logs
    console.log("🧪 Owner Name:", ownerName);
    console.log("🧪 Email:", owner.email);
    console.log("🧪 Phone:", owner.phone);
    console.log("🧪 Business Name:", businessName);
    console.log("🧪 Work Type:", workType);
    console.log("🧪 Address:", address);
    console.log("🧪 Travel Info:", travel);
    console.log("🧪 Services:", services);
    console.log("🧪 Subscription:", subscription);
    console.log("📦 Final Payload:", JSON.stringify(payload, null, 2));
  
    try {
      const response = await fetch("/api/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const err = await response.json();
        alert(err.error || "Business registration failed.");
        return;
      }
  
      alert("Business registered successfully!");
      router.push("/dashboard");
    } catch (err) {
      console.error("🚨 Error submitting business:", err);
      alert("Something went wrong.");
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Register Your Business</h1>

      {/* Owner Info */}
      <h2 className="font-semibold text-xl mb-2">👤 Owner Info</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input placeholder="First Name" value={owner.firstName} onChange={e => setOwner({ ...owner, firstName: e.target.value })} className="border p-2 rounded" />
        <input placeholder="Last Name" value={owner.lastName} onChange={e => setOwner({ ...owner, lastName: e.target.value })} className="border p-2 rounded" />
        <input placeholder="Email" value={owner.email} onChange={e => setOwner({ ...owner, email: e.target.value })} className="border p-2 rounded col-span-2" />
        <input placeholder="Phone" value={owner.phone} onChange={e => setOwner({ ...owner, phone: e.target.value })} className="border p-2 rounded col-span-2" />
      </div>

      {/* Business Info */}
      <h2 className="font-semibold text-xl mb-2">🏢 Business Info</h2>
      <input placeholder="Business Name" value={businessName} onChange={e => setBusinessName(e.target.value)} className="border p-2 rounded w-full mb-4" />
      <select value={workType} onChange={e => setWorkType(e.target.value)} className="border p-2 rounded w-full mb-4">
        <option value="">Select Work Type</option>
        <option value="mobile">Mobile Only</option>
        <option value="physical">Physical Only</option>
        <option value="both">Both</option>
      </select>

      {/* Address Info */}
      {(workType === "physical" || workType === "both") && (
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-1">📍 Address</h2>
          <input placeholder="Street" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} className="border p-2 rounded w-full mb-2" />
          <input placeholder="City" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} className="border p-2 rounded w-full mb-2" />
          <input placeholder="Province" value={address.province} onChange={e => setAddress({ ...address, province: e.target.value })} className="border p-2 rounded w-full mb-2" />
          <input placeholder="Postal Code" value={address.postalCode} onChange={e => setAddress({ ...address, postalCode: e.target.value })} className="border p-2 rounded w-full mb-2" />
        </div>
      )}

      {/* Travel Info */}
      {(workType === "mobile" || workType === "both") && (
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-1">🚗 Travel Info</h2>
          <input type="number" placeholder="Travel Radius (km)" value={travel.travelRadius} onChange={e => setTravel({ ...travel, travelRadius: e.target.value })} className="border p-2 rounded w-full mb-2" />
          <input type="number" placeholder="Travel Fee ($)" value={travel.travelFee} onChange={e => setTravel({ ...travel, travelFee: e.target.value })} className="border p-2 rounded w-full mb-2" />
          <input placeholder="Service Areas (comma-separated)" value={travel.serviceAreas} onChange={e => setTravel({ ...travel, serviceAreas: e.target.value })} className="border p-2 rounded w-full mb-2" />
        </div>
      )}

      {/* Services */}
      <h2 className="font-semibold text-xl mb-2">💇 Services Offered</h2>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {allServices.map(service => (
          <label key={service} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={service}
              checked={services.includes(service)}
              onChange={e => {
                const newServices = e.target.checked
                  ? [...services, service]
                  : services.filter(s => s !== service);
                setServices(newServices);
              }}
            />
            <span>{service}</span>
          </label>
        ))}
      </div>

      {/* Subscription */}
      <h2 className="font-semibold text-xl mb-2">💳 Subscription</h2>
      <select value={subscription} onChange={e => setSubscription(e.target.value)} className="border p-2 rounded w-full mb-4">
        <option value="free">Free Trial</option>
        <option value="premium">Premium Plan</option>
      </select>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg w-full"
      >
        ✅ Submit Business
      </button>
    </div>
  );
}
