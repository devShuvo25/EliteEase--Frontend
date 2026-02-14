import { ArrowRight, Terminal } from "lucide-react";
import Image from "next/image";
import React from "react";

const NewsLetterBanner = () => {
  // A professional, high-contrast tech hardware visual (Keyboard/Laptop detail)
  // This image has deep blacks and sharp highlights, perfect for a tech brand.
  const techHero = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="relative w-full overflow-hidden border border-ui-border bg-brand-primary dark:bg-[#050505] min-h-[400px] flex items-center group">
        
        {/* 1. ARCHITECTURAL OVERLAYS */}
        {/* Technical Grid */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[grid:32px_32px] [mask-image:linear-gradient(to_bottom,white,transparent)]" 
             style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)' }} />
        
        {/* Gold Glow behind image */}
        <div className="absolute -right-20 top-0 h-[500px] w-[500px] rounded-full bg-brand-accent/5 blur-[120px] transition-opacity duration-1000 group-hover:opacity-80" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full gap-12 px-8 md:px-20 py-12 lg:py-0">
          
          {/* TEXT & EMAIL FIELD SECTION */}
          <div className="flex-1 text-white space-y-10 text-center lg:text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="flex items-center justify-center bg-brand-accent/20 p-1.5">
                    <Terminal size={12} className="text-brand-accent" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent">
                  Encrypted Intelligence
                </span>
              </div>

              <h2 className="font-display text-4xl lg:text-6xl font-bold leading-[0.9] md:max-w-md mx-auto lg:mx-0 uppercase tracking-tighter">
                Lead the <br />
                <span className="italic font-medium text-brand-accent">Evolution</span>.
              </h2>
              
              <p className="text-blue-100/40 text-[11px] font-medium leading-relaxed md:max-w-xs mx-auto lg:mx-0 uppercase tracking-[0.2em]">
                Secure first-access to flagship inventory and architectural tech updates.
              </p>
            </div>

            {/* HIGH-TECH EMAIL FIELD */}
            <div className="relative max-w-md mx-auto lg:mx-0">
               <form className="relative flex group/form">
                <input 
                    type="email" 
                    required
                    placeholder="CORPORATE_EMAIL@ACCESS.SECURE" 
                    className="w-full bg-white/5 border border-white/10 px-6 py-5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white outline-none transition-all focus:border-brand-accent/40 focus:bg-white/[0.08]"
                />
                <button 
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 bg-brand-accent px-8 text-black transition-all hover:bg-white active:scale-95"
                >
                    <ArrowRight size={20} />
                </button>
              </form>
              
              {/* Technical detail under input */}
              <div className="mt-4 flex items-center justify-center lg:justify-start gap-4">
                 <div className="h-[1px] w-12 bg-white/10" />
                 <p className="text-[8px] text-white/20 uppercase tracking-[0.3em]">
                   Protocol: Secure Subscription v2.0
                 </p>
              </div>
            </div>
          </div>

          {/* IMAGE SECTION: Studio Product Shot */}
          <div className="flex-1 relative h-[300px] lg:h-[450px] w-full flex items-center justify-end">
             {/* Glass Overlay Plate */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] border border-white/5 bg-white/[0.01] backdrop-blur-3xl -rotate-6 transition-transform duration-1000 group-hover:rotate-0" />
             
             <Image
              src={techHero} 
              alt="Flagship Tech Hardware" 
              fill
              className="object-contain lg:object-right-bottom drop-shadow-[-30px_35px_50px_rgba(0,0,0,0.8)] transition-all duration-1000 group-hover:scale-110 group-hover:-translate-y-4"
              priority
            />
          </div>
        </div>

        {/* INTERACTIVE PROGRESS BAR (BOTTOM) */}
        <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-brand-accent transition-all duration-[1.5s] group-hover:w-full" />
      </div>
    </div>
  );
};

export default NewsLetterBanner;