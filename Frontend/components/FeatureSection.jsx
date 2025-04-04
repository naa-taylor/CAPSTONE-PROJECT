"use client";

import React from "react";
import Image from "next/image";

const FeatureSection = () => (
  <div
    className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-12"
    style={{
      background: "linear-gradient(90deg, #1D818A 0%, #421763 100%)",
    }}
  >
    {/* Left Card as Button */}
    <div
      onClick={() => window.open("/download-app", "_blank")}
      className="cursor-pointer relative rounded-xl overflow-hidden shadow-2xl text-white transition transform hover:scale-105"
    >
      
      <div className="relative z-10 p-8 bg-[#1D818A] bg-opacity-95 rounded-xl h-full flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Find & book an appointment</h2>
          <p className="text-white text-md">
            Cut the phone tag. Find your next hair appointment and book instantly
            anytime, anywhere.
          </p>
        </div>
        <div className="mt-6 font-semibold text-center text-lg">Download App</div>
      </div>
    </div>

    {/* Right Card as Button */}
    <div
      onClick={() => window.open("/service/grow-business", "_blank")}
      className="cursor-pointer relative rounded-xl overflow-hidden shadow-2xl text-white transition transform hover:scale-105"
    >
      
      <div className="relative z-10 p-8 bg-[#421763] bg-opacity-95 rounded-xl h-full flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">GlowGuide for Your Business</h2>
          <p className="text-white text-md">
            Get started with GlowGuide to run your business better. Calendar, booking,
            and payments all in one.
          </p>
        </div>
        <div className="mt-6 font-semibold text-center text-lg">Grow My Business</div>
      </div>
    </div>
  </div>
);

export default FeatureSection;
