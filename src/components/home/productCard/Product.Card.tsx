/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Star,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ProductCardProps } from "@/types/product";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();



  // 2. Data Extraction
  const {
    id,
    name,
    basePrice,
    currentPrice,
    brand,
    category,
    images,
    image,
    discount = 10,
    stock
  } = (product as any) || {};
  const imageSrc =
    image ||
    images?.[0]?.url ||
    "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=500&auto=format&fit=crop";
  const categoryName =
    typeof category === "string" ? category : category?.name || "Accessory";


  // 3. Navigation
  const handleNavigate = () => id && router.push(`/product/${id}`);

  return (
    <Card
      onClick={handleNavigate}
      className="group relative w-full bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
    >
      <CardContent className="p-0 px-3 py-2 space-y-1.5">
        {/* IMAGE AREA */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden mt-1">
          <Image
            src={imageSrc}
            alt={name || "Product"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 250px"
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div className="space-y-0">
          <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-wider text-blue-600">
            <span>{brand || "Brand"}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-400">{categoryName}</span>
          </div>

          <h3 className="text-sm font-bold text-[#37393F] leading-tight line-clamp-1">
            {name || "Product Name"}
          </h3>

          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex items-center text-orange-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} className="fill-current" />
              ))}
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-[9px] font-medium">
              <MessageSquare size={9} />
              <span>97</span>
            </div>
          </div>
        </div>

        {/* FOOTER: PRICE & CART */}
        <div className="flex items-end justify-between pt-1 pb-1">
          <div className="flex flex-col -space-y-1">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-medium text-slate-400 line-through">
                $ {basePrice}
              </span>
              <span className="bg-blue-50 text-blue-700 text-[8px] font-bold px-1 rounded">
                -{discount}%
              </span>
            </div>
            <div className="text-xl font-black text-[#37393F] tracking-tighter">
              ${currentPrice}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
