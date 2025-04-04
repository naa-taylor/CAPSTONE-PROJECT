"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HowItWorksSection() {
  return (
    <section className="bg-[linear-gradient(90deg,_#1D818A_0%,_#421763_100%)] py-24 px-6 md:px-16 space-y-32 text-white">
      {/* Section 1 */}
      <motion.div
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4">Appointments done better</h2>
          <p className="text-white/80 text-lg mb-4">
                      Looking for your next appointment with a local hairstylist who truly understands your style?
                      Whether you're in the mood for a chic cut, a silk press, or a vibrant color refresh—GlowGuide connects you with top women hairstylists near you in seconds.
                      No more phone calls or waiting games. Book anytime, from anywhere, 24/7.
                      Discover your perfect look and book instantly with GlowGuide.


          </p>
          <p className="text-white/80 text-lg mb-4">
            GlowGuide makes it easy to find and book within seconds. No more phone tag.
            Book anytime, from anywhere, <strong className="text-white">24/7</strong>.
          </p>
          <p className="font-semibold text-white">
            Discover top businesses in your area and book instantly with GlowGuide.
          </p>
        </div>

        {/* Wavy/Wobbly Image Animation */}
        <motion.div
          className="md:w-1/2 relative z-10"
          whileHover={{
            rotate: [0, 1, -1, 1, -1, 0],
            scale: [1, 1.03, 1.02, 1.04, 1.02, 1],
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <div
            className="shadow-2xl overflow-hidden w-full h-auto"
            style={{
              borderRadius: "43% 57% 65% 35% / 30% 38% 62% 70%",
              transition: "all 0.4s ease-in-out",
            }}
          >
            <Image
              src="/images/GettyImages-1339268655.jpg"
              alt="Book instantly"
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between gap-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="md:w-1/2 relative z-10">
          <div
            className="shadow-2xl overflow-hidden w-full h-auto"
            style={{
              borderRadius: "65% 35% 50% 50% / 30% 45% 55% 70%",
              transition: "all 0.4s ease-in-out",
            }}
          >
            <Image
              src="/images/calendar.jpg"
              alt="Reminders"
              width={500}
              height={500}
              className="w-full h-auto object-cover object-bottom"
            />
          </div>
        </div>

        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4">Something come up? We’ve got you.</h2>
          <p className="text-white/80 text-lg mb-4">
              GlowGuide is your go-to online platform for booking hair appointments—no downloads needed.
              Manage your bookings, reschedule, or cancel anytime—all without picking up the phone.


          </p>
          <p className="text-white/80 text-lg">
            And because we know life gets busy, we’ll send you reminders.
            You’ll never forget or miss out on another appointment.
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
          <h2 className="text-4xl font-bold mb-4">Book with the best, near you</h2>
          <p className="text-white/80 text-lg mb-4">
            Take a scroll around the block to see top health and beauty businesses on GlowGuide’s marketplace.
          </p>
          <p className="text-white/80 text-lg mb-4">
            Check out their vibe from their business profile and hear what other people are saying with verified reviews.
            You can even look through their portfolio of work.
          </p>
          <p className="text-white/80 text-lg">
            Save time and leave the stress to someone else.
            With GlowGuide, setting up your next beauty appointment is free and easy.
          </p>
        </div>
        <div className="md:w-1/2">
          <Image src="/images/review-profile.svg" alt="Top rated pros" width={500} height={500} />
        </div>
      </motion.div>
    </section>
  );
}
