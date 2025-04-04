"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChartBar, FaCalendarCheck, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear(); // Optional: clear session/token data
    router.push("/");     // Redirect to home page
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`bg-black text-white ${isSidebarOpen ? "w-64" : "w-20"} transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && <h1 className="text-lg font-bold">GlowGuide Business</h1>}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-white focus:outline-none">
            {isSidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="flex flex-col space-y-4 p-4">
          <Link href="/dashboard">
            <div className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
              <FaChartBar /> {isSidebarOpen && <span>Dashboard</span>}
            </div>
          </Link>
          <Link href="/dashboard/appointments">
            <div className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
              <FaCalendarCheck /> {isSidebarOpen && <span>Appointments</span>}
            </div>
          </Link>
          <Link href="/dashboard/clients">
            <div className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
              <FaUsers /> {isSidebarOpen && <span>Clients</span>}
            </div>
          </Link>
          <Link href="/dashboard/settings">
            <div className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
              <FaCog /> {isSidebarOpen && <span>Settings</span>}
            </div>
          </Link>

          {/* ✅ Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
          >
            <FaSignOutAlt /> {isSidebarOpen && <span>Logout</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <header className="bg-white p-4 shadow flex justify-between items-center">
          <h1 className="text-lg font-semibold">Business Dashboard</h1>
          <Image src="/images/logo.png" alt="Logo" width={100} height={40} />
        </header>

        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
