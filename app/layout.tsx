"use client";

import Navbar from "@/components/Navbar";
import SolanaProviders from "@/components/SolanaProviders";
import "@/styles/global.css";

import "@solana/wallet-adapter-react-ui/styles.css";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SolanaProviders>
          <Navbar />
          <main>{children}</main>
        </SolanaProviders>
      </body>
    </html>
  );
}
