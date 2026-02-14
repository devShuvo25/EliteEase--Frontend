import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Zap } from "lucide-react";

const TechBanner = () => {
  // Direct links to high-end, valid electronics imagery
  const laptopImg = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop"; // Silver Laptop
  const audioImg = "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop"; // Premium Headphones

  return (
    <section className="container mt-30 mx-auto px-4 py-2 grid grid-cols-1 lg:grid-cols-4 gap-4 font-body">
      
      {/* Main Hero Section - Editorial Tech Look */}
      <div className="relative lg:col-span-3 bg-white dark:bg-[#0a0a0c] border border-ui-border overflow-hidden flex flex-col md:flex-row items-center px-10 md:px-16 py-8 md:py-10 shadow-premium group/main">
        
        {/* Subtle Luxury Gradient */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-slate-50 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />
        
        <div className="z-10 flex-1 space-y-5 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/5 border border-brand-primary/10 text-brand-primary dark:text-brand-accent font-bold tracking-[0.3em] text-[9px] uppercase">
            <Cpu size={12} className="animate-pulse" />
            <span>Silicon Architecture 2026</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-brand-primary dark:text-white leading-[1.05] tracking-tight">
            Mastery in <br /> 
            <span className="text-brand-accent italic font-medium">Engineering.</span>
          </h1>
          
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto md:mx-0 font-light">
            The new M4 workstation. Performance redefined for those who demand absolute precision.
          </p>

          <div className="pt-2">
            <Button className="btn-primary px-10 group/btn transition-all duration-500">
              Configure <ArrowRight className="ml-3 h-3 w-3 transition-transform group-hover/btn:translate-x-2" />
            </Button>
          </div>
          
          {/* Architectural Progress Bar */}
          <div className="flex justify-center md:justify-start items-center gap-4 mt-8">
            <span className="text-[10px] font-bold tracking-tighter text-brand-primary">01</span>
            <div className="w-20 h-0.5 bg-brand-muted relative">
               <div className="absolute top-0 left-0 w-1/3 h-full bg-brand-accent transition-all duration-1000 group-hover/main:w-full" />
            </div>
            <span className="text-[10px] font-bold tracking-tighter text-brand-muted">03</span>
          </div>
        </div>

        {/* High-End Floating Image */}
        <div className="relative flex-1 h-62.5 md:h-87.5 w-full mt-8 md:mt-0 perspective-1000">
          <div className="relative w-full h-full transition-all duration-1000 group-hover/main:rotate-y-12 group-hover/main:-translate-y-4">
            <Image
              src={laptopImg}
              alt="Premium Workstation"
              fill
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Sidebar Promo - The "Obsidian" Edition */}
      <div className="relative lg:col-span-1 bg-brand-primary overflow-hidden flex flex-col p-8 border border-brand-primary group/side">
        
        {/* Soft Gold Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-accent/20 blur-[80px] rounded-full" />

        <div className="z-10 space-y-4">
          <div className="flex items-center gap-2 text-brand-accent">
            <Zap size={14} fill="currentColor" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Special Release</span>
          </div>
          
          <h2 className="text-2xl font-display font-bold text-white leading-tight">
            Studio <br /> Acoustics.
          </h2>
          
          <p className="text-brand-muted/40 text-[10px] leading-relaxed uppercase tracking-widest">
            Reference Grade <br /> Audio Hardware
          </p>
          
          <Button variant="ghost" className="h-auto p-0 hover:bg-transparent text-brand-accent flex items-center gap-2 group/link border-none">
            <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Inquire Now</span> 
            <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
          </Button>
        </div>

        <div className="relative flex-1 mt-8 min-h-[160px] lg:min-h-0 transition-all duration-700 group-hover/side:scale-110 group-hover/side:-rotate-6">
          <Image
            src={audioImg}
            alt="Reference Headphones"
            fill
            className="object-contain object-center contrast-[1.1] grayscale-[0.1]"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
        
        {/* Subtle Background Mark */}
        <div className="absolute bottom-4 left-8 text-white/5 font-display text-5xl font-black pointer-events-none tracking-tighter select-none">
          2026
        </div>
      </div>

    </section>
  );
};

export default TechBanner;