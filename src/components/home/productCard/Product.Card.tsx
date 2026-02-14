/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ShoppingCart, Eye, ShieldCheck, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Image from "next/image";
import { Product, ProductCardProps } from "@/types/product";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  type PWithImage = Product & { image?: string; images?: { url: string }[] };
  const imageSrc =
    (product as PWithImage).image ??
    (product as PWithImage).images?.[0]?.url ??
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR_PjR7mAKttaP94i5D9DHM5ONOYCONy_WLA&s";
  const {id, name, basePrice, category } = product as any || {};
  const rawCategory = category as any;
  const categoryName =
    typeof rawCategory === "string" ? rawCategory : rawCategory?.name;

    const handleNavigateDetails = (id:string) => {
      if(id){
        router.push(`product/${id}`)
      }
    }

  return (
    <Card onClick={() =>handleNavigateDetails(id)} className="group cursor-pointer w-full max-w-60 overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-500 hover:shadow-2xl">
      <CardContent className="p-0">
        {/* 1. IMAGE SECTION: No gaps, fills the top area */}
        <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-50">
          <div className="absolute left-3 top-3 z-20">
            <Badge className="rounded-md bg-black px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-white border-none shadow-sm">
              {categoryName}
            </Badge>
          </div>

          <div className="absolute right-3 top-3 z-20 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            <Button
              size="icon"
              className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm text-black hover:bg-brand-primary hover:text-white border-none shadow-md"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Pricing Overlay Removed to clean up the visual space */}
          <div className="h-full w-full transition-transform duration-700 group-hover:scale-110">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={name || "Product"}
                fill
                className="object-cover"
                sizes="(max-width: 240px) 100vw, 240px"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>
        </div>

        {/* 2. CONTENT AREA */}
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-brand-primary text-[9px] font-black uppercase tracking-widest">
              <Zap size={10} className="fill-current" />
             {product?.brand}
            </div>

            <h3 className="line-clamp-2 font-display text-xs font-bold leading-tight text-gray-800 transition-colors group-hover:text-brand-primary">
              {name || "HP 15-fd0841TU 13th Gen Intel Core i3 1315U"}
            </h3>
          </div>

          {/* 3. FOOTER SECTION: Modified with Price and Warranty */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-baseline gap-0.5">
                <span className="text-[10px] font-bold text-gray-400">Tk</span>
                <span className="text-base font-black text-gray-900 tracking-tight">
                  {basePrice?.toLocaleString() || "56,000"}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[7px] font-black text-gray-400 uppercase tracking-tighter">
                <ShieldCheck size={10} className="text-blue-500" />{product?.warranty || "2 Years of Warranty"}
              </div>
            </div>

            <Button className="cursor-pointer h-8 w-8 rounded-full bg-brand-primary p-0 hover:bg-brand-accent transition-all shadow-md active:scale-90 border-none">
              <ShoppingCart className=" h-3.5 w-3.5 text-white" />
            </Button>
          </div>
        </div>

        {/* Hover Progress Bar */}
        <div className="h-0.5 w-full bg-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-0 bg-brand-primary transition-all duration-700 group-hover:w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
