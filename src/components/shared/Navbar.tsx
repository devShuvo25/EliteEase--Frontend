/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Search, ShoppingCart, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";
import { Category as ApiCategory } from "@/types/user.type";
import { BottomBar } from "./BottomBar";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useGetAllCartItemsQuery } from "@/redux/api/cartApi";
import { useClearWishlistMutation, useGetWishlistQuery, useRemoveFromWishlistMutation } from "@/redux/api/wishListApis";
import WishlistPageModal from "../modal/wishLists.modal";
import { UserNav } from "../dropdown/user.dropdown";
import { useDispatch } from "react-redux";
import { setIsSearching, setSearchTerm } from "@/redux/features/searchSlice";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { data: res } = useGetAllCategoryQuery();
  const categories: ApiCategory[] = res?.data ?? [];
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { data: cartRes } = useGetAllCartItemsQuery(undefined);
  const { data: wishListRes } = useGetWishlistQuery(undefined);
  const cartCount = cartRes?.data?.items?.length || 0;
  const wishlist = wishListRes?.data || [];
  const wishListCount = wishlist?.products?.length || 0;
  
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [removeFromWishlist, { isLoading: isRemoving }] = useRemoveFromWishlistMutation();
  const [clearWishlist, { isLoading: isClearing }] = useClearWishlistMutation();
  
  const dispatch = useDispatch();

  // Handle Scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (value: string) => {
    dispatch(setIsSearching(true));
    dispatch(setSearchTerm(value));
  };

  return (
    <>
      <header 
        className={cn(
          "fixed z-[100] w-full transition-all duration-300",
          scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-1" : "bg-white py-2"
        )}
      >
        <WishlistPageModal
          isOpen={isWishlistOpen}
          setIsOpen={setIsWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          products={wishListRes?.data?.products || []}
          onRemove={(id) => removeFromWishlist(id)}
          onClear={() => clearWishlist({})}
          isRemoving={isRemoving}
          isClearing={isClearing}
        />

        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between gap-4">
            
            {/* 1. Logo Section */}
            <Link href="/" className="group flex items-center gap-0.5 text-xl md:text-2xl font-black tracking-tighter shrink-0">
              <span className="text-brand-primary transition-colors duration-300 group-hover:text-brand-accent">
                ASI
              </span>
              <span className="relative text-brand-accent">
                MART
                <span className="absolute -right-2 top-1 h-1 w-1 rounded-full bg-brand-primary group-hover:bg-brand-accent transition-colors hidden sm:block" />
              </span>
            </Link>

            {/* 2. Desktop Search (Hidden on Mobile) */}
            <div className="relative hidden md:flex w-full max-w-md lg:max-w-xl items-center">
              <div className="relative w-full group">
                <Input 
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search premium products..."
                  className="w-full pl-4 pr-24 py-5 focus-visible:ring-brand-primary border-gray-200 rounded-full transition-all"
                />
                <Button
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-brand-primary text-white rounded-full h-8 px-4"
                  variant="default"
                >
                  <Search className="h-4 w-4 lg:mr-2" />
                  <span className="hidden lg:inline text-xs font-bold uppercase tracking-wider">Search</span>
                </Button>
              </div>
            </div>

            {/* 3. Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
              {/* Mobile Search Toggle */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 md:hidden text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </button>

              <div className="flex items-center gap-4 sm:gap-5">
                <button onClick={() => setIsWishlistOpen(true)}>
                  <IconBadge icon={<Heart className="h-5 w-5 sm:h-6 sm:w-6" />} count={wishListCount} />
                </button>
                
                <Link href="/cart">
                  <IconBadge icon={<ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />} count={cartCount} />
                </Link>

                <div className="h-8 w-px bg-gray-200 hidden sm:block" />
                <UserNav />
              </div>
            </div>
          </div>

          {/* 4. Mobile Search Expansion (Animated) */}
          <div className={cn(
            "overflow-hidden transition-all duration-300 md:hidden",
            isSearchOpen ? "max-h-20 opacity-100 mt-3" : "max-h-0 opacity-0"
          )}>
            <div className="relative pb-2">
              <Input
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
                placeholder="What are you looking for?"
                className="w-full border-gray-200 rounded-full h-10 pr-12"
              />
              <div className="absolute right-3 top-2.5 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* 5. Bottom bar (Desktop only) */}
        <div className="hidden md:block border-t border-gray-50 mt-2">
          <BottomBar categories={categories} />
        </div>
      </header>
      
      {/* Spacer to prevent content from going under the fixed header */}
      <div className="h-18 md:h-30" />
    </>
  );
}

function IconBadge({ icon, count }: { icon: React.ReactNode; count: number }) {
  return (
    <div className="relative cursor-pointer group p-1">
      <div className="text-gray-700 group-hover:text-brand-accent transition-colors">
        {icon}
      </div>
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent text-[8px] font-black text-white ring-2 ring-white">
          {count}
        </span>
      )}
    </div>
  );
}