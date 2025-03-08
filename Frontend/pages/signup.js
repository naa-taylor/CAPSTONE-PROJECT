import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Signup() {
  const router = useRouter();
  const { email } = router.query; // Get email from query params

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!email) {
      router.push("/login"); // Redirect back if no email
    }
  }, [email, router]);

  const handleSignup = () => {
    alert(`Account created for ${email}!`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        
        <input
          type="email"
          value={email || ""}
          readOnly
          className="w-full p-3 border rounded-lg mt-4 bg-gray-200"
        />
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg mt-4"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border rounded-lg mt-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg mt-4"
        />

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
