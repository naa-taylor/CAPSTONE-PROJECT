"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HowItWorksSection() {
  return (
    <section className="bg-white py-24 px-6 md:px-16 space-y-32">
      {/* Section 1 */}
      <motion.div
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Content */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Appointments done better</h2>
          <p className="text-gray-600 text-lg mb-4">
            Looking for your next appointment with a local barber, hair stylist, massage therapist or nail artist?
            Need appointment booking for a beard trim, an eyebrow wax, or a deep tissue massage?
          </p>
          <p className="text-gray-600 text-lg mb-4">
            GlowGuide makes it easy to find and book within seconds. No more phone tag.
            Book anytime, from anywhere, <strong>24/7</strong>.
          </p>
          <p className="font-semibold text-gray-800">
            Discover top businesses in your area and book instantly with GlowGuide.
          </p>
        </div>
        <div className="md:w-1/2">
          <Image src="/images/appointment.svg" alt="Book instantly" width={500} height={500} />
        </div>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between gap-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="md:w-1/2">
          <Image src="/images/notifications.svg" alt="Reminders" width={500} height={500} />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Something come up? We’ve got you.</h2>
          <p className="text-gray-600 text-lg mb-4">
            Download GlowGuide, a free online appointment booking app, and manage your appointments from anywhere.
            Reschedule or cancel without picking up the phone.
          </p>
          <p className="text-gray-600 text-lg">
            And because we know life gets busy, we’ll send you reminders. You’ll never forget or miss out on another appointment.
          </p>
        </div>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Book with the best, near you</h2>
          <p className="text-gray-600 text-lg mb-4">
            Take a scroll around the block to see top health and beauty businesses on GlowGuide’s marketplace.
          </p>
          <p className="text-gray-600 text-lg mb-4">
            Check out their vibe from their business profile and hear what other people are saying with verified reviews.
            You can even look through their portfolio of work.
          </p>
          <p className="text-gray-600 text-lg">
            Save time and leave the stress to someone else. With GlowGuide, setting up your next beauty appointment is free and easy.
          </p>
        </div>
        <div className="md:w-1/2">
          <Image src="/images/review-profile.svg" alt="Top rated pros" width={500} height={500} />
        </div>
      </motion.div>
    </section>
  );
}
