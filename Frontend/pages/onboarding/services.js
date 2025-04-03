"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react"; // optional icons

const SERVICE_OPTIONS = [
  // General / Salon
  "Haircut", "Blowout", "Hair Coloring", "Highlights", "Balayage", "Ombre",
  "Deep Conditioning", "Scalp Treatment", "Silk Press", "Keratin Treatment",
  "Perms", "Relaxer Treatment",

  // Men’s Cuts & Styling
  "Men's Haircut", "Beard Trim", "Fade", "Line Up", "Men’s Hair Styling",

  // Protective Styles / Extensions
  "Hair Extensions", "Tape-In Extensions", "Weave Install", "Wig Install", "Wig Customization",

  // Braids & Locs
  "Braiding", "Box Braids", "Knotless Braids", "Cornrows", "Faux Locs",
  "Locs Retwist", "Twist Out", "Curly Hair Styling"
];

export default function Services() {
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const [services, setServices] = useState([]);

  const handleAdd = () => {
    if (selected && !services.includes(selected)) {
      setServices([...services, selected]);
      setSelected("");
    }
  };

  const handleRemove = (item) => {
    setServices(services.filter(service => service !== item));
  };

  const handleContinue = () => {
    if (services.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    localStorage.setItem("business_services", JSON.stringify(services));
    router.push("/onboarding/subscribe");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">💇 Start Adding Services</h2>
        <p className="text-gray-500 text-center mb-4">Choose from the dropdown below.</p>

        <div className="flex gap-2 mb-4">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2"
          >
            <option value="">-- Select a service --</option>
            {SERVICE_OPTIONS.map((service, idx) => (
              <option key={idx} value={service}>{service}</option>
            ))}
          </select>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>

        {services.length > 0 && (
          <ul className="space-y-2 mb-4">
            {services.map((service, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center border px-3 py-2 rounded-lg text-sm"
              >
                {service}
                <button onClick={() => handleRemove(service)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={handleContinue}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-2 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
