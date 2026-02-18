"use client";

import { DashboardSidebar } from "@/components/dashoboard/Sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header Section: Persistent across dashboard pages */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#37393F]">Your Account</h1>
          <p className="text-gray-500 text-sm mt-1">
            Alex John, Email:{" "}
            <span className="text-gray-900 font-medium italic">
              alexjohn@gmail.com
            </span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar: Navigation component */}
          <aside className="shrink-0 w-full md:w-64">
            <DashboardSidebar />
          </aside>

          {/* Main Viewport */}
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}