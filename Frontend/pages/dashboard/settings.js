"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

export default function Settings() {
  const router = useRouter();

  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [workingHours, setWorkingHours] = useState({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });

  const handleSave = () => {
    alert("Settings saved!");
    router.push("/dashboard"); // 🔁 Redirect after saving
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile & Settings</h1>

      {/* Business Info */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Business Information</h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          placeholder="Business Name (e.g., GlowGuide Salon)"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <input
          type="email"
          className="w-full p-2 border rounded mb-2"
          placeholder="Email (e.g., info@glowguide.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          placeholder="Phone Number (e.g., +1 647 510 7207)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Working Hours */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Working Hours</h2>
        {Object.keys(workingHours).map((day) => (
          <div key={day} className="flex justify-between mb-2">
            <span className="capitalize">{day}</span>
            <input
              type="text"
              className="p-2 border rounded w-1/2"
              placeholder="e.g., 9:00 AM - 6:00 PM or Closed"
              value={workingHours[day]}
              onChange={(e) =>
                setWorkingHours({ ...workingHours, [day]: e.target.value })
              }
            />
          </div>
        ))}
      </div>

      {/* Save Button */}
      <Button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        onPress={handleSave}
      >
        Save Changes
      </Button>
    </div>
  );
}
