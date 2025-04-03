"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WorkLocation() {
  const router = useRouter();
  const [workType, setWorkType] = useState(""); // "physical", "mobile", or "both"
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!workType) {
      setError("Please select one of the options before continuing.");
      return;
    }

    // Save to localStorage so we can use this later
    localStorage.setItem("business_work_type", workType);

    // Navigate based on selected type
    if (workType === "physical") {
      router.push("/onboarding/address");
    } else if (workType === "mobile") {
      router.push("/onboarding/travel-fee");
    } else if (workType === "both") {
      router.push("/onboarding/address"); // Will later continue to travel-fee from address
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Where do you work?</h2>
        <p className="text-gray-500 text-center mb-4">
          Let us know how you offer services.
        </p>

        {/* Option Buttons */}
        <div className="space-y-3">
          <label className="block">
            <input
              type="radio"
              name="workType"
              value="physical"
              checked={workType === "physical"}
              onChange={() => setWorkType("physical")}
              className="mr-2"
            />
            I work only at my salon or business location
          </label>
          <label className="block">
            <input
              type="radio"
              name="workType"
              value="mobile"
              checked={workType === "mobile"}
              onChange={() => setWorkType("mobile")}
              className="mr-2"
            />
            I am mobile only (travel to clients)
          </label>
          <label className="block">
            <input
              type="radio"
              name="workType"
              value="both"
              checked={workType === "both"}
              onChange={() => setWorkType("both")}
              className="mr-2"
            />
            I do both
          </label>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          onClick={handleNext}
          className="w-full mt-6 bg-black text-white py-2 rounded-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
