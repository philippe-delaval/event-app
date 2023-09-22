import React from "react";
import "../../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event App",
  description: "Created By David.R & Philippe.D",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <>
        <body className={inter.className}>{children}</body>
      </>
    </html>
  );
}
