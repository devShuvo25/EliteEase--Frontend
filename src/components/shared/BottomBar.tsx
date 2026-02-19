"use client";
import React from "react";
import Link from "next/link";
import { SubCategoryList } from "../dropdown/categoriesDropdown";
import { ChevronDown, LayoutGrid, ListFilter, ChevronRight } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { setCategoryId } from "@/redux/features/searchSlice";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Ensure you have shadcn accordion installed
import { cn } from "@/lib/utils";

interface CategoryWithChildren {
  id: string;
  name: string;
  children?: {
    id: string;
    name: string;
  }[];
  parentId?: string;
}

interface MegaMenuProps {
  categories: CategoryWithChildren[];
}

export const BottomBar = ({ categories }: MegaMenuProps) => {
  const dispatch = useAppDispatch();

  return (
    <nav className="relative bg-white border-b border-gray-100 w-full z-40">
      <div className="container mx-auto flex items-center">
        
        {/* 1. MOBILE CATEGORY DROPDOWN (SHEET) */}
        <div className="md:hidden pl-4 pr-2 border-r border-gray-100 py-3">
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 text-brand-primary font-bold text-sm bg-blue-50 px-3 py-1.5 rounded-full transition-all active:scale-95">
                <LayoutGrid size={16} />
                <span>Categories</span>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-75 p-0 flex flex-col">
              <SheetHeader className="p-6 border-b text-left bg-gray-50/50">
                <SheetTitle className="flex items-center gap-2 text-brand-primary">
                  <ListFilter className="w-5 h-5" /> All Categories
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 bg-white  overflow-y-auto px-2">
                <Accordion type="single" collapsible className="w-full">
                  {categories.map((cat) => (
                    <AccordionItem key={cat.id} value={cat.id} className="border-b-0">
                      {/* Parent Item */}
                      <div className="flex items-center justify-between group">
                        <SheetClose asChild>
                          <button
                            onClick={() => dispatch(setCategoryId(cat.id))}
                            className="flex-1 text-left py-4 px-4 text-sm font-semibold text-gray-700 hover:text-brand-primary"
                          >
                            {cat.name}
                          </button>
                        </SheetClose>
                        
                        {/* Only show accordion trigger if children exist */}
                        {cat.children && cat.children.length > 0 && (
                          <AccordionTrigger className="pr-4 py-4 hover:no-underline" />
                        )}
                      </div>

                      {/* Children Items */}
                      <AccordionContent className="pb-2 bg-gray-50/50 rounded-lg mx-2">
                        <div className="flex flex-col">
                          {cat.children?.map((sub) => (
                            <SheetClose asChild key={sub.id}>
                              <Link
                                href={`/category/${cat.id}`} // Or update to specific sub-category route
                                onClick={() => dispatch(setCategoryId(sub.id))}
                                className="flex items-center gap-2 py-3 px-6 text-[13px] text-gray-600 hover:text-brand-primary hover:bg-white transition-all rounded-md mx-2"
                              >
                                <ChevronRight className="w-3 h-3 text-gray-400" />
                                {sub.name}
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* 2. SCROLLABLE CATEGORY LIST (Horizontal Swiper for Mobile) */}
        <ul className="flex items-center w-full overflow-x-auto scrollbar-hide px-4 md:px-0 gap-2 md:gap-8 list-none">
          {categories?.map((c) => (
            <li key={c.id} className="group static shrink-0 py-1">
              <div 
                onClick={() => dispatch(setCategoryId(c?.id))}
                className="flex items-center gap-1 px-3 py-3 text-[13px] md:text-sm font-semibold text-gray-600 hover:text-brand-primary transition-colors cursor-pointer whitespace-nowrap"
              >
                {c.name}
                <ChevronDown className="w-3.5 h-3.5 opacity-40 group-hover:rotate-180 transition-transform duration-300 hidden md:block" />
              </div>

              {/* DESKTOP MEGA MENU (Unchanged) */}
              <div className="absolute top-full left-0 w-full opacity-0 invisible pointer-events-none md:group-hover:opacity-100 md:group-hover:visible md:group-hover:pointer-events-auto translate-y-2 md:group-hover:translate-y-0 transition-all duration-300 z-50 hidden md:block">
                <div className="bg-white border-t border-gray-100 shadow-2xl w-full py-10 px-6">
                  <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
                    <div className="col-span-1 border-r border-gray-100 pr-4 text-left">
                      <h4 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-tighter">{c?.name}</h4>
                      <p className="text-xs text-muted-foreground mb-4">Discover pro-grade {c.name.toLowerCase()} hardware.</p>
                      <Link href={`/category/${c.id}`} className="text-xs font-black text-brand-primary underline underline-offset-4">Browse All {c.name}</Link>
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
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </nav>
  );
};