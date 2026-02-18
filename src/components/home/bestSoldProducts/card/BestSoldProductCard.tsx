/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ProductCardProps } from "@/types/product";
import { MoveRight, Zap, Target } from "lucide-react";
import Image from "next/image";
import React from "react";

const BestSoldProduct = (props: ProductCardProps & { rank?: number }) => {
  const { product, rank } = props;
  const { title, image, currentPrice, originalPrice } = (product as any) || {};

  return (
    <div className="relative group mx-auto flex h-[240px] w-full overflow-hidden border border-white/5 bg-[#050505] transition-all duration-500 hover:border-blue-500/50">
      
      {/* 1. RANK INDICATOR - Cyberpunk Style */}
      {rank && (
        <div className="absolute top-0 left-0 z-40 bg-blue-600 px-3 py-1 flex items-center gap-2">
          <Target size={10} className="text-white animate-pulse" />
          <span className="text-[10px] font-black text-white italic tracking-tighter">
            RANK {rank.toString().padStart(2, '0')}
          </span>
        </div>
      )}

      {/* 2. TEXT CONTENT - Left Side Glassmorphism */}
      <div className="relative z-30 flex flex-col justify-center pl-8 md:pl-12 w-full max-w-[60%] h-full bg-gradient-to-r from-black via-black/80 to-transparent">
        <div className="space-y-1">
          <span className="inline-block text-[8px] font-black uppercase tracking-[0.4em] text-blue-500 mb-1">
            Industrial Grade // 2026
          </span>
          <h2 className="text-xl md:text-2xl font-black leading-none text-white uppercase italic tracking-tighter">
            {title}
          </h2>
        </div>

        <div className="mt-4 flex items-end gap-3">
          <div className="flex flex-col">
            <span className="text-[14px] font-black text-blue-500 leading-none">
              <span className="text-[10px] font-normal mr-1 text-white/40">BDT</span>
              {currentPrice?.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-[8px] font-bold text-white/30 line-through tracking-widest mt-1">
                PREV {originalPrice?.toLocaleString()}
              </span>
            )}
          </div>
          
          <button className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-white transition-all hover:bg-blue-600 hover:border-blue-600 hover:scale-110">
            <MoveRight size={14} />
          </button>
        </div>
      </div>

      {/* 3. PRODUCT IMAGE - Right Side Background */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
        <div className="relative h-full w-full transition-transform duration-1000 group-hover:scale-105 group-hover:translate-x-4">
          <Image
            src={image ?? "/images/placeholder.png"}
            alt={title || "Product"}
            fill
            className="object-contain object-right opacity-60 transition-opacity group-hover:opacity-100 p-4 drop-shadow-[0_0_30px_rgba(59,130,246,0.2)]"
            priority
          />
        </div>
      </div>

      {/* 4. TECH DECORATION - Decorative scanning line */}
      <div className="absolute top-0 right-0 z-20 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent translate-x-[-100px] group-hover:translate-x-0 transition-transform duration-1000" />
      
      {/* 5. BOTTOM STATUS BAR */}
      <div className="absolute bottom-0 right-0 z-30 px-4 py-1 flex items-center gap-2 bg-white/5 backdrop-blur-md">
         <Zap size={10} className="text-blue-500 fill-blue-500" />
         <span className="text-[8px] font-bold text-white/60 uppercase tracking-[0.2em]">High Demand</span>
      </div>

      {/* 6. CORNER ACCENT */}
      <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-blue-600/10 blur-3xl group-hover:bg-blue-600/20 transition-colors" />
    </div>
  );
};

export default BestSoldProduct;