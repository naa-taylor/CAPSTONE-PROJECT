import { useRouter } from "next/router";
import { Button } from "@heroui/react";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slideshow images
  const slides = [
    "/images/salon1.jpg",
    "/images/salon2.jpg",
    "/images/salon3.jpg",
  ];

  // Function to switch slides
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-white">
      {/* Slideshow */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={slides[currentSlide]}
          alt="Hair Salon"
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-1000"
        />
      </div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold">Welcome to GlowGuide</h1>
        <p className="mt-2 text-lg md:text-xl">
          Discover and book top hair salon professionals near you.
        </p>

        {/* Login Button */}
        <Button
          color="primary"
          size="lg"
          className="mt-6"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
