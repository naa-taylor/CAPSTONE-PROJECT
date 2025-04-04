// pages/business/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function BusinessLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/businesses/login", {
        email,
        password,
      });

      const { token, business } = res.data;

      // Save to localStorage (or cookies, depending on security needs)
      localStorage.setItem("token", token);
      localStorage.setItem("business", JSON.stringify(business));

      // ✅ Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      alert("Login failed. Check your email or password.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Business Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
