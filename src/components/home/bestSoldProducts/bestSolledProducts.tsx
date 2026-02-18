/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { MoveRight, TrendingUp, Crown } from "lucide-react";
import BestSoldProduct from "./card/BestSoldProductCard";

const DUMMY_BEST_SELLERS = [
  {
    id: 1,
    title: "M4 Pro MacBook Space Black",
    currentPrice: 245000,
    originalPrice: 260000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Sony WH-1000XM5 Studio",
    currentPrice: 42000,
    originalPrice: 45000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "ProArt 4K OLED Display",
    currentPrice: 95000,
    originalPrice: 110000,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Keychron Q-Series Mechanical",
    currentPrice: 18500,
    originalPrice: 22000,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=300&auto=format&fit=crop"
  }
];

const BestSoldProducts = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
            <TrendingUp size={14} className="text-white" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm md:text-lg font-black tracking-tighter text-gray-900 uppercase leading-none">
              Market <span className="text-blue-600 italic font-medium">Leaders</span>
            </h2>
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
              Live Performance Tracking
            </span>
          </div>
        </div>

        <button className="group flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-all">
          View Ranking 
          <MoveRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* GRID: Reduced gap for high-density look */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {DUMMY_BEST_SELLERS?.map((product, index) => (
          <BestSoldProduct key={product.id} product={product} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default BestSoldProducts;