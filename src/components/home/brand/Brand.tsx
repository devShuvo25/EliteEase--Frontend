import { useGetAllProductsQuery } from "@/redux/api/productsApis";
import { Product } from "@/types/product";
import { ArrowRight, Star, MoveRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const Brand = () => {
  const { data: res } = useGetAllProductsQuery();
  const products: Product[] = res?.data || [];

  const sidebarImg =
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1000&auto=format&fit=crop";

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between border-b border-ui-border pb-4">
        <h2 className="font-display text-xl font-bold tracking-tight text-brand-primary uppercase">
          Brand{" "}
          <span className="text-brand-accent italic font-medium">
            Exclusives
          </span>
        </h2>
        <button className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-primary hover:text-brand-accent transition-colors">
          View All{" "}
          <MoveRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative w-full lg:w-[300px] xl:w-[350px] h-[200px] lg:h-auto overflow-hidden bg-brand-primary group">
          <Image
            src={sidebarImg}
            alt="Brand Banner"
            fill
            className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-primary via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 space-y-2">
            <span className="bg-brand-accent text-brand-primary px-2 py-0.5 text-[9px] font-black uppercase tracking-widest">
              Series 2026
            </span>
            <p className="text-white font-display text-lg font-bold leading-tight uppercase">
              The Future of <br /> Computing.
            </p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {products?.slice(0, 6).map((product, idx) => (
            <div
              key={product?.id ?? idx}
              className="group relative flex items-center gap-4 border border-ui-border bg-white p-3 transition-all hover:border-brand-accent shadow-sm"
            >
              <div className="relative h-16 w-16 flex-shrink-0 bg-ui-soft">
                <Image
                  src={
                    product.image ??
                    product.images?.[0]?.url ??
                    "/images/placeholder.png"
                  }
                  fill
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                  alt={product.title ?? product.name ?? "brand"}
                />
              </div>

              <div className="flex flex-col min-w-0">
                <h3 className="line-clamp-1 text-[11px] font-bold uppercase tracking-tight text-brand-primary group-hover:text-brand-accent transition-colors">
                  {product.title ?? product.name}
                </h3>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-brand-primary">
                    <span className="text-[9px] mr-0.5 font-normal">BDT</span>
                    {product.currentPrice?.toLocaleString()}
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-1.5 opacity-60">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={8}
                        className={`${i < Math.round(product.rating ?? 0) ? "fill-brand-accent text-brand-accent" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-bold text-brand-primary">
                    {product.rating}
                  </span>
                </div>
              </div>

              <div className="absolute right-3 opacity-0 transition-opacity group-hover:opacity-100">
                <ArrowRight size={14} className="text-brand-accent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brand;
