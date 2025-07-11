import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WakeServer from "./_Components/WakeServer"
import NoteProvider from "./_context/NoteProvider";
const inter = Inter({ subsets: ["greek"] });

export const metadata: Metadata = {
  title: "eChat",
  description: "Chat Application and Storage",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WakeServer></WakeServer>
        <NoteProvider>{children}</NoteProvider>
      </body>
    </html>
  );
}
