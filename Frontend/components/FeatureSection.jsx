import React from "react";
import { Button } from "@heroui/react";

const FeatureSection = () => (
  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-12 bg-gray-50">
    <div className="bg-blue-200 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Discover Local Beauty Businesses</h2>
      <p className="mt-2 text-black-700">
        Sign up to explore top-rated beauty businesses and get personalized recommendations tailored to you.
      </p>
      <Button className="mt-4 bg-blue-500 text-white" onPress={() => window.open("/customer/signup", "_blank")}>
        Sign Up & Explore
      </Button>
    </div>
    <div className="bg-blue-200 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">GlowGuide for Your Business</h2>
      <p className="mt-2 text-black-700">
        Get started with GlowGuide to run your business better. Calendar, booking, and payments all in one.
      </p>
      <Button
        color="secondary"
        size="lg"
        className="mt-4 bg-blue-500 text-white"
        onPress={() => window.open("/service/grow-business", "_blank")}
      >
        Grow My Business
      </Button>
    </div>
  </div>
);

export default FeatureSection;
