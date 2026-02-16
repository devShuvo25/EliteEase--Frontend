"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { sliders } from "@/constant/slider";
import { ArrowRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useAppSelector } from "@/redux/hooks";

export default function SwiperSlider() {
    // 1. Grab the isSearching state from Redux
const { isSearching } = useAppSelector((state) => state.search);
  
    // 2. If searching, hide the entire component
if (isSearching) return null;
  return (
    <div className="container mx-auto px-4 py-12">
      <Swiper
        slidesPerView={1}
        spaceBetween={24}
        loop={true}
        speed={1000} // Smoother, slower transitions
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="luxury-swiper !pb-12"
      >
        {sliders.map((slider) => (
          <SwiperSlide key={slider.id}>
            <div className="group relative h-[180px] md:h-[240px] w-full overflow-hidden border border-ui-border bg-ui-surface">
              {/* Image with subtle zoom effect on hover */}
              <Image
                src={slider.cover}
                alt={slider.title || "Premium Electronic"}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Architectural Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Glassmorphic Content Label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="backdrop-blur-md bg-white/10 border border-white/20 p-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-brand-accent font-bold mb-1">
                    Featured Collection
                  </p>
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-display text-sm md:text-base font-bold">
                      {slider.title || "Upgrade Your Setup"}
                    </h3>
                    <ArrowRight className="text-white h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Subtle Top Accent Line (Always Visible) */}
              <div className="absolute top-0 left-0 h-[2px] w-0 bg-brand-accent transition-all duration-700 group-hover:w-full" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles for Swiper Bullets to match Brand Gold */}
      <style jsx global>{`
        .luxury-swiper .swiper-pagination-bullet-active {
          background: var(--brand-accent) !important;
          width: 24px !important;
          border-radius: 2px !important;
        }
        .luxury-swiper .swiper-pagination-bullet {
          background: var(--brand-primary);
        }
      `}</style>
    </div>
  );
}