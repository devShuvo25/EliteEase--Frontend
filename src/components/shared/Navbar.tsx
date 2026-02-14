"use client";

import { Search, User, ShoppingCart, Heart} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";
import { Category as ApiCategory } from "@/types/user.type";
import { BottomBar } from "./BottomBar";
import { useState } from "react";
import Link from "next/link";
import { useGetAllCartItemsQuery } from "@/redux/api/cartApi";

import { useGetMeQuery } from "@/redux/api/authApi";
import { useClearWishlistMutation, useGetWishlistQuery, useRemoveFromWishlistMutation } from "@/redux/api/wishListApis";
import WishlistPageModal from "../modal/wishLists.modal";

export default function Navbar() {
  const { data: res } = useGetAllCategoryQuery();
  const {data : userRes} = useGetMeQuery(undefined)
  const user = userRes?.data || {};
  const categories: ApiCategory[] = res?.data ?? [];
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {data : cartRes} = useGetAllCartItemsQuery(undefined)
  const {data : wishListRes} = useGetWishlistQuery(undefined)
  const cartCount = cartRes?.data?.items?.length || 0
  const wishlist = wishListRes?.data || []
  const wishListCount = wishlist?.products?.length || 0;
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
 const { data: wishRes } = useGetWishlistQuery(undefined);
 const [removeFromWishlist, { isLoading: isRemoving }] = useRemoveFromWishlistMutation();
 const [clearWishlist, { isLoading: isClearing }] = useClearWishlistMutation();



  return (
    <header className="fixed z-50 w-full  bg-white shadow-sm">
      <WishlistPageModal
      isOpen={isWishlistOpen}
      setIsOpen={setIsWishlistOpen}
      onClose={() => setIsWishlistOpen(false)}
      products={wishRes?.data?.products || []}
      onRemove={(id) => removeFromWishlist(id)}
      onClear={() => clearWishlist()}
      isRemoving={isRemoving}
      isClearing={isClearing}
    />
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        
        {/* 1. Logo Section */}
        <div className="group flex cursor-pointer items-center gap-0.5 text-xl md:text-2xl font-black tracking-tighter shrink-0">
          <span className="text-brand-primary transition-colors duration-300 group-hover:text-brand-accent">
            ASI
          </span>
          <span className="relative text-brand-accent">
            MART
            <span className="absolute -right-2 top-1 h-1 w-1 rounded-full bg-brand-primary group-hover:bg-brand-accent transition-colors hidden sm:block" />
          </span>
          <span className="ml-3 hidden border-l border-gray-200 pl-3 text-[10px] font-medium uppercase tracking-[0.3em] text-gray-400 lg:block">
            Est. 2024
          </span>
        </div>

        {/* 2. Desktop Search (Hidden on Mobile) */}
        <div className="relative hidden md:flex w-full max-w-md lg:max-w-xl items-center mx-4">
          <Input
            placeholder="Search your product..."
            className="py-0.5 focus-visible:ring-1 focus-visible:ring-brand-primary/30 focus-visible:border-brand-primary border-gray-200 transition-all shadow-none pr-24"
          />
          <Button
            className="cursor-pointer bg-brand-primary absolute right-1 h-[84%] text-white hover:bg-brand-primary/90 text-xs px-3"
            variant="default"
          >
            <Search color="#FFFFFF" className="mr-1 h-4 w-4" /> <span className="hidden lg:inline">Search</span>
          </Button>
        </div>

        {/* 3. Right Actions */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Mobile Search Toggle */}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 md:hidden text-gray-600"
          >
            <Search className="h-5 w-5" />
          </button>

          <div onClick={() => setIsWishlistOpen(true)}>
            <IconBadge  icon={<Heart className="h-5 w-5 md:h-6 md:w-6" />} count={wishListCount} />
          </div>
          <Link href={"/cart"}>
          <IconBadge  icon={<ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />} count={cartCount} />
          </Link>

          <div className="flex items-center gap-2 cursor-pointer hover:text-brand-accent transition-colors">
            <User className="h-5 w-5 md:h-6 md:w-6" />
            <span className="text-sm font-bold hidden lg:block whitespace-nowrap">{user?.username || "Bot"}</span>
          </div>
        </div>
      </div>

      {/* 4. Mobile Search Expansion */}
      {isSearchOpen && (
        <div className="px-4 pb-3 md:hidden animate-in slide-in-from-top duration-200">
          <div className="relative flex items-center">
            <Input
              autoFocus
              placeholder="Search..."
              className="w-full border-gray-200 rounded-lg h-10"
            />
            <Button size="sm" className="absolute right-1 bg-brand-primary h-8">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* 5. Bottom bar (Desktop only, or modified for mobile) */}
      <div className="hidden md:block">
        <BottomBar categories={categories} />
      </div>
    </header>
  );
}

function IconBadge({ icon, count }: { icon: React.ReactNode; count: number }) {
  return (
    <div className="relative cursor-pointer group">
      <div className="group-hover:text-brand-accent transition-colors">
        {icon}
      </div>
      <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent text-[9px] font-bold text-white shadow-sm">
        {count}
      </span>
    </div>
  );
}