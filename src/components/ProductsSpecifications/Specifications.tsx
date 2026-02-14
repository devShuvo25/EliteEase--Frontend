"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Cpu } from "lucide-react";

interface SpecItem {
  key: string;
  value: string;
}

interface SpecsProps {
  specifications: SpecItem[];
}

export const Specsification = ({ specifications }: SpecsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Table Header */}
      <div className="border-b border-gray-100 px-5 py-4 md:px-8 md:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-brand-primary/5 rounded-lg text-brand-primary">
            <Cpu size={20} strokeWidth={2.5} />
          </div>
          <h2 className="text-base md:text-lg font-black text-brand-primary uppercase tracking-tight">
            Technical Specifications
          </h2>
        </div>
        <Badge
          variant="outline"
          className="w-fit text-brand-accent border-brand-accent/30 bg-brand-accent/5 font-bold uppercase text-[9px] tracking-widest px-3 py-1"
        >
          Official Warranty
        </Badge>
      </div>

      {/* Table Body (Striped UI) */}
      <ul className="divide-y divide-gray-100">
        {specifications?.map((spec, i) => (
          <li
            key={i}
            className={`grid grid-cols-2 md:grid-cols-12 px-5 py-4 md:px-8 md:py-5 transition-colors hover:bg-brand-accent/2 ${
              i % 2 === 0 ? "bg-gray-50/40" : "bg-white"
            }`}
          >
            {/* Label - Stacks on Mobile, 4-cols on Desktop */}
            <div className="md:col-span-4 text-[10px] md:text-xs font-black text-gray-600 uppercase tracking-widest mb-1.5 md:mb-0 flex items-center">
              {spec.key}
            </div>

            {/* Value - 8-cols on Desktop */}
            <div className="md:col-span-8 text-sm md:text-base text-gray-700 font-medium leading-relaxed">
              {spec.value}
            </div>
          </li>
        ))}
      </ul>
      
      {/* Bottom Subtle Note */}
      <div className="bg-gray-50/50 px-8 py-3 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 italic text-center md:text-left font-medium">
          * Specifications are subject to change based on manufacturer updates.
        </p>
      </div>
    </div>
  );
};