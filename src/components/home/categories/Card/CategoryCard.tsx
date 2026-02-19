"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface Category {
  name: string;
  cover: string;
}

type CategoryCardProps = {
  category: Category;
  className?: string;
};

export function CategoryCard({ category, className }: CategoryCardProps) {
  const { name, cover } = category;

  return (
    <div 
      className={cn(
        "group relative flex cursor-pointer flex-col items-center gap-3 w-full max-w-37.5",
        className
      )}
    >
      {/* FULL COVER CIRCULAR DISPLAY */}
      <div className="relative aspect-square w-full overflow-hidden rounded-full border-2 border-transparent transition-all duration-500 ease-in-out group-hover:shadow-[0_0_30px_rgba(var(--brand-primary-rgb),0.3)] group-hover:-translate-y-2 group-hover:border-brand-primary/50">
        
        {/* THE IMAGE (Full Cover) */}
        <div className="relative h-full w-full">
          <Image
            src={cover}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="150px"
            priority
          />
          
          {/* PREMIUM OVERLAY GRADIENT (Ensures depth) */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />
        </div>

        {/* GLOSS EFFECT (Tech Aesthetic) */}
        <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none" />
      </div>

      {/* TYPOGRAPHY SECTION */}
      <div className="relative flex flex-col items-center pt-1">
        <h3 className="text-center text-[13px] md:text-[14px] font-bold tracking-tight text-gray-800 transition-colors duration-300 group-hover:text-brand-primary">
          {name}
        </h3>
        
        {/* PREMIUM EXPANDING UNDERLINE */}
        <div className="mt-1 h-0.5 w-0 bg-brand-primary transition-all duration-500 group-hover:w-10 rounded-full" />
      </div>
    </div>
  );
}