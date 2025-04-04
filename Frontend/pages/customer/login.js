import { useState } from "react";
import { useRouter } from "next/router";

export default function ClientSignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/profile?email=${email}`);
      const data = await response.json();
  
      if (response.status === 200 && data) {
        localStorage.setItem("userEmail", email);
        const userName = `${data.firstName} ${data.lastName}`;
        alert(`Signed in successfully! Welcome Back, ${userName}`);
        router.push("/customer/dashboard");
      } else {
        setError("This user doesn't exist. Please register.");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError("An error occurred during login. Please try again later.");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Client Sign In</h2>
        <p className="text-gray-600 text-center mb-4">
          Log in to your client account.
        </p>

        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Enter your username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mt-4"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg mt-4"
        />

        <button
          onClick={handleSignIn}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/customer/signup")}
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
