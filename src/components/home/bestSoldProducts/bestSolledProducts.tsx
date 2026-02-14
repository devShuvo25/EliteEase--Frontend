"use client";
import React from "react";
import { MoveRight, TrendingUp } from "lucide-react";
import BestSoldProduct from "./card/BestSoldProductCard";

// Premium Dummy Data
const DUMMY_BEST_SELLERS = [
  {
    id: 1,
    title: "Ultra-Slim M4 Pro Laptop",
    currentPrice: 145000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Noise-Cancelling Studio Headset",
    currentPrice: 32000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "4K Curved Cinema Display",
    currentPrice: 85000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Mechanical Tactile Keyboard",
    currentPrice: 12500,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=200&auto=format&fit=crop"
  }
];

const BestSoldProducts = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Compact Header */}
      <div className="mb-6 flex items-center justify-between border-b border-ui-border pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-brand-accent/10 p-1.5 text-brand-accent">
            <TrendingUp size={16} />
          </div>
          <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight text-brand-primary uppercase">
            Market <span className="text-brand-accent italic font-medium">Leaders</span>
          </h2>
        </div>

        <button className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary hover:text-brand-accent transition-colors">
          View Ranking <MoveRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Grid of Compact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DUMMY_BEST_SELLERS?.map((product, index) => (
          <BestSoldProduct key={product.id} product={product} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default BestSoldProducts;