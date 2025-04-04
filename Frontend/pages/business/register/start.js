import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function StartPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
      contact: { ...existing.contact, email },
      password,
    };

    localStorage.setItem("businessData", JSON.stringify(updated));
    router.push("/business/register/owner-info");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1D818A] to-[#421763] p-6">
      <div className="backdrop-blur-md bg-white/30 shadow-xl rounded-xl w-full max-w-md p-8 space-y-6 border border-white/20">
        <h1 className="text-2xl font-bold text-center text-white">
          Welcome to Business Registration
        </h1>

        <div>
          <label className="block font-medium text-white mb-1">
            Your Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#3b8686] focus:border-[#3b8686] transition"
            placeholder="Enter email"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-white mb-1">
            Create Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#3b8686] focus:border-[#3b8686] transition"
            placeholder="Create password"
            required
          />
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-[#3b8686] hover:bg-[#327878] text-white font-semibold py-2 rounded-xl transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
