/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ShoppingCart, Heart, Star, MessageSquare, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ProductCardProps } from "@/types/product";
import { useRouter } from "next/navigation";
import { useAddToCartMutation } from "@/redux/api/cartApi";
import { useAddToWishlistMutation, useGetWishlistQuery, useRemoveFromWishlistMutation } from "@/redux/api/wishListApis";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  // 1. API Hooks
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
  const [addToWishlist, { isLoading: isWishlisting }] = useAddToWishlistMutation();
  const [removeFromWishList, { isLoading: isRemoving }] = useRemoveFromWishlistMutation(); // Added loading state
  const { data: wishRes } = useGetWishlistQuery(undefined);

  // 2. Data Extraction
  const { id, name, basePrice, brand, category, images, image, discount = 10, stock = 10 } = (product as any) || {};
  const imageSrc = image || images?.[0]?.url || "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=500&auto=format&fit=crop";
  const categoryName = typeof category === "string" ? category : category?.name || "Accessory";
  
  // Check if product is in wishlist
  const isExistInWishlist = wishRes?.data?.products?.some((p: any) => p.id === id);

  // 3. Navigation
  const handleNavigate = () => id && router.push(`/product/${id}`);

  // 4. Action Handlers
  const handleAddToCartAction = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (stock < 1) return toast.error("Stock out! Try another product.");

    try {
      await addToCart({ productId: id, quantity: 1 }).unwrap();
      toast.success("Added to cart!", {
        action: { label: "View Cart", onClick: () => router.push('/cart') },
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add to cart");
    }
  };

  // UPDATED: Wishlist Toggle Feature
  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isExistInWishlist) {
      // Logic for Removing
      try {
        await removeFromWishList(id).unwrap();
        toast.success("Removed from wishlist");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to remove");
      }
    } else {
      // Logic for Adding
      try {
        await addToWishlist(id).unwrap();
        toast.success("Added to wishlist! ❤️");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to add");
      }
    }
  };

  const isProcessingWishlist = isWishlisting || isRemoving;

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

          <div className="absolute top-2 right-2 z-20">
            <button 
              onClick={handleWishlistToggle} // Using the new toggle handler
              disabled={isProcessingWishlist}
              className={cn(
                "p-1.5 cursor-pointer rounded-full transition-all duration-300 backdrop-blur-sm",
                isExistInWishlist ? "bg-red-500 text-white shadow-lg" : "bg-[#37393F]/60 text-white hover:bg-black"
              )}
            >
              {isProcessingWishlist ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <Heart 
                  size={24} 
                  className={cn("transition-transform", isExistInWishlist && "fill-current scale-110")} 
                />
              )}
            </button>
          </div>
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
                $ {(basePrice * 1.1).toFixed(0)}
              </span>
              <span className="bg-blue-50 text-blue-700 text-[8px] font-bold px-1 rounded">
                -{discount}%
              </span>
            </div>
            <div className="text-xl font-black text-[#37393F] tracking-tighter">
              ${basePrice?.toLocaleString() || "0"}
            </div>
          </div>

          <Button
            onClick={handleAddToCartAction}
            disabled={isAdding}
            size="icon"
            className="cursor-pointer h-9 w-9 rounded-full bg-brand-primary hover:bg-brand-accent shadow-md border-none active:scale-90 transition-transform"
          >
            {isAdding ? <Loader2 size={20} className="animate-spin" /> : <ShoppingCart size={24} className="text-white" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}