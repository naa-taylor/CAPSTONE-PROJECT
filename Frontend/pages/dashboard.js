"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { FaCalendar, FaUsers, FaDollarSign, FaChartLine, FaStar } from "react-icons/fa";
import UploadImages from "@/components/uploadImages";

export default function Dashboard() {
  // You can re-add localStorage logic later if needed
  const businessName = "Your Business Name";
  const businessId = "Not available";

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome, {businessName}</h1>
        <p className="text-gray-600">Business ID: {businessId}</p>
      </div>

      {/* 📸 Image Upload Section */}
      <UploadImages businessId={"placeholder-id"} />

      {/* 📊 Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Bookings */}
        <Card icon={<FaCalendar className="text-blue-500 text-3xl" />} title="Total Bookings" value="—" desc="Track all completed appointments." />

        {/* Clients */}
        <Card icon={<FaUsers className="text-green-500 text-3xl" />} title="Clients" value="—" desc="View and manage your loyal client list." />

        {/* Earnings */}
        <Card icon={<FaDollarSign className="text-yellow-500 text-3xl" />} title="Total Earnings" value="—" desc="Keep track of your total revenue." />

        {/* Upcoming Appointments */}
        <Card icon={<FaCalendar className="text-purple-500 text-3xl" />} title="Upcoming Appointments" value="—" desc="See what’s coming up next." />

        {/* Analytics */}
        <Card icon={<FaChartLine className="text-red-500 text-3xl" />} title="Business Analytics" value="—" desc="Insights into your growth and trends." />

        {/* Average Rating */}
        <Card icon={<FaStar className="text-yellow-400 text-3xl" />} title="Avg Rating" value="—" desc="Monitor your customer satisfaction." />
      </div>
    </DashboardLayout>
  );
}

function Card({ icon, title, value, desc }) {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg space-y-2">
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <h2 className="text-xl font-bold">{value}</h2>
          <p className="text-gray-500">{title}</p>
        </div>
      </div>
      <p className="text-sm text-gray-400 mt-2">{desc}</p>
    </div>
  );
}
