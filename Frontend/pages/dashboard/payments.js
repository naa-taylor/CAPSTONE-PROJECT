"use client";
import { useState } from "react";
import { Button } from "@heroui/react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const mockTransactions = [
  { id: 1, client: "John Doe", amount: "$120.00", status: "Paid", method: "Credit Card", date: "Mar 7, 2025" },
  { id: 2, client: "Sarah Smith", amount: "$75.50", status: "Pending", method: "PayPal", date: "Mar 6, 2025" },
  { id: 3, client: "David Johnson", amount: "$200.00", status: "Paid", method: "Stripe", date: "Mar 5, 2025" },
];

const earningsData = [
  { month: "Jan", earnings: 1500 },
  { month: "Feb", earnings: 2200 },
  { month: "Mar", earnings: 1800 },
  { month: "Apr", earnings: 2400 },
  { month: "May", earnings: 2000 },
];

export default function Payments() {
  const [balance, setBalance] = useState(500); // Mock balance

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payments & Earnings</h1>

      {/* Earnings Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Total Earnings</h2>
        <p className="text-3xl font-bold text-green-600">${balance.toFixed(2)}</p>
        <Button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          onPress={() => alert("Payout requested!")}
        >
          Request Payout
        </Button>
      </div>

      {/* Earnings Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Earnings Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={earningsData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="earnings" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Client</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Method</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((tx) => (
              <tr key={tx.id} className="border-t">
                <td className="p-2">{tx.client}</td>
                <td className="p-2">{tx.amount}</td>
                <td className={`p-2 ${tx.status === "Paid" ? "text-green-600" : "text-orange-600"}`}>{tx.status}</td>
                <td className="p-2">{tx.method}</td>
                <td className="p-2">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
