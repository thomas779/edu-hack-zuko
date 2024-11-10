"use client";
import "../globals.css";
import { Inter } from "next/font/google";

import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";
import RightSidebar from "@/components/shared/RightSidebar";
import { useEffect, useState } from "react";
import AuthUser from "@/components/shared/AuthUser";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Topbar />

        <main className="flex flex-row bg-[#EDEDE9]">
          <LeftSidebar />
          <section className="main-container">
            <div className="w-full max-w-4xl">{children}</div>
          </section>

          <div className="verticalLine"></div>
          <RightSidebar />
        </main>

        <Bottombar />
      </body>
    </html>
  );
}
