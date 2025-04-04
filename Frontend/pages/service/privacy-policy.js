"use client";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#1D818A] to-[#421763]">
      <div className="max-w-4xl mx-auto px-6 py-16 text-white">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-6 text-lg">
          This Privacy Policy describes how GlowGuide collects, uses, and protects your personal information when you use our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Personal Information: name, email, phone number, and address.</li>
          <li>Booking Data: services you book, preferred professionals, and reviews.</li>
          <li>Usage Data: device type, IP address, and browsing behavior.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide and manage appointment bookings.</li>
          <li>To send confirmations, reminders, and notifications.</li>
          <li>To personalize your experience and improve our platform.</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Sharing Your Information</h2>
        <p className="mb-4">We may share your information with:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Service providers (stylists, salons, etc.) to fulfill your bookings.</li>
          <li>Third-party tools for analytics and marketing (e.g., Google Analytics).</li>
          <li>Legal authorities if required by law.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, update, or delete your personal information. To make a request, contact us at <a href="mailto:support@glowguide.com" className="text-blue-300 underline">support@glowguide.com</a>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
        <p className="mb-4">
          We take reasonable measures to protect your personal data using encryption, access controls, and secure infrastructure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Changes will be posted here with a new effective date.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@glowguide.com" className="text-blue-300 underline">support@glowguide.com</a>.
        </p>

        <p className="text-sm mt-10 text-gray-300">
          Last updated: April 3, 2025
        </p>
      </div>
    </div>
  );
}
