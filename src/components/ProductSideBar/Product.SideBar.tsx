"use client";

import React from "react";
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Truck, 
  RotateCcw,  
} from "lucide-react";

export const ProductSidebar = () => {
  return (
    <div className="flex flex-col gap-4">
      
      {/* 1. Authenticity Card */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md group">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-brand-accent/10 rounded-lg text-brand-accent group-hover:scale-110 transition-transform">
            <ShieldCheck size={20} strokeWidth={2.5} />
          </div>
          <h4 className="text-sm font-black text-brand-primary uppercase tracking-tight">
            100% Authentic
          </h4>
        </div>
        <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
          Every product at <span className="text-brand-primary font-bold">ASI MART</span> is sourced directly from manufacturers or authorized global distributors.
        </p>
      </div>

      {/* 2. Delivery Info Card (Modern Dark Theme) */}
      <div className="bg-brand-primary rounded-xl overflow-hidden shadow-lg border border-brand-primary">
        <div className="bg-white/10 px-5 py-3 border-b border-white/5 flex items-center justify-between">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2">
            <MapPin size={14} className="text-brand-accent" /> Delivery Info
          </h4>
        </div>
        
        <div className="p-5 space-y-5">
          {/* Option A */}
          <div className="flex items-start gap-4 group">
            <div className="mt-1 h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-brand-accent border border-white/10 group-hover:bg-brand-accent group-hover:text-white transition-all">
              <Clock size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wide">Express Delivery</p>
              <p className="text-[10px] text-gray-400 font-medium">Within 24 Hours (Inside City)</p>
            </div>
          </div>

          {/* Option B */}
          <div className="flex items-start gap-4 group">
            <div className="mt-1 h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-brand-accent border border-white/10 group-hover:bg-brand-accent group-hover:text-white transition-all">
              <Truck size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wide">Standard Shipping</p>
              <p className="text-[10px] text-gray-400 font-medium">3-5 Business Days (Outside City)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Minimal Support Info (New Added Value) */}
      <div className="px-5 py-4 bg-ui-soft/30 border border-dashed border-gray-200 rounded-xl">
        <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity cursor-default">
          <RotateCcw size={16} className="text-gray-400" />
          <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-500">7-Day Replacement Policy</span>
        </div>
      </div>

    </div>
  );
};