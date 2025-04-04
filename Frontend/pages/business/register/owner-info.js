
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function OwnerInfoPage() {
  const router = useRouter();

  const [ownerName, setOwnerName] = useState("");
  const [businessName, setBusinessName] = useState("");
  //const [category, setCategory] = useState("Hair Salon");

  // Load existing values if returning to this step
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("businessData"));
    if (saved) {
      setOwnerName(saved.ownerName || "");
      setBusinessName(saved.businessName || "");
      //setCategory(saved.category || "Hair Salon");
    }
  }, []);

  const handleNext = () => {
    const existing = JSON.parse(localStorage.getItem("businessData")) || {};
    const updated = {
      ...existing,
      ownerName,
      businessName,
      //category,
    };
    localStorage.setItem("businessData", JSON.stringify(updated));
    router.push("/business/register/location");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white shadow-md rounded-xl w-full max-w-md p-6 space-y-4">
        <h1 className="text-xl font-bold text-center">Business Owner Info</h1>

        <label className="block font-medium">Owner Name</label>
        <input
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          className="w-full border p-2 rounded-md"
          placeholder="e.g. Jane Doe"
          required
        />

        <label className="block font-medium">Business Name</label>
        <input
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="w-full border p-2 rounded-md"
          placeholder="e.g. Crown & Glory Studio"
          required
        />
        
        <button
          onClick={handleNext}
          className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
