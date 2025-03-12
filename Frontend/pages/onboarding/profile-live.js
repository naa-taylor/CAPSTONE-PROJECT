"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileLive() {
  const router = useRouter();
  const [liveDate, setLiveDate] = useState("In 3 days");

  const handleContinue = () => {
    router.push("/onboarding/import-contacts"); // Move to final step
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Set Your Profile Live</h2>
        <p className="text-gray-500 text-center">
          Let us know when you want your profile to go live.
        </p>

        <select
          value={liveDate}
          onChange={(e) => setLiveDate(e.target.value)}
          className="w-full p-3 border rounded-lg mt-4"
        >
          <option>Now</option>
          <option>Tomorrow</option>
          <option>In 3 days</option>
          <option>In 5 days</option>
          <option>In 7 days</option>
        </select>

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
