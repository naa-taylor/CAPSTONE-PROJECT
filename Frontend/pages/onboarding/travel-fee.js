"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TravelFee() {
  const router = useRouter();

  const [fee, setFee] = useState("");
  const [distance, setDistance] = useState("");

  const [serviceAreas, setServiceAreas] = useState([]);
  const [cityInput, setCityInput] = useState("");

  const handleAddCity = () => {
    const trimmed = cityInput.trim();
    if (trimmed && !serviceAreas.includes(trimmed)) {
      setServiceAreas([...serviceAreas, trimmed]);
      setCityInput("");
    }
  };

  const handleRemoveCity = (cityToRemove) => {
    setServiceAreas(serviceAreas.filter((city) => city !== cityToRemove));
  };

  const handleNext = () => {
    if (!distance) {
      alert("Please enter a maximum travel distance.");
      return;
    }

    localStorage.setItem(
      "business_travel",
      JSON.stringify({
        travelFee: fee,
        travelRadius: distance,
        serviceAreas: serviceAreas,
      })
    );

    // ✅ Updated to point to the correct next onboarding step
    router.push("/onboarding/business-hours");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">🚗 Travel Fee & Radius</h2>
        <p className="text-gray-500 text-center mb-4">Set your travel cost and coverage areas.</p>

        <input
          type="number"
          placeholder="Travel Fee ($)"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="number"
          placeholder="Max Distance (km)"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <div className="mb-4">
          <label className="block font-medium mb-1">Service Areas (Cities you serve):</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter city"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={handleAddCity}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </div>

          {serviceAreas.length > 0 && (
            <ul className="mt-3 list-disc list-inside text-sm text-gray-700">
              {serviceAreas.map((city, index) => (
                <li key={index} className="flex justify-between items-center">
                  {city}
                  <button
                    onClick={() => handleRemoveCity(city)}
                    className="text-red-500 text-xs ml-2"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-2 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
