"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Subscribe() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("");

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    if (!selectedPlan) return;

    // ✅ Store the plan under correct key
    localStorage.setItem("business_subscription", JSON.stringify({ plan: selectedPlan }));

    // ✅ Correct routing
    if (selectedPlan === "free") {
      router.push("/onboarding/confirm-profile?from=subscribe");
    } else {
      router.push("/onboarding/payment");
    }  
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[28rem]">
        <h2 className="text-2xl font-bold text-center">💳 Set Up Your Subscription</h2>
        <p className="text-gray-500 text-center mb-6">
          Our platform runs on a monthly plan. Choose how you'd like to start.
        </p>

        <div className="space-y-4">
        <div
          onClick={() => handlePlanSelect("free")}
          className={`border rounded-lg p-4 cursor-pointer transition ${
            selectedPlan === "free" ? "border-blue-600 bg-blue-50" : "hover:border-blue-600"
          }`}
        >
          <h3 className="text-lg font-semibold">Free Trial</h3>
          <p className="text-sm text-gray-600">
            Try all features free for 7 days. No credit card required.
          </p>
        </div>

          <div
            onClick={() => handlePlanSelect("basic")}
            className={`border rounded-lg p-4 cursor-pointer transition ${
              selectedPlan === "basic" ? "border-blue-600 bg-blue-50" : "hover:border-blue-600"
            }`}
          >
            <h3 className="text-lg font-semibold">Basic Plan</h3>
            <p className="text-sm text-gray-600">
              $19/month — Full access to scheduling, reminders, and client management.
            </p>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedPlan}
          className={`w-full py-2 rounded-lg mt-6 text-white font-medium transition ${
            selectedPlan ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
