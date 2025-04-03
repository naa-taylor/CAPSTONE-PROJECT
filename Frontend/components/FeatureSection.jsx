"use client";

import React from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

const FeatureSection = () => {
  const router = useRouter();

  return (
    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-12 bg-gray-50">
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Find & book an appointment</h2>
        <p className="mt-2 text-gray-700">
          Cut the phone tag. Find your next hair appointment and book instantly anytime, anywhere.
        </p>
        <Button className="mt-4 bg-blue-500 text-white">Download App</Button>
      </div>
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">GlowGuide for Your Business</h2>
        <p className="mt-2 text-gray-700">
          Get started with GlowGuide to run your business better. Calendar, booking, and payments all in one.
        </p>
        <Button
          color="secondary"
          size="lg"
          className="bg-gray-700 text-white px-6 py-3 rounded-lg"
          onPress={() => router.push("/register-business")}
        >
          Grow My Business
        </Button>
      </div>
    </div>
  );
};

export default FeatureSection;
