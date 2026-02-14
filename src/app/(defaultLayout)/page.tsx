"use client";
import FashionBanner from "@/components/home/hero/Hero";
import JustForYou from "@/components/home/JustForYou/JustForYou";
import NewsLetterBanner from "@/components/home/newslater/newsLetterBanner";
import Products from "@/components/home/Products/Products";
import Slider from "@/components/ui/swiperSlide";
import TopBrand from "@/components/home/topBrand/TopBrand";
import React from "react";
import Categories from "@/components/home/categories/Categories";
import BestSoldProducts from "@/components/home/bestSoldProducts/bestSolledProducts";
import Brand from "@/components/home/brand/Brand";

const Home = () => {
  return (
    <div>
      <FashionBanner />
      <Slider />
      <Products />
      <Categories />
      <Brand />
      <BestSoldProducts />
      <JustForYou />
      <TopBrand />
      <NewsLetterBanner />
    </div>
  );
};

export default Home;
