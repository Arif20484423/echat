import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SetSocket from "./_Components/SetSocket";
import NoteProvider from "./_context/NoteProvider";
import SetUser from "./_Components/SetUser";
const inter = Inter({ subsets: ["greek"] });

export const metadata:Metadata = {
  title: "eChat",
  description: "Chat Application",
};

export default async function RootLayout({ children }:{children:React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NoteProvider>
          
          {children}
        </NoteProvider>
      </body>
    </html>
  );
}
