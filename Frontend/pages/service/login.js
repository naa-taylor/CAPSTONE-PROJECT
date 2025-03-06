"use client";
import { useState } from "react";
import { Button, Input, Card } from "@heroui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginSignUp = () => {
  const [userType, setUserType] = useState("client"); // Default to client
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    setError(null); // Reset error message

    try {
      // Simulate checking if the user exists in the database
      const res = await fetch("/api/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.exists) {
        // ✅ User exists → Log them in
        await signIn("credentials", { email, password, role: userType });

        // Redirect after login based on user type
        if (userType === "business") {
          router.push("/dashboard/business");
        } else {
          router.push("/dashboard/client");
        }
      } else {
        // ❌ User does NOT exist → Redirect to Sign Up
        router.push(`/signup?email=${email}&role=${userType}`);
      }
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="p-6 w-96 shadow-lg bg-white">
        <h2 className="text-center text-2xl font-bold">Login or Sign Up</h2>
        <p className="text-center text-gray-500">Choose your account type</p>

        {/* User Type Selection */}
        <div className="flex justify-between my-4">
          <Button
            variant={userType === "client" ? "solid" : "bordered"}
            onPress={() => setUserType("client")}
          >
            Client
          </Button>
          <Button
            variant={userType === "business" ? "solid" : "bordered"}
            onPress={() => setUserType("business")}
          >
            Business
          </Button>
        </div>

        {/* Login Fields */}
        <Input
          type="email"
          placeholder="Enter your email"
          className="mt-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          className="mt-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <Button color="primary" className="w-full mt-4" onPress={handleLogin}>
          Continue as {userType === "client" ? "Client" : "Business"}
        </Button>

        {/* Google Login */}
        <Button
          color="danger"
          variant="bordered"
          className="w-full mt-4"
          onPress={() => signIn("google")}
        >
          Continue with Google
        </Button>
      </Card>
    </div>
  );
};

export default LoginSignUp;
