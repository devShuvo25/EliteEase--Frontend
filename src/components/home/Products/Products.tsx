/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../productCard/Product.Card";
import { MoveRight } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/api/productsApis";
import { ProductsHeader } from "./ProductsHeader";
import { useAppSelector } from "@/redux/hooks";

/**
 * Products Component
 * Handles filtering, pagination, and product grid display.
 */
const Products = () => {
  // 1. Redux State (Global Search/Category)
  const { searchTerm, categoryId } = useAppSelector((state) => state.search);

  // 2. Local State for Filters & Pagination
  const [brand, setBrand] = useState<string | undefined>(undefined);
  const [price, setPrice] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const limit = 12;

  /**
   * FIX: Handle local state changes via functions to avoid cascading useEffect renders.
   * This batches the updates so the component re-renders only once.
   */
  const handleBrandChange = (newBrand: string | undefined) => {
    setBrand(newBrand);
    setPage(1);
    alert(brand)
  };

  const handlePriceChange = (newPrice: string | undefined) => {
    setPrice(newPrice);
    setPage(1);
    alert(price)

  };

  /**
   * 3. Sync Redux state with Pagination. 
   * Since Redux updates are external, we use an effect but wrap it in a 
   * condition to prevent unnecessary state setting if page is already 1.
   */
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, categoryId]);

  // 4. API Call using RTK Query
  const { data: res, isLoading } = useGetAllProductsQuery({
    searchTerm,
    categoryId,
    brand,
    price,
    page,
    limit,
  });

  const products = res?.data || [];
  const meta = res?.meta || { total: 0, totalPage: 1 };
  const totalPages = meta.totalPage || Math.ceil(meta.total / limit) || 1;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  // 5. Loading State UI
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-150 ">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-brand-primary font-medium animate-pulse">Loading Collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="products" className="container mx-auto px-4 py-12">
      {/* Header Section: Note we pass the handler functions, not the direct setters */}
      <ProductsHeader
        setBrand={handleBrandChange}
        setPrice={handlePriceChange}
        itemCount={meta.total || products.length}
      />

      {/* Product Grid Section */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-6">
          {products.map((p: any) => (
            <ProductCard key={p?.id || p._id} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="text-xl font-semibold text-gray-400">No products found</p>
          <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}

      {/* Pagination Section */}
      {totalPages > 1 && (
        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="flex items-center justify-center gap-2">
            
            {/* Previous Page Button */}
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(Math.max(page - 1, 1))}
              className={`group flex h-12 w-12 items-center justify-center rounded-full border transition-all ${
                page === 1 
                  ? "opacity-30 cursor-not-allowed border-gray-100" 
                  : "cursor-pointer border-gray-200 hover:border-brand-accent hover:bg-brand-accent/5"
              }`}
            >
              <MoveRight size={18} className="rotate-180 text-gray-400 group-hover:text-brand-accent" />
            </button>

            {/* Numeric Page Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`h-10 w-10 text-[11px] font-bold tracking-tighter transition-all rounded-full border ${
                  page === pageNum
                    ? "bg-brand-primary text-white border-brand-primary shadow-lg"
                    : "text-gray-500 border-transparent hover:bg-gray-100 hover:text-brand-primary"
                }`}
              >
                {pageNum < 10 ? `0${pageNum}` : pageNum}
              </button>
            ))}

            {/* Next Page Button */}
            <button
              disabled={page === totalPages}
              onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
              className={`group flex h-12 w-12 items-center justify-center rounded-full border transition-all ${
                page === totalPages 
                  ? "opacity-30 cursor-not-allowed border-gray-100" 
                  : "cursor-pointer border-gray-200 hover:border-brand-accent hover:bg-brand-accent/5"
              }`}
            >
              <MoveRight size={18} className="text-gray-400 group-hover:text-brand-accent" />
            </button>
          </div>

          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium text-center">
            Showing {(page - 1) * limit + 1} - {Math.min(page * limit, meta.total)} of {meta.total} Products
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;