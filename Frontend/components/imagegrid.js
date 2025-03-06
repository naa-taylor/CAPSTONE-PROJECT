"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const imageData = [
    { src: "/images/Platinum Blonde Portrait.jpeg", alt: "Hairstyle 1" },
    { src: "/images/Red Hair and Green Eyes.jpeg", alt: "Hairstyle 2" },
    { src: "/images/Portrait of a Young Woman.jpeg", alt: "Hairstyle 3" },
    { src: "/images/Elegant Portrait.jpeg", alt: "Hairstyle 4" },
    { src: "/images/Elegant Braided Portrait.jpeg", alt: "Hairstyle 5" },
    { src: "/images/Radiant Portrait.jpeg", alt: "Hairstyle 6" },
    { src: "/images/Elegant Woman with Braided Hair.jpeg", alt: "Hairstyle 7" },
    { src: "/images/Portrait of an albino woman.jpeg", alt: "Hairstyle 8" },
    { src: "/images/Thoughtful Portrait.jpeg", alt: "Hairstyle 9" },
    { src: "/images/Portrait of Young Woman.jpeg", alt: "Hairstyle 10" },
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
    <div className="relative flex items-center justify-center h-screen bg-black overflow-hidden">
      <div
        className="relative w-96 h-96 flex items-center justify-center"
        style={{ perspective: "1800px" }} // Increased depth for spacing
      >
        {imageData.map((image, index) => {
          const offset = (index - currentIndex + imageData.length) % imageData.length;
          const rotation = offset * (360 / imageData.length); // Evenly distribute images
          const isActive = offset === 0;

          return (
            <div
              key={index}
              className="absolute w-80 h-96 transition-transform duration-700 ease-in-out"
              style={{
                transform: `rotateY(${rotation}deg) translateZ(750px)`, // Increased distance for spacing
                opacity: isActive ? 1 : 0.7,
                backfaceVisibility: "hidden", // Prevents image doubling
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
