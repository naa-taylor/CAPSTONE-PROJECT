"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const imageData = [
  { src: "/images/asian-waves.jpg", alt: "Hairstyle 1" },
  { src: "/images/Platinum Blonde Portrait.jpeg", alt: "Hairstyle 2" },
  { src: "/images/Red Hair and Green Eyes.jpeg", alt: "Hairstyle 3" },
  { src: "/images/Portrait of a Young Woman.jpeg", alt: "Hairstyle 4" },
  { src: "/images/Elegant Portrait.jpeg", alt: "Hairstyle 5" },
  { src: "/images/south-asian-3b-hair.png", alt: "Hairstyle 6" },
  { src: "/images/Elegant Braided Portrait.jpeg", alt: "Hairstyle 7" },
  { src: "/images/Radiant Portrait.jpeg", alt: "Hairstyle 8" },
  { src: "/images/long-wavy-hair-curtain-bangs.jpg", alt: "Hairstyle 9" },
  { src: "/images/Elegant Woman with Braided Hair.jpeg", alt: "Hairstyle 10" },
  { src: "/images/Portrait of an albino woman.jpeg", alt: "Hairstyle 11" },
  { src: "/images/Thoughtful Portrait.jpeg", alt: "Hairstyle 12" },
  { src: "/images/Portrait of Young Woman.jpeg", alt: "Hairstyle 13" },
  { src: "/images/south asian curls.png", alt: "Hairstyle 14" },
];

export default function RotatingImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageData.length);
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #1D818A 0%, #421763 100%)",
      }}
    >
      <div
        className="relative w-[500px] h-[500px] flex items-center justify-center"
        style={{ perspective: "2200px" }}
      >
        {imageData.map((image, index) => {
          const offset = (index - currentIndex + imageData.length) % imageData.length;
          const rotation = offset * (360 / imageData.length);
          const isActive = offset === 0;

          return (
            <div
              key={index}
              className="absolute w-80 h-96 transition-transform duration-700 ease-in-out"
              style={{
                transform: `rotateY(${rotation}deg) translateZ(990px)`,
                opacity: isActive ? 1 : 0.7,
                backfaceVisibility: "hidden",
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={500}
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
