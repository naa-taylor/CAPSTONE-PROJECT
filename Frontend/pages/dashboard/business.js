"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { 
  FaFacebook, FaInstagram, FaTwitter, 
  FaCalendarCheck, FaUsers, FaCreditCard, 
  FaEnvelope, FaCog 
} from "react-icons/fa";

export default function BusinessDashboard() {
  const router = useRouter();

  useEffect(() => {
    console.log("Business Dashboard Loaded");
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">Business Dashboard</h1>
        <button 
          onClick={() => router.push("/")}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </header>

      {/* Sidebar & Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-black text-white shadow-md p-6 flex flex-col justify-between">
          <nav className="space-y-6">
            <button 
              onClick={() => router.push("/dashboard/appointments")} 
              className="flex items-center space-x-3 text-white hover:text-blue-400"
            >
              <FaCalendarCheck size={20} /> <span>Appointments</span>
            </button>
            <button 
              onClick={() => router.push("/dashboard/clients")} 
              className="flex items-center space-x-3 text-white hover:text-blue-400"
            >
              <FaUsers size={20} /> <span>Clients</span>
            </button>
            <button 
              onClick={() => router.push("/dashboard/payments")} 
              className="flex items-center space-x-3 text-white hover:text-blue-400"
            >
              <FaCreditCard size={20} /> <span>Payments</span>
            </button>
            <button 
              onClick={() => router.push("/dashboard/message")} 
              className="flex items-center space-x-3 text-white hover:text-blue-400"
            >
              <FaEnvelope size={20} /> <span>Messages</span>
            </button>

            {/* Social Media Section */}
            <div className="mt-10 border-t border-gray-600 pt-4">
              <h3 className="text-gray-400 text-sm mb-3">Social Media</h3>
              <div className="flex justify-around">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-blue-500"
                >
                  <FaFacebook size={24} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-pink-500"
                >
                  <FaInstagram size={24} />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-blue-400"
                >
                  <FaTwitter size={24} />
                </a>
              </div>
            </div>

            {/* Settings */}
            <button 
              onClick={() => router.push("/dashboard/settings")} 
              className="flex items-center space-x-3 text-white hover:text-blue-400 mt-6"
            >
              <FaCog size={20} /> <span>Settings</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold text-gray-700">Welcome to Your Business Dashboard</h2>
          <p className="text-gray-500">Manage your appointments, clients, and payments here.</p>
        </main>
      </div>
    </div>
  );
}
