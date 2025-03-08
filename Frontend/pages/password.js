import { useState } from "react";
import { useRouter } from "next/router";

export default function PasswordPage() {
  const router = useRouter();
  const { email } = router.query; // Get email from URL
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordSubmit = async () => {
    // Mock authentication (Replace with actual API call)
    const mockUser = { email: "test@gmail.com", password: "123456" };

    if (email !== mockUser.email || password !== mockUser.password) {
      setError("Incorrect password. Please try again.");
      return;
    }

    // Redirect to user dashboard after successful login
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Welcome back</h2>
        <p className="text-center text-gray-600">Enter your password to log in as <b>{email}</b></p>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg mt-4"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          onClick={handlePasswordSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
        >
          Continue
        </button>

        <p className="text-center text-blue-500 mt-2 cursor-pointer" onClick={() => router.push("/forgot-password")}>
          Forgot your password?
        </p>
      </div>
    </div>
  );
}
