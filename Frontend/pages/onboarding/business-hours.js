"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BusinessHours() {
  const router = useRouter();

  const [hours, setHours] = useState({
    Monday: { open: "10:00", close: "19:00", active: true },
    Tuesday: { open: "10:00", close: "19:00", active: true },
    Wednesday: { open: "10:00", close: "19:00", active: true },
    Thursday: { open: "10:00", close: "19:00", active: true },
    Friday: { open: "10:00", close: "19:00", active: true },
    Saturday: { open: "", close: "", active: false },
    Sunday: { open: "", close: "", active: false },
  });

  const handleContinue = () => {
    localStorage.setItem("business_availability", JSON.stringify(hours));
    router.push("/onboarding/services");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center">🕒 Set Your Business Hours</h2>
        <p className="text-gray-500 text-center mb-6">When can clients book with you?</p>

        <div className="space-y-5">
          {Object.entries(hours).map(([day, data]) => (
            <div key={day} className="flex flex-col gap-1">
              <label className="font-semibold">{day}</label>

              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={data.active}
                    onChange={() =>
                      setHours({
                        ...hours,
                        [day]: { ...data, active: !data.active },
                      })
                    }
                  />
                  Open
                </label>

                <input
                  type="time"
                  value={data.open}
                  onChange={(e) =>
                    setHours({
                      ...hours,
                      [day]: { ...data, open: e.target.value },
                    })
                  }
                  disabled={!data.active}
                  className="border rounded px-2 py-1"
                />
                <span>to</span>
                <input
                  type="time"
                  value={data.close}
                  onChange={(e) =>
                    setHours({
                      ...hours,
                      [day]: { ...data, close: e.target.value },
                    })
                  }
                  disabled={!data.active}
                  className="border rounded px-2 py-1"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-8 font-medium transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
