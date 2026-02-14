import React from "react";
import ProductCard from "../productCard/Product.Card";
import { MoveRight } from "lucide-react";
import { TECH_PRODUCTS } from "@/constant/product";
import { Product } from "@/types/product";
import { useGetAllProductsQuery } from "@/redux/api/productsApis";

const JustForYou = () => {
  const {data:res,isLoading} = useGetAllProductsQuery()
  const products = res?.data || []
  return (
    <div className="container mx-auto px-4 py-8">
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <div className="relative">
          <h2 className="text-2xl md:text-3xl font-bold text-[#222222]">
            Just For You
          </h2>
          <div className="mt-1 h-1 w-24 rounded-full bg-orange-400"></div>{" "}
          {/* Decorative underline */}
        </div>
        <button className="group flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-black">
          View All
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 transition-all group-hover:border-black">
            <MoveRight size={14} />
          </div>
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.slice(0, 4)
          .map((product: Product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default JustForYou;
