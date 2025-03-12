"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BusinessHours() {
  const router = useRouter();
  const [hours, setHours] = useState({
    Monday: { open: "10:00 AM", close: "7:00 PM", active: true },
    Tuesday: { open: "10:00 AM", close: "7:00 PM", active: true },
    Wednesday: { open: "10:00 AM", close: "7:00 PM", active: true },
    Thursday: { open: "10:00 AM", close: "7:00 PM", active: true },
    Friday: { open: "10:00 AM", close: "7:00 PM", active: true },
    Saturday: { open: "", close: "", active: false },
    Sunday: { open: "", close: "", active: false },
  });

  const handleContinue = () => {
    router.push("/onboarding/services"); // Move to next step
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Set Your Business Hours</h2>
        <p className="text-gray-500 text-center">When can clients book with you?</p>

        <div className="mt-4 space-y-2">
          {Object.keys(hours).map((day) => (
            <div key={day} className="flex justify-between items-center border-b py-2">
              <span>{day}</span>
              <input
                type="checkbox"
                checked={hours[day].active}
                onChange={() =>
                  setHours({ ...hours, [day]: { ...hours[day], active: !hours[day].active } })
                }
              />
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
