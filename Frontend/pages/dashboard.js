"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { FaCalendar, FaUsers, FaDollarSign } from "react-icons/fa";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Bookings */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex items-center space-x-4">
          <FaCalendar className="text-blue-500 text-3xl" />
          <div>
            <h2 className="text-xl font-bold">12</h2>
            <p className="text-gray-500">Total Bookings</p>
          </div>
        </div>

        {/* Total Clients */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex items-center space-x-4">
          <FaUsers className="text-green-500 text-3xl" />
          <div>
            <h2 className="text-xl font-bold">34</h2>
            <p className="text-gray-500">Total Clients</p>
          </div>
        </div>

        {/* Earnings */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex items-center space-x-4">
          <FaDollarSign className="text-yellow-500 text-3xl" />
          <div>
            <h2 className="text-xl font-bold">$1,500</h2>
            <p className="text-gray-500">Total Earnings</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
