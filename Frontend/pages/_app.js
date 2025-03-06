"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css"; // Ensure the correct path
import { SessionProvider } from "next-auth/react"; // Import SessionProvider
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
    <SessionProvider session={pageProps.session}> {/* ✅ Wrap App with SessionProvider */}
      <Providers>
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Component {...pageProps} />
        </div>
      </Providers>
    </SessionProvider>
  );
}

export default MyApp;
