"use client";
import { useRouter } from "next/navigation";

export default function ConfirmAddress() {
  const router = useRouter(); // Initialize router

  const handleConfirm = () => {
    // Navigate to the next step (Set Travel Fee)
    router.push("/onboarding/travel-fee");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Confirm Your Address</h2>
        <p className="text-gray-500 text-center">
          Please confirm your business address before proceeding.
        </p>

        <input
          type="text"
          placeholder="Street Address"
          className="w-full p-3 border rounded-lg mt-4"
        />
        <input
          type="text"
          placeholder="City"
          className="w-full p-3 border rounded-lg mt-4"
        />
        <input
          type="text"
          placeholder="Zip Code"
          className="w-full p-3 border rounded-lg mt-4"
        />

        <button
          onClick={handleConfirm} // Calls function to navigate
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
        >
          Confirm Address
        </button>
      </div>
    </div>
  );
}
