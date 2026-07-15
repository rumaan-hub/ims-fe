"use client";

import React from "react";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
      <head>
        <title>Dentistry99 — Inventory Management Software for Dental Practices</title>
        <meta name="description" content="Streamline your dental practice with Dentistry99. Real-time inventory tracking, staff management, and analytics built for modern dental offices." />
        <meta name="keywords" content="dental inventory management, dental practice software, dental supplies tracking, dental office management system" />
      </head>
      <body className={poppins.className} suppressHydrationWarning>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
