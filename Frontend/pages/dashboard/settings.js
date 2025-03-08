"use client";
import { useState } from "react";
import { Button } from "@heroui/react";

export default function Settings() {
  const [businessName, setBusinessName] = useState("GlowGuide Salon");
  const [email, setEmail] = useState("info@glowguide.com");
  const [phone, setPhone] = useState("+1 647 510 7207");
  const [workingHours, setWorkingHours] = useState({
    monday: "9:00 AM - 6:00 PM",
    tuesday: "9:00 AM - 6:00 PM",
    wednesday: "9:00 AM - 6:00 PM",
    thursday: "9:00 AM - 6:00 PM",
    friday: "9:00 AM - 8:00 PM",
    saturday: "10:00 AM - 4:00 PM",
    sunday: "Closed",
  });

  const handleSave = () => {
    alert("Settings updated successfully!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile & Settings</h1>

      {/* Business Information */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Business Information</h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="Business Name"
        />
        <input
          type="email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Business Email"
        />
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
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
              value={workingHours[day]}
              onChange={(e) => setWorkingHours({ ...workingHours, [day]: e.target.value })}
            />
          </div>
        ))}
      </div>

      {/* Save Changes Button */}
      <Button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        onPress={handleSave}
      >
        Save Changes
      </Button>
    </div>
  );
}
