"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Zap } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

const TechBanner = () => {
  const { isSearching } = useAppSelector((state) => state.search);

  if (isSearching) return null;

  const laptopImg = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop"; 
  const audioImg = "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop"; 

  return (
    <section className="container mx-auto px-4 py-2 grid grid-cols-1 lg:grid-cols-4 gap-3 font-body animate-in fade-in duration-500"> 
      
      {/* Main Hero - Always visible */}
<div className="relative lg:col-span-3 bg-[#0a0a0c] border border-white/5 overflow-hidden flex flex-col md:flex-row items-center px-6 md:px-12 py-8 md:py-6 shadow-2xl group/main rounded-xl">
  
  {/* RELEVANT TECH BACKGROUND */}
  <div className="absolute inset-0 z-0 select-none pointer-events-none">
    <Image
      src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop"
      alt="Elite Tech Background"
      fill
      className="object-cover opacity-20 mix-blend-screen transition-transform duration-1000 group-hover/main:scale-110"
      priority
    />
    {/* Radial vignette to keep center clean */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0c_90%)]" />
  </div>

  <div className="z-10 flex-1 space-y-2 text-center md:text-left">
    {/* Badge - Smaller padding */}
    <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-white/5 border border-white/10 text-brand-accent font-bold tracking-[0.2em] text-[8px] uppercase backdrop-blur-md">
      <Cpu size={10} className="animate-pulse" />
      <span>Silicon 2026</span>
    </div>
    
    {/* Headline - Adjusted size for low height */}
    <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight tracking-tight">
      Your Gateway to <br className="hidden md:block" />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 italic font-medium">
        Elite Technology.
      </span>
    </h1>
    
    {/* Description - Smaller text */}
    <p className="text-gray-400 text-[11px] md:text-xs leading-snug max-w-xs mx-auto md:mx-0">
      The M4 workstation. Precision performance redefined.
    </p>

    {/* Button - Compact size */}
    <div className="pt-2">
      <Button size="sm" className="bg-white text-black hover:bg-brand-accent hover:text-white rounded-none px-6 h-9 text-[11px] font-bold group/btn transition-all">
        Configure <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
      </Button>
    </div>
  </div>

  {/* Hero Image - Scaled down height */}
  <div className="relative  z-10 flex-1 h-40 md:h-56 w-full mt-4 md:mt-0">
    <div className="relative rounded-2xl w-full h-full transition-transform duration-700 group-hover/main:scale-105">
      <Image
        src={laptopImg}
        alt="M4 Workstation"
        fill
        className="rounded-2xl object-contain drop-shadow-[0_10px_30px_rgba(255,255,255,0.05)]"
        priority
      />
    </div>
  </div>
</div>

      {/* Sidebar - HIDDEN ON MOBILE (hidden lg:flex) */}
      <div className="relative rounded-xl lg:col-span-1 bg-brand-primary overflow-hidden hidden lg:flex flex-col items-start p-6 border border-brand-primary group/side">
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
        <div className="relative w-full h-32 mt-4 transition-transform duration-500 group-hover/side:scale-110">
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