"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Payment() {
  const router = useRouter();
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  const handlePay = () => {
    const cleanCard = card.replace(/\s+/g, ""); // remove spaces

    if (
      cleanCard === "4724090850126127" &&
      expiry === "0928" &&
      cvv === "838"
    ) {
      setError("");
      // Simulate success
      router.push("/onboarding/thank-you"); // or "/dashboard"
    } else {
      setError("Payment failed. Use the test card details provided.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Enter Payment Details</h2>
        <p className="text-sm text-center text-gray-500 mb-4">
          Use test card info: <br />
          <span className="font-mono">4724 0908 5012 6127</span> / <span className="font-mono">0928</span> / <span className="font-mono">838</span>
        </p>

        <input
          type="text"
          placeholder="Card Number"
          value={card}
          onChange={(e) => setCard(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
        />
        <input
          type="text"
          placeholder="MMYY (e.g., 0928)"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
        />
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        <button
          onClick={handlePay}
          className="w-full bg-black text-white py-2 rounded-lg mt-4"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
