"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useState } from "react";

export default function Appointments() {
  const [appointments, setAppointments] = useState([
    { id: 1, client: "Laura Moore", service: "Lash Lift", date: "March 10, 2025", status: "Confirmed" },
    { id: 2, client: "Jack Smith", service: "Back Massage", date: "March 12, 2025", status: "Pending" },
    { id: 3, client: "Brittney Miller", service: "Facial", date: "March 15, 2025", status: "Confirmed" },
  ]);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Client</th>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-t">
                <td className="p-4">{appointment.client}</td>
                <td className="p-4">{appointment.service}</td>
                <td className="p-4">{appointment.date}</td>
                <td className="p-4">
                  {appointment.status === "Confirmed" ? (
                    <span className="text-green-600 flex items-center">
                      <FaCheckCircle className="mr-2" /> Confirmed
                    </span>
                  ) : (
                    <span className="text-yellow-600 flex items-center">
                      <FaTimesCircle className="mr-2" /> Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
