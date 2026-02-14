"use client";
import React from "react";
import Link from "next/link";
import { SubCategoryList } from "../dropdown/categoriesDropdown";
import { ChevronDown, LayoutGrid } from "lucide-react";

interface CategoryWithChildren {
  id: string;
  name: string;
  children?: {
    id: string;
    name: string;
  }[];
}

interface MegaMenuProps {
  categories: CategoryWithChildren[];
}

export const BottomBar = ({ categories }: MegaMenuProps) => {
  return (
    // Removed "hidden" classes to ensure it shows everywhere
    <nav className="relative bg-blue-50 border-b border-blue-100 w-full">
      <div className="max-w-7xl mx-auto flex items-center">
        
        {/* Mobile "All" Icon - Sticky at the start on mobile */}
        <div className="flex md:hidden items-center justify-center px-4 py-3 bg-brand-primary text-white shrink-0 z-10">
          <LayoutGrid size={16} />
        </div>

        {/* SCROLLABLE CONTAINER 
            - 'overflow-x-auto' allows swiping on mobile
            - 'scrollbar-hide' keeps it clean
        */}
        <ul className="flex items-center w-full overflow-x-auto scrollbar-hide px-2 md:px-6 gap-4 md:justify-between list-none">
          {categories?.map((c) => (
            <li
              key={c.id}
              className="group static shrink-0 md:shrink py-1" 
            >
              {/* Category Label - Increased padding for easier tapping on mobile */}
              <div className="flex items-center gap-1.5 px-2 py-2.5 text-[12px] md:text-sm font-bold text-gray-700 hover:text-brand-accent transition-colors cursor-pointer whitespace-nowrap">
                {c.name}
                <ChevronDown className="w-3.5 h-3.5 opacity-40 group-hover:rotate-180 transition-transform duration-300 hidden md:block" />
              </div>

              {/* DESKTOP ONLY MEGA MENU 
                  - hidden on mobile to prevent accidental triggers and layout breaks
              */}
              <div className="absolute top-full left-0 w-full opacity-0 invisible pointer-events-none md:group-hover:opacity-100 md:group-hover:visible md:group-hover:pointer-events-auto translate-y-2 md:group-hover:translate-y-0 transition-all duration-300 z-50 hidden md:block">
                <div className="bg-white border-t border-ui-border shadow-2xl w-full py-10 px-6">
                  <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
                    <div className="col-span-1 border-r border-gray-100 pr-4 text-left">
                      <h4 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-tighter">
                        {c?.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-4">
                        Discover pro-grade {c.name.toLowerCase()} hardware.
                      </p>
                      <Link
                        href={`/category/${c.id}`}
                        className="text-xs font-black text-brand-primary underline underline-offset-4"
                      >
                        Browse All
                      </Link>
                    </div>
                    <div className="col-span-3">
                      <SubCategoryList childrenCategories={c?.children} />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
};