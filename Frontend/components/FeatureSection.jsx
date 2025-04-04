import React from "react";

const FeatureSection = () => (
  <div className="relative z-10 bg-[linear-gradient(90deg,#1D818A_0%,#421763_100%)] py-16 px-4 md:px-12">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Green Card - Customer */}
      <div
        onClick={() => window.open("/customer/signup", "_blank")}
        className="cursor-pointer bg-[#1D818A] text-white p-8 rounded-2xl shadow-lg transition hover:shadow-2xl hover:scale-[1.02]"
      >
        <h2 className="text-2xl md:text-3xl font-bold">
          Discover Local Beauty Businesses
        </h2>
        <p className="mt-3 text-white/90">
          Sign up to explore top-rated beauty businesses and get personalized recommendations tailored to you.
        </p>
        <div className="mt-6 inline-block bg-white text-[#1D818A] text-sm font-semibold px-5 py-2 rounded-md shadow hover:bg-gray-100 transition">
          Sign Up & Explore
        </div>
      </div>

      {/* Purple Card - Business */}
      <div
        onClick={() => window.open("/service/grow-business", "_blank")}
        className="cursor-pointer bg-[#6A0DAD] text-white p-8 rounded-2xl shadow-lg transition hover:shadow-2xl hover:scale-[1.02]"
      >
        <h2 className="text-2xl md:text-3xl font-bold">
          GlowGuide for Your Business
        </h2>
        <p className="mt-3 text-white/90">
          Get started with GlowGuide to run your business better. Calendar, booking, and payments all in one.
        </p>
        <div className="mt-6 inline-block bg-white text-[#6A0DAD] text-sm font-semibold px-5 py-2 rounded-md shadow hover:bg-gray-100 transition">
          Grow My Business
        </div>
      </div>
    </div>
  </div>
);

export default FeatureSection;
