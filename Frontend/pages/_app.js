"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css"; // Ensure the correct path
import { Providers } from "./providers"; // Ensure the correct path

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Component {...pageProps} />
      </div>
    </Providers>
  );
}

export default MyApp;
