"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import { useState } from "react";

export default function Clients() {
  const [clients] = useState([
    { id: 1, name: "Laura Moore", phone: "(647) 510-7207", email: "laura@example.com" },
    { id: 2, name: "Jack Smith", phone: "(416) 302-9123", email: "jack@example.com" },
    { id: 3, name: "Brittney Miller", phone: "(905) 123-4567", email: "brittney@example.com" },
  ]);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Clients</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-blue-500" />
                    <span>{client.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <FaPhone className="text-green-500" />
                    <span>{client.phone}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <FaEnvelope className="text-gray-600" />
                    <span>{client.email}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
