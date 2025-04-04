"use client";
import { useState } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { ExternalLink } from "lucide-react";

export default function GrowBusiness() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const basePrice = 29.99;

  const handleStartTrial = () => {
    if (status === "loading") return;
    if (!session) {
      signIn();
    } else {
      router.push("/service/onboarding");
    }
  };

  return (
    <div className="w-full relative">
      {/* FOR CUSTOMER Button */}
      <div className="absolute top-4 right-6 z-30">
        <Link
          href="/"
          className="flex items-center gap-1 bg-gradient-to-r from-[#306C77] to-[#3e6e85] text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow hover:opacity-90 transition"
        >
          FOR CUSTOMER
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gray-100">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/Close-up Portrait with Curly Hair.jpeg"
            alt="Grow Your Business"
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-1000"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Grow Your Business</h1>
          <p className="mt-2 text-lg md:text-xl">
            The ultimate platform to manage appointments and client interactions.
          </p>
          <Button
            color="primary"
            size="lg"
            className="bg-[#421763] text-white px-6 py-3 rounded-lg mt-4 hover:bg-[#310F4E]"
            onPress={handleStartTrial}
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Business Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12 bg-gradient-to-r from-[#1D818A] to-[#421763] text-center text-white">
        <div className="p-6 rounded-lg shadow-lg border border-white">
          <h2 className="text-2xl font-bold">24/7 Online Booking</h2>
          <p className="mt-2">Allow clients to book services anytime.</p>
        </div>
        <div className="p-6 rounded-lg shadow-lg border border-white">
          <h2 className="text-2xl font-bold">Integrated Payments</h2>
          <p className="mt-2">Get paid directly through the platform.</p>
        </div>
        <div className="p-6 rounded-lg shadow-lg border border-white">
          <h2 className="text-2xl font-bold">Marketing Tools</h2>
          <p className="mt-2">Attract new clients with built-in promotions.</p>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gradient-to-r from-[#1D818A] to-[#421763] text-white py-12 px-6 md:px-16">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 rounded-xl shadow border border-white">
              <h3 className="text-2xl font-bold text-white">GlowGuide Subscription</h3>
              <p className="mt-1">Streamlining the day-to-day so you can focus on what you love.</p>
              <div className="mt-4 text-3xl font-bold text-white">${basePrice.toFixed(2)} <span className="text-sm font-normal">/ per month + tax</span></div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="rounded-xl shadow-xl overflow-hidden border border-white">
            <div className="bg-transparent p-6 border-b border-white">
              <h3 className="text-2xl font-bold text-white">Summary</h3>
              <div className="mt-4 flex justify-between">
                <span>GlowGuide Subscription</span>
                <span className="font-bold">${basePrice.toFixed(2)}</span>
              </div>
            </div>
            <div className="bg-[#421763] text-white p-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Per month</span>
                <span>${basePrice.toFixed(2)}</span>
              </div>
              <Button
                className="bg-[#306C77] w-full mt-4 text-white py-2 rounded hover:opacity-90"
                onPress={handleStartTrial}
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-[#1D818A] to-[#421763] text-white py-12 px-6">
        <h2 className="text-3xl font-bold">Let's Do More, Better</h2>
        <p className="mt-2 text-lg">Get started today and take your business to the next level.</p>
      </div>
    </div>
  );
}
