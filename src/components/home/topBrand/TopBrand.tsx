/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { brands } from "@/constant/brand";
import { MoveRight, ShieldCheck, Cpu } from "lucide-react";
import Image from "next/image";
import React from "react";

const TopBrand = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* 1. LIGHT INDUSTRIAL HEADER */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner">
            <Cpu size={22} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
               <ShieldCheck size={12} className="text-blue-500" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">
                 Certified Ecosystem
               </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-black tracking-tighter text-slate-900 uppercase">
              Global <span className="text-blue-600 italic font-medium">Powerhouses</span>
            </h2>
          </div>
        </div>

        <button className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all">
          Explore All Partners
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 transition-all group-hover:bg-blue-600 group-hover:text-white">
            <MoveRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </div>
        </button>
      </div>
      
      {/* 2. LOGO GRID - Premium Light Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {brands.map((brand) => (
          <div 
            key={brand.id}
            className="group relative flex h-28 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)]"
          >
            {/* Subtle Gradient Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Logo Container */}
            <div className="relative z-10 w-24 h-12  opacity-50 group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-90 group-hover:scale-105">
              <Image 
                src={brand.icon} 
                alt={brand.title} 
                fill
                className="object-contain" 
              />
            </div>

            {/* Micro-Details */}
            <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
               <span className="text-[7px] font-black text-blue-500 uppercase">Official</span>
               <div className="h-1 w-1 rounded-full bg-blue-500 animate-pulse" />
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-3 h-0.5 w-0 bg-blue-500/20 transition-all duration-500 group-hover:w-12" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBrand;