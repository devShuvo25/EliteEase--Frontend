"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { sliders } from "@/constant/slider";
import { ArrowRight } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function SwiperSlider() {
  const { isSearching } = useAppSelector((state) => state.search);
  
  if (isSearching) return null;

  return (
    <div className="container mx-auto px-4 py-4"> {/* Reduced vertical padding from py-12 to py-4 */}
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        loop={true}
        speed={800}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 }, // Added extra breakpoint to keep individual slides small
        }}
        modules={[Autoplay, Pagination]}
        className="compact-luxury-swiper .\!pb-8"
      >
        {sliders.map((slider) => (
          <SwiperSlide key={slider.id}>
            <div className="group relative h-35 md:h-40 w-full rounded-xl overflow-hidden  bg-ui-surface">
              {/* Image */}
              <Image
                src={slider.cover}
                alt={slider.title || "Collection"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Minimalist Overlay - subtle darkening for text legibility */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

              {/* Content - Static and minimal to save space */}
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div className="space-y-0.5">
                  <p className="text-[8px] uppercase tracking-[0.2em] text-brand-accent font-bold">
                    Series 26
                  </p>
                  <h3 className="text-white font-display text-xs md:text-sm font-bold truncate max-w-37.5">
                    {slider.title}
                  </h3>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-1.5 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <ArrowRight className="text-white h-3 w-3" />
                </div>
              </div>

              {/* Accent Line */}
              <div className="absolute top-0 left-0 h-[1.5px] w-0 bg-brand-accent transition-all duration-500 group-hover:w-full" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .compact-luxury-swiper .swiper-pagination {
          bottom: 0px !important;
        }
        .compact-luxury-swiper .swiper-pagination-bullet {
          width: 4px;
          height: 4px;
          background: #ccc;
          opacity: 0.5;
          transition: all 0.3s;
        }
        .compact-luxury-swiper .swiper-pagination-bullet-active {
          background: var(--brand-accent) !important;
          width: 16px;
          border-radius: 2px;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}