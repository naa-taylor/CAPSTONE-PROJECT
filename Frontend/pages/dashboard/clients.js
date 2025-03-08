"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import { useState } from "react";

export default function Clients() {
  const [clients, setClients] = useState([
    { id: 1, name: "Laura Moore", phone: "(647) 510-7207", email: "laura@example.com" },
    { id: 2, name: "Jack Smith", phone: "(416) 302-9123", email: "jack@example.com" },
    { id: 3, name: "Brittney Miller", phone: "(905) 123-4567", email: "brittney@example.com" },
  ]);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Clients</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-t">
                <td className="p-4 flex items-center space-x-2">
                  <FaUser className="text-blue-500" /> <span>{client.name}</span>
                </td>
                <td className="p-4 flex items-center space-x-2">
                  <FaPhone className="text-green-500" /> <span>{client.phone}</span>
                </td>
                <td className="p-4 flex items-center space-x-2">
                  <FaEnvelope className="text-gray-500" /> <span>{client.email}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
