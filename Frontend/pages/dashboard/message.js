"use client";
import { useState } from "react";
import { Button } from "@heroui/react";

export default function Messages() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Client", text: "Hey! Do you have any openings for tomorrow?" },
    { id: 2, sender: "You", text: "Yes! We have slots available at 3 PM and 5 PM." },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { id: messages.length + 1, sender: "You", text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Messaging System</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        {/* Messages Display */}
        <div className="h-64 overflow-y-auto border p-4 rounded-md">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 my-2 rounded-lg ${
                msg.sender === "You" ? "bg-blue-500 text-white text-right" : "bg-gray-200 text-black"
              }`}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex mt-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-2"
            onPress={sendMessage}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
