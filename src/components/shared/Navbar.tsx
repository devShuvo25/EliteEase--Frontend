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
import { UserNav } from "../dropdown/user.dropdown";
import { useDispatch } from "react-redux";
import { setIsSearching, setSearchTerm } from "@/redux/features/searchSlice";
import { cn } from "@/lib/utils";
import { MobileNavDrawer } from "../drawer/MobileDrawer";
import { usePathname } from "next/navigation";
import { useAuthCheck } from "@/hook/useAuthCheck";

export default function Navbar() {
  const { data: res } = useGetAllCategoryQuery();
  const categories: ApiCategory[] = res?.data ?? [];
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // cheak role for bottom bar
  const pathname = usePathname()
  const {user} = useAuthCheck()


  const { data: cartRes } = useGetAllCartItemsQuery(undefined);
  const { data: wishListRes } = useGetWishlistQuery(undefined);
  const cartCount = cartRes?.data?.items?.length || 0;
  const wishlist = wishListRes?.data || [];
  const wishListCount = wishlist?.products?.length || 0;

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);


  const dispatch = useDispatch();

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
          "fixed inset-x-0 top-0 z-100 w-full  transition-all duration-300",
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-white py-4 shadow-sm"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            
            {/* LEFT: Mobile Menu + Logo */}
            <div className="flex items-center gap-2">

              <Link href="/" className="group flex items-center gap-0.5 text-xl md:text-2xl font-black tracking-tighter shrink-0">
                <span className="text-brand-primary transition-colors duration-300 group-hover:text-brand-accent">Elite</span>
                <span className="relative text-blue-500">Ease</span>
              </Link>
            </div>

            {/* CENTER: Desktop Search */}
            <div className="relative hidden md:flex w-full max-w-md lg:max-w-xl items-center">
              <div className="relative w-full">
                <Input
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search premium products..."
                  className="w-full pl-4 pr-12 h-11 focus-visible:ring-brand-primary border-gray-200 rounded-full"
                />
                <Button
                  className="absolute right-1 top-1 bg-brand-primary text-white rounded-full h-9 w-9 p-0"
                  variant="default"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 md:hidden text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </button>

              <button onClick={() => setIsWishlistOpen(true)} className="relative">
                <IconBadge icon={<Heart className="h-5 w-5 sm:h-6 sm:w-6" />} count={wishListCount} />
              </button>

              <Link href="/cart">
                <IconBadge icon={<ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />} count={cartCount} />
              </Link>
               <div className="md:hidden">
                <MobileNavDrawer />
              </div>
          <div className="hidden md:flex items-center gap-4">
              <div className="h-8 w-px bg-gray-200" />
            {!user?               <Link 
                href={`/login?callback=${encodeURIComponent(pathname)}`}
                className=" inline-flex items-center justify-center px-6 py-2 bg-brand-primary text-white rounded-md transition-hover"
              >
                Join Now
              </Link> :
              <UserNav />}
            </div>
          </div>
                       
          </div>

          {/* Mobile Search (Expandable) */}
          <div className={cn(
            "overflow-hidden transition-all duration-300 md:hidden",
            isSearchOpen ? "max-h-20 opacity-100 mt-3" : "max-h-0 opacity-0"
          )}>
            <div className="relative pb-2">
              <Input
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
                placeholder="Search products..."
                className="w-full border-gray-200 rounded-full h-10 pr-10"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Desktop Navigation (Bottom Bar) */}
{/* 5. Navigation Bar (Visible on both Mobile and Desktop) */}
{/* Only show BottomBar if NOT in the dashboard */}
        {!pathname.startsWith("/dashboard") && (
          <nav className="border-t border-gray-50 mt-2">
            <BottomBar categories={categories} />
          </nav>
        )}
      </header>

      {/* Dynamic Spacer */}
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
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent text-[9px] font-bold text-white ring-2 ring-white">
          {count}
        </span>
      )}
    </div>
  );
}