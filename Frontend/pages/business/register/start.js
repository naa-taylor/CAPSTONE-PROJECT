// pages/business/register/start.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function StartPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If user already has data, prefill
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("businessData"));
    if (saved?.contact?.email) {
      setEmail(saved.contact.email);
    }
  }, []);

  const handleNext = () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
  
    const existing = JSON.parse(localStorage.getItem("businessData")) || {};
    const updated = {
      ...existing,
      contact: {
        ...existing.contact,
        email,
      },
      password,
    };
  
    localStorage.setItem("businessData", JSON.stringify(updated));
    router.push("/business/register/owner-info");
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white shadow-md rounded-xl w-full max-w-md p-6 space-y-4">
        <h1 className="text-xl font-bold text-center">Welcome to Business Registration</h1>
        <label className="block font-medium">Your Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded-md"
          placeholder="Enter email"
          required
        />
        <label className="block font-medium">Create Password</label>
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Create password"
        className="w-full border p-2 rounded-md"
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
