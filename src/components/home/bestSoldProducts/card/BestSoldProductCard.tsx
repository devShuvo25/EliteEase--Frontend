"use client";
import { ProductCardProps } from "@/types/product";
import { MoveUpRight, Zap } from "lucide-react";
import Image from "next/image";
import React from "react";

const BestSoldProduct = (props: ProductCardProps & { rank?: number }) => {
  const { product } = props;
  const { title, image, currentPrice, originalPrice } = product || {};

  return (
    <div className="relative group mx-auto flex h-[320px] w-full max-w-2xl items-center overflow-hidden border border-ui-border bg-[#F8F8F8] dark:bg-[#080808] transition-all duration-700 hover:shadow-2xl">
      {/* 1. TEXT CONTENT - Layered OVER the image with a subtle gradient for readability */}
      <div className="relative z-20 flex flex-col gap-5 pl-8 md:pl-14 w-full max-w-[60%]">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-6 bg-brand-accent" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-accent">
              Limited Edition
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[0.9] text-brand-primary dark:text-white uppercase tracking-tighter">
            {title}
          </h2>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-muted-foreground/60 line-through">
            BDT {originalPrice?.toLocaleString()}
          </span>
          <span className="font-display text-3xl font-black text-brand-primary dark:text-brand-accent">
            <span className="text-xs mr-1 font-normal opacity-50 italic">
              BDT
            </span>
            {currentPrice?.toLocaleString()}
          </span>
        </div>

        <button className="group/btn relative mt-2 flex w-fit items-center gap-3 bg-brand-primary dark:bg-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white dark:text-black transition-all">
          <span className="relative z-10">Purchase Now</span>
          <MoveUpRight
            size={14}
            className="relative z-10 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
          />
          {/* Button Hover Fill */}
          <div className="absolute inset-0 bg-brand-accent translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0" />
        </button>
      </div>

      {/* 2. FULL CONTAINER IMAGE - Set to fill height and width */}
      <div className="absolute inset-0 z-10 h-full w-full overflow-hidden">
        {/* Subtle Overlay to ensure text remains sharp */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#F8F8F8] via-[#F8F8F8]/80 to-transparent dark:from-[#080808] dark:via-[#080808]/80" />

        <div className="relative h-full w-full transition-transform duration-1000 ease-out group-hover:scale-110">
          <Image
            src={image ?? "/images/placeholder.png"}
            alt={title || "Product"}
            fill
            className="object-contain object-right md:object-right-bottom p-4 md:p-0 transition-all duration-700 drop-shadow-[-20px_20px_30px_rgba(0,0,0,0.1)]"
            priority
          />
        </div>
      </div>

      {/* 3. TECHNICAL ACCENT */}
      <div className="absolute top-6 right-6 z-20 opacity-20">
        <Zap size={24} className="text-brand-primary dark:text-white" />
      </div>

      {/* 4. BOTTOM INTERACTIVE LINE */}
      <div className="absolute bottom-0 left-0 z-30 h-[4px] w-0 bg-brand-accent transition-all duration-700 group-hover:w-full" />
    </div>
  );
};

export default BestSoldProduct;
