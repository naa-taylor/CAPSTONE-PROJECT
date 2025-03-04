"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "/images/kb.jpg",
    "/images/SALON+1.jpg",
    "/images/IMG_4102 2.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-screen text-center">

      {/* Background Slideshow */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={slides[currentSlide]}
          alt="Background Slideshow"
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-1000"
        />
      </div>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* About Us Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white">About Us</h1>

        {/* Mission Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
          <p className="text-gray-700">
            At GlowGuide, our mission is to empower individuals to discover the
            best beauty and wellness services available. We are committed to
            making it easier for people to find the right professionals who can
            help them feel confident, healthy, and beautiful.
          </p>
        </div>

        {/* Development Team Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Our Development Team</h2>
          <p className="text-gray-700">
            Our ever-growing development team is dedicated to providing you with
            the best possible experience. Currently, this team consists of three
            members: Thipiga, Naa Adjoa, and Kibati.
          </p>
          <div className="flex justify-center gap-10 mt-4">
            <div className="text-center">
              <p className="font-bold">Naa Adjoa</p>
            </div>
            <div className="text-center">
              <p className="font-bold">Kibati</p>
            </div>
          </div>
        </div>

        {/* Values Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Our Values</h2>
          <p className="text-gray-700">
            <strong className="text-red-600">Customer Focus:</strong> Ensuring every customer has an amazing experience.
            <br />
            <strong className="text-red-600">Integrity:</strong> Acting honestly, ethically, and transparently.
            <br />
            <strong className="text-red-600">Innovation:</strong> Seeking creative and effective solutions.
            <br />
            <strong className="text-red-600">Collaboration:</strong> Believing in the power of teamwork.
          </p>
        </div>
      </div>
    </div>
  );
}
