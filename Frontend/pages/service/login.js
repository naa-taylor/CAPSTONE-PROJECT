
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // Simulated database of registered users (Replace with actual API call later)
    const registeredEmails = ["test@gmail.com", "example@gmail.com"];

    if (!email) {
      setError("Please enter an email.");
      return;
    }

    if (registeredEmails.includes(email)) {
      // Redirect user to the password page
      router.push(`/password?email=${encodeURIComponent(email)}`);
    } else {
      // Redirect user to sign-up page
      router.push(`/signup?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Get Started</h2>
        <p className="text-gray-600 text-center">Enter your email to continue.</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mt-4"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
