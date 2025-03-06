import Header from "../../components/header";
import Footer from "../../components/footer";
import { useState } from "react";
import { Button, Input, Card } from "@heroui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ImageGrid from "../../components/imagegrid"; // Import the ImageGrid component

export default function Home() {
  const router = useRouter();
  const [userType, setUserType] = useState("client");

  return (
    <div className="w-full">
      {/* Header */}
      <Header />

      {/* Hero Section with Image Grid */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-center bg-black pb-40">
        <h1 className="text-white text-5xl md:text-6xl font-bold mt-10">Welcome to GlowGuide</h1>
        <p className="mt-2 text-lg md:text-xl text-gray-300">
          Discover and book top hair salon professionals near you.
        </p>
        
        {/* Search Bar */}
        <div className="mt-6 w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search hair salons"
              className="w-full p-4 pl-10 rounded-full border-none text-black"
            />
            <span className="absolute left-3 top-4 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <Button
            color="primary"
            size="lg"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            onPress={() => router.push("/service/login")}
          >
            Login
          </Button>
          <Button
            color="secondary"
            size="lg"
            className="bg-gray-700 text-white px-6 py-3 rounded-lg"
            onPress={() => router.push("/list-business")}
          >
            List Your Business
          </Button>
        </div>

        {/* FUTURISTIC IMAGE GRID SECTION */}
        <div className="relative w-full mt-16 z-0">
          <ImageGrid />
        </div>
      </div>

      {/* Features Section - No Overlap */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-12 bg-gray-50">
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Find & book an appointment</h2>
          <p className="mt-2 text-gray-700">
            Cut the phone tag. Find your next hair appointment and book instantly anytime, anywhere.
          </p>
          <Button className="mt-4 bg-blue-500 text-white">Download App</Button>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">GlowGuide for Your Business</h2>
          <p className="mt-2 text-gray-700">
            Get started with GlowGuide to run your business better. Calendar, booking, and payments all in one.
          </p>
          <Button
            color="secondary"
            size="lg"
            className="bg-gray-700 text-white px-6 py-3 rounded-lg"
            onPress={() => window.open("/service/grow-business", "_blank")}
          >
            Grow My Business
          </Button>
        </div>
      </div>

      {/* Login Section */}
      <div className="flex justify-center items-center py-20 bg-gray-100">
        <Card className="p-6 w-96 shadow-lg bg-white">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <p className="text-center text-gray-500">Choose your account type</p>

          <div className="flex justify-between my-4">
            <Button
              variant={userType === "client" ? "solid" : "bordered"}
              onPress={() => setUserType("client")}
            >
              Client
            </Button>
            <Button
              variant={userType === "business" ? "solid" : "bordered"}
              onPress={() => setUserType("business")}
            >
              Business
            </Button>
          </div>

          <Input type="email" placeholder="Enter your email" className="mt-4" />
          <Input type="password" placeholder="Enter your password" className="mt-4" />

          <Button color="primary" className="w-full mt-4" onPress={() => signIn("credentials", { role: userType })}>
            Continue as {userType === "client" ? "Client" : "Business"}
          </Button>

          <Button
            color="danger"
            variant="bordered"
            className="w-full mt-4"
            onPress={() => signIn("google")}
          >
            Continue with Google
          </Button>

          <p className="text-center text-gray-500 mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-primary">
              Sign up
            </a>
          </p>
        </Card>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
