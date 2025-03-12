"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Services() {
  const router = useRouter();
  const [services, setServices] = useState([
    { name: "Female Haircut", duration: "45min", price: "$35.00" },
    { name: "Hair Extensions", duration: "2h", price: "$100.00" },
    { name: "Hair Color", duration: "1h 30min", price: "$70.00" },
  ]);

  const handleContinue = () => {
    router.push("/onboarding/profile-live"); // Move to next step
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Start Adding Services</h2>
        <p className="text-gray-500 text-center">Add at least one service to continue.</p>

        <div className="mt-4 space-y-2">
          {services.map((service, index) => (
            <div key={index} className="border p-3 rounded-lg flex justify-between">
              <span>{service.name} ({service.duration})</span>
              <span>{service.price}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
