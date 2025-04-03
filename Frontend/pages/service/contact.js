"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react"; // Optional: Install using `npm install lucide-react`

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12"
      style={{ backgroundImage: "url('/images/contact-image.jpg')" }} // ✅ Make sure this path matches your actual image file in /public/images
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Contact Us</h2>
        <p className="text-center text-gray-600 mb-6">
          We'd love to hear from you. Please fill out the form below.
        </p>

        {submitted && (
          <div className="flex items-center justify-center gap-2 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded mb-4">
            <CheckCircle className="w-5 h-5" />
            <span>Message sent! We’ll be in touch soon.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 transition text-white py-3 rounded-lg font-semibold"
          >
            Send Message
          </button>
        </form>

        <div className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} GlowGuide. All rights reserved.
        </div>
      </div>
    </div>
  );
}
