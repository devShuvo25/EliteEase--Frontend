"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Zap } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

/**
 * TechBanner Component - Low Height Version
 * Optimized for minimal vertical space while retaining premium branding.
 */
const TechBanner = () => {
  const { isSearching } = useAppSelector((state) => state.search);

  if (isSearching) return null;

  const laptopImg = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop"; 
  const audioImg = "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop"; 

  return (
    <section className="container mx-auto px-4 py-2 grid grid-cols-1 lg:grid-cols-4 gap-3 font-body animate-in fade-in duration-500"> 
      
      {/* Main Hero - Compact Workstation */}
      <div className="relative lg:col-span-3 bg-white dark:bg-[#0a0a0c] border border-ui-border overflow-hidden flex flex-col md:flex-row items-center px-8 md:px-12 py-6 shadow-sm group/main rounded-xl">
        
        <div className="z-10 flex-1 space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-brand-primary/5 border border-brand-primary/10 text-brand-primary font-bold tracking-[0.2em] text-[8px] uppercase">
            <Cpu size={10} />
            <span>Silicon 2026</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
            Mastery in <span className="text-brand-accent italic font-medium">Engineering.</span>
          </h1>
          
          <p className="text-gray-500 text-[12px] leading-snug max-w-xs mx-auto md:mx-0">
            The M4 workstation. Precision performance redefined.
          </p>

          <div className="pt-1">
            <Button size="sm" className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-none px-6 h-9 text-[11px] group/btn transition-all">
              Configure <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Reduced Height Image Container */}
        <div className="relative flex-1 h-48 md:h-56  w-full mt-4 md:mt-0">
          <div className="relative w-full h-full transition-transform duration-500 group-hover/main:scale-105">
            <Image
              src={laptopImg}
              alt="Workstation"
              fill
              className="object-contain drop-shadow-xl"
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      </div>

      {/* Sidebar - Compact Audio */}
      <div className="relative rounded-xl lg:col-span-1 bg-brand-primary overflow-hidden flex flex-row lg:flex-col items-center lg:items-start p-6 border border-brand-primary group/side">
        <div className="z-10 space-y-2 flex-1">
          <div className="flex items-center gap-1 text-brand-accent">
            <Zap size={12} fill="currentColor" />
            <span className="text-[8px] font-black uppercase tracking-widest">Studio</span>
          </div>
          
          <h2 className="text-xl font-display font-bold text-white leading-tight">
            Acoustics.
          </h2>
          
          <Button variant="link" className="h-auto p-0 text-brand-accent hover:text-white text-[9px] uppercase tracking-widest no-underline border-none group/link">
            Explore <ArrowRight className="h-2.5 w-2.5 ml-1 transition-transform group-hover/link:translate-x-1" />
          </Button>
        </div>

        {/* Small Audio Image */}
        <div className="relative w-24 h-24 lg:w-full lg:h-32 mt-0 lg:mt-4 transition-transform duration-500 group-hover/side:scale-110">
          <Image
            src={audioImg}
            alt="Audio"
            fill
            className="object-contain"
            sizes="150px"
          />
        </div>
        
        <div className="absolute -bottom-2 -right-1 text-white/5 font-display text-4xl font-black pointer-events-none select-none">
          26
        </div>
      </div>
    </section>
  );
};

export default TechBanner;