"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/footer";

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "/images/hair-salon.png",
    "/images/salon-products.jpg",
    "/images/salon-inprogress.jpeg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const teamMembers = [
    {
      name: "Thipiga",
      image: "/images/thipiga.jpg",
    },
    {
      name: "Naa-adjoa",
      image: "/images/taylor.jpg",
    },
    {
      name: "Kibati",
      image: "/images/kibati.jpg",
    },
  ];

  return (
    <div className="w-full text-center bg-gradient-to-r from-[#3a7c8b] to-[#3c215b] text-white">
      {/* Header */}
      <Header />

      {/* Slideshow Section */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <Image
          src={slides[currentSlide]}
          alt="Background Slideshow"
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* About Us Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-4xl md:text-6xl font-bold mt-8">About Us</h1>

        {/* Mission */}
        <div className="max-w-3xl mt-8">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-white/90 mt-2">
          At GlowGuide, our mission is to empower individuals to discover top-tier hair services and professionals in their area.
          We are committed to making it easier for people to find the right hairstylists who help them feel confident, cared for, and beautiful—every step of the way.


          </p>
        </div>

        {/* Development Team */}
        <div className="max-w-4xl mt-16">
          <h2 className="text-2xl font-bold">Our Development Team</h2>
          <p className="text-white/90 mt-2">
            Our ever-growing development team is dedicated to providing you with the best possible experience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 card-grid">
            {teamMembers.map((member) => (
              <div key={member.name} className="relative group rounded-2xl overflow-hidden transition-transform duration-300 card">
                <div className="card-background">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full rounded-2xl"
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-2xl">
                  <p className="text-white font-bold text-lg card-category">{member.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="max-w-3xl mt-16 mb-12">
          <h2 className="text-2xl font-bold">Our Values</h2>
          <p className="text-white/90 mt-2">
            <strong className="text-red-400">Customer Focus:</strong> Ensuring every customer has an amazing experience.
            <br />
            <strong className="text-red-400">Integrity:</strong> Acting honestly, ethically, and transparently.
            <br />
            <strong className="text-red-400">Innovation:</strong> Seeking creative and effective solutions.
            <br />
            <strong className="text-red-400">Collaboration:</strong> Believing in the power of teamwork.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Card Hover CSS Effects */}
      <style jsx>{`
        .card:hover .card-background {
          transform: scale(1.15) translateZ(0);
          background-size: 300px;
        }
        .card-grid:hover > .card:not(:hover) {
          transform: scale(0.9);
        }
        .card-grid:hover > .card:not(:hover) .card-background,
        .card-grid:hover > .card:not(:hover) .card-category {
          filter: brightness(0.5) saturate(0) contrast(1.2) blur(20px);
        }
      `}</style>
    </div>
  );
}
