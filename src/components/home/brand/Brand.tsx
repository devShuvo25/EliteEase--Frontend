/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllProductsQuery } from "@/redux/api/productsApis";
import { Product } from "@/types/product";
import { ArrowRight, Star, MoveRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const Brand = () => {
  const { data: res } = useGetAllProductsQuery({});
  const products: Product[] = res?.data || [];

  const sidebarImg =
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1000&auto=format&fit=crop";

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 1. Header Section - Tightened */}
      <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-2">
        <h2 className="text-lg font-black tracking-tighter text-brand-primary uppercase">
          Brand <span className="text-blue-600 italic font-medium">Exclusives</span>
        </h2>
        
        <button className="group flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-primary hover:text-blue-600 transition-colors">
          View All 
          <MoveRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        {/* 2. Sidebar Banner - Optimized for space */}
        <div className="relative w-full lg:w-[280px] xl:w-[320px] h-[160px] lg:h-auto overflow-hidden rounded-xl bg-brand-primary group">
          <Image
            src={sidebarImg}
            alt="Brand Banner"
            fill
            className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-4 space-y-1">
            <span className="bg-blue-600 text-white px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest rounded">
              Series 2026
            </span>
            <p className="text-white text-base font-black leading-tight uppercase tracking-tighter">
              The Future of <br /> Computing.
            </p>
          </div>
        </div>

        {/* 3. Product List - Compact Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
          {products?.slice(0, 6).map((product, idx) => {
             const imageSrc = product.image ?? product.images?.[0]?.url ?? "/images/placeholder.png";
             
             return (
              <div
                key={product?.id ?? idx}
                className="group relative flex items-center gap-3 border border-gray-100 bg-white p-2 rounded-lg transition-all hover:border-blue-500 hover:shadow-md cursor-pointer"
              >
                {/* Product Thumbnail */}
                <div className="relative h-14 w-14 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden">
                  <Image
                    src={imageSrc}
                    fill
                    className="object-cover p-1 transition-transform duration-500 group-hover:scale-110"
                    alt={product.name ?? "brand"}
                  />
                </div>

                {/* Content Area */}
                <div className="flex flex-col min-w-0 pr-6">
                  <h3 className="line-clamp-1 text-[11px] font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {product.title ?? product.name}
                  </h3>

                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-black text-gray-900 tracking-tight">
                      {product.currentPrice?.toLocaleString() || product.basePrice?.toLocaleString()}
                    </span>
                    <span className="text-[8px] font-bold text-gray-400">BDT</span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={8}
                          className={`${i < Math.round(product.rating ?? 0) ? "fill-orange-400 text-orange-400" : "text-gray-200"}`}
                        />
                      ))}
                    </div>
                    <span className="text-[9px] font-bold text-gray-400">
                      {product.rating || "5.0"}
                    </span>
                  </div>
                </div>

                {/* Hover Action */}
                <div className="absolute right-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                  <ArrowRight size={14} className="text-blue-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Brand;