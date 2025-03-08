"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function GrowBusiness() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleStartTrial = () => {
    if (status === "loading") return; // Prevent navigation while session is loading

    if (!session) {
      signIn(); // If not signed in, redirect to login page
    } else {
      router.push("/service/onboarding"); // If signed in, go to onboarding page
    }
  };

  return (
    <div className="w-full">
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
          
          {/* Get Started Button (Uses Same Logic as "Start Free Trial") */}
          <Button
            color="primary"
            size="lg"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4"
            onPress={handleStartTrial}
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Business Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12 bg-white text-center">
        <div className="p-6 rounded-lg shadow-lg border">
          <h2 className="text-2xl font-bold">24/7 Online Booking</h2>
          <p className="mt-2 text-gray-700">Allow clients to book services anytime.</p>
        </div>
        <div className="p-6 rounded-lg shadow-lg border">
          <h2 className="text-2xl font-bold">Integrated Payments</h2>
          <p className="mt-2 text-gray-700">Get paid directly through the platform.</p>
        </div>
        <div className="p-6 rounded-lg shadow-lg border">
          <h2 className="text-2xl font-bold">Marketing Tools</h2>
          <p className="mt-2 text-gray-700">Attract new clients with built-in promotions.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="flex flex-col items-center justify-center bg-blue-500 text-white py-12 px-6">
        <h2 className="text-3xl font-bold">Let's Do More, Better</h2>
        <p className="mt-2 text-lg">Get started today and take your business to the next level.</p>

        {/* Start Free Trial Button (Uses Same Logic as "Get Started") */}
        <Button
          color="secondary"
          size="lg"
          className="bg-black text-white px-6 py-3 rounded-lg mt-4"
          onPress={handleStartTrial}
        >
          Start Free Trial
        </Button>
      </div>
    </div>
  );
}
