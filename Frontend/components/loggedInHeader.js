import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      fetch(`http://localhost:5000/profile?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.firstName) {
            setFirstName(data.firstName);
          }
        });
    }
  }, []);

  return (
    <header className="bg-black text-white p-4 flex items-center justify-between relative">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link href="/" passHref>
          <Image 
            src="/images/logo.png"
            alt="GlowGuide Logo"
            width={60}
            height={60}
          />
        </Link>
      </div>

      {/* Profile Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 
            12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 
            20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
        </svg>
      </button>

        {/* Overlay + Slide-in Modal */}
        {showModal && (
        <>
            {/* Overlay (click to close) */}
            <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setShowModal(false)}
            ></div>

            {/* Slide-in Modal */}
            <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-6 z-50 w-64 transform transition-transform duration-300 ease-in-out animate-slide-in">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Hi {firstName}</h2>
                <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setShowModal(false)}
                >
                ✕
                </button>
            </div>
            <hr className="mb-4" />
            <div className="flex flex-col space-y-2">
                <Link
                href="/customer/profile"
                className="text-blue-600 hover:underline text-sm"
                onClick={() => setShowModal(false)}
                >
                Go to Profile
                </Link>
                <button
                className="text-blue-600 hover:underline text-sm text-left"
                onClick={() => {
                    localStorage.clear();
                    setShowModal(false);
                    router.push("/customer/bookings", "_blank");
                }}
                >
                Make bookings
                </button>
                <button
                className="text-blue-600 hover:underline text-sm text-left"
                onClick={() => {
                    localStorage.clear();
                    setShowModal(false);
                    router.push("/customer/login");
                }}
                >
                Logout
                </button>
            </div>
            </div>
        </>
        )}

    </header>
  );
}
