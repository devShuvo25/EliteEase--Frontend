import React from "react";
import ProductCard from "../productCard/Product.Card";
import { MoveRight } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/api/productsApis";
import { ProductsHeader } from "./ProductsHeader";
import { useAppSelector } from "@/redux/hooks";

const Products = () => {
  const { data: res, isLoading } = useGetAllProductsQuery();
  const products = res?.data || [];
  const { searchTerm } = useAppSelector((state) => state.search);
  console.log(searchTerm)
  if (isLoading) return <div className="text-center py-20 text-brand-primary">Loading Collection...</div>;

  return (
    <div id="products" className="container mx-auto px-4 py-12">
      {/* Header with Price Filter & Item Count */}
      <ProductsHeader itemCount={products?.length} />

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-6">
        {products?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Pagination Design */}
      <div className="mt-20 flex flex-col items-center gap-6">
        <div className="flex items-center justify-center gap-1">
          
          {/* Back Arrow */}
          <button className="cursor-pointer group mr-4 flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 transition-all hover:border-brand-accent">
            <MoveRight size={16} className="rotate-180 text-gray-400 transition-colors group-hover:text-brand-accent" />
          </button>

          {/* Page Numbers */}
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              className={` cursor-pointer h-10 w-10 text-[11px] font-bold tracking-tighter transition-all rounded-full ${
                num === 1
                  ? "bg-brand-primary text-white shadow-lg"
                  : "text-gray-500 hover:bg-ui-soft hover:text-brand-primary"
              }`}
            >
              0{num}
            </button>
          ))}

          {/* Forward Arrow */}
          <button className="cursor-pointer group ml-4 flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 transition-all hover:border-brand-accent">
            <MoveRight size={16} className="text-gray-400 transition-colors group-hover:text-brand-accent" />
          </button>
        </div>
        
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">
          Showing 1 - 12 of {products?.length} Products
        </p>
      </div>
    </div>
  );
};

export default Products;