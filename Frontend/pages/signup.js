"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Signup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email");

  const [email, setEmail] = useState(emailFromQuery || "");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!emailFromQuery) {
      router.push("/login");
    }
  }, [emailFromQuery, router]);

  const handleSignup = () => {
    if (!firstName || !lastName || !phone || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError(""); // Clear previous errors

    // Redirect to onboarding step
    router.push("/onboarding/work-location");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

        <input
          type="email"
          value={email}
          readOnly
          className="w-full p-3 border rounded-lg mt-4 bg-gray-200"
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-3 border rounded-lg mt-4"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-3 border rounded-lg mt-4 mb-4"
        />
        <PhoneInput
          country={"ca"}
          value={phone}
          onChange={setPhone}
          inputStyle={{
            width: "100%",
            height: "50px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            paddingLeft: "50px",
            marginTop: "16px"
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg mt-4"
        />

        {error && (
          <p className="text-red-500 text-center mt-2">{error}</p>
        )}

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
