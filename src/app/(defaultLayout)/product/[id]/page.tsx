/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Heart,
  CheckCircle2,
  Share2,
  Facebook,
  Twitter,
  ArrowRightLeft,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

// UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Custom Components
import { ProductReviews } from "@/components/reviews/ProductReviews";
import { ProductBlogCard } from "@/components/blog/ProductsBlog";
import { ProductQA } from "@/components/QNA/QNA";
import { ProductSidebar } from "@/components/ProductSideBar/Product.SideBar";
import { Specsification } from "@/components/ProductsSpecifications/Specifications";

// Redux & Types
import { useGetProductByIdQuery } from "@/redux/api/productsApis";
import { useGetReviewsByProductIdQuery } from "@/redux/api/reviewsApis";
import { useGetQuestionsByIdQuery } from "@/redux/api/questionsApis";
import { useAddToCartMutation } from "@/redux/api/cartApi";
import { Product } from "@/types/product";
import { closeAlert, showAppAlert, showConfirmDialog, showLoadingAlert } from "@/utils/alert";
import { useAddToWishlistMutation, useGetWishlistQuery, useRemoveFromWishlistMutation } from "@/redux/api/wishListApis";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const router = useRouter()

  // --- Data Fetching ---
  const { data: productRes, isLoading } = useGetProductByIdQuery(
    { id: productId! },
    { skip: !productId }
  );
  const { data: reviewsRes } = useGetReviewsByProductIdQuery(
    { id: productId! },
    { skip: !productId }
  );
  const { data: questionsRes } = useGetQuestionsByIdQuery(productId ?? "", {
    skip: !productId,
  });
  const [addToWishlist, { isLoading : wishListLoading }] = useAddToWishlistMutation();
  const {data: wishRes} = useGetWishlistQuery(undefined)
  const [removeFromWishlist, { isLoading: isRemoving }] = useRemoveFromWishlistMutation();



  // API Mutations
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

  const product = productRes?.data as Product || {};
  const reviews = reviewsRes?.data || [];
  const questions = questionsRes?.data || [];
  const isExist = wishRes?.data?.products?.some(p => p.id === product?.id )
  console.log(isExist)

  // --- State ---
const [selectedImg, setSelectedImg] = useState<string | null>(null);
const [quantity, setQuantity] = useState(1);
const mainImage = selectedImg || product?.images?.[0]?.url || "/placeholder.png";
  


  // --- Handlers ---
  const stock = product?.stock || 0
  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "inc" && quantity < (product?.stock || 0)) {
      setQuantity((prev) => prev + 1);
    }
    if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

const handleAddToCartAction = async () => {
  // 1. Basic validation
  if (!productId) return toast.error("Product not found");
  
  if (!product?.stock || product.stock < 1) {
    return showAppAlert("Sorry, Stock out", "Try another product", "warning");
  }

  // 2. Trigger Confirmation and WAIT for result
  const result = await showConfirmDialog(
    "Add to Cart?", 
    `Do you want to add ${quantity} x ${product.name} to your cart?`
  );

  // 3. Proceed only if user confirmed
  if (result.isConfirmed) {
    try {
      // 4. Show the new Loading Alert
      showLoadingAlert("Adding to Cart...", "Please wait a moment");

      // Execute the API call
      await addToCart({ productId, quantity }).unwrap();

      // 5. Success Flow
      // Close the loading alert first
      closeAlert(); 

      toast.success(`${product.name} added to cart!`, {
        description: `Quantity: ${quantity}`,
        action: {
          label: "View Cart",
          onClick: () => {
            router.push('/cart')
          }, 
        },
      });

    } catch (error: any) {
      // 6. Error Flow
      closeAlert(); // Ensure loading is closed before showing error
      const errorMsg = error?.data?.message || "Failed to add to cart";
      showAppAlert("Oops!", errorMsg, "error");
    }
  }
};
const handleAddToWishlist = async (productId: string) => {
  try {
    // 1. Call the API
    if(isExist){
      return toast.warning("Already in wishlist")
    }
    const res = await addToWishlist(productId).unwrap();
    
    // 2. Alert the user with a professional toast
    if (res.success) {
      toast.success("Added to wishlist! ❤️");
    }
  } catch (error: any) {
    // 3. Handle errors (e.g., product already exists or not logged in)
    const errorMessage = error?.data?.message || "Failed to add to wishlist";
    toast.error(errorMessage);
    
    // Fallback alert if you specifically want a browser popup for errors
    // alert(errorMessage); 
  }
};

  if (isLoading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-brand-primary" size={40} />
        <p className="text-sm font-medium text-gray-500">Loading Product Details...</p>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">Product not found.</p>
      </div>
    );

  return (
    <div className="bg-[#f2f4f8] min-h-screen pt-24 pb-12 font-sans">
      {/* <CartDialog/> */}
      <div className="container mx-auto px-4 max-w-7xl">
        <Breadcrumbs brand={product.brand as string} />

        <div className="bg-white rounded shadow-sm p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 1. Gallery Section */}
            <div className="lg:col-span-5">
              <div className="border border-gray-100 rounded p-4 flex flex-col items-center bg-white">
                <div className="h-80 md:h-96 w-full flex items-center justify-center overflow-hidden">
                  <Image
                    width={600}
                    height={600}
                    src={mainImage || "/placeholder.png"}
                    alt={product.name as string}
                    className="max-h-full object-contain hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
                <div className="flex gap-2 mt-6 overflow-x-auto pb-2 w-full no-scrollbar">
                  {product.images?.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImg(img?.url)}
                      className={`w-16 h-16 border rounded p-1 shrink-0 transition-all ${
                        mainImage === img?.url
                          ? "border-brand-accent ring-2 ring-brand-accent/20"
                          : "border-gray-200"
                      }`}
                    >
                      <Image
                        alt="thumb"
                        width={64}
                        height={64}
                        src={img?.url}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>
              <SocialShare />
            </div>

            {/* 2. Content Section */}
            <div className="lg:col-span-7">
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug mb-4">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge variant="secondary" className="bg-slate-100 text-slate-600 px-3 py-1">
                  SKU: {product.sku}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-brand-accent text-brand-accent" />
                  <span className="text-xs font-bold text-slate-700">
                    {product.avgRating?.toFixed(1) || "0.0"} / 5.0
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600 font-bold">
                  <CheckCircle2 size={14} /> In Stock ({product.stock})
                </div>
              </div>

              {/* Specs Preview */}
              <div className="bg-slate-50 rounded-lg p-5 mb-6 border border-slate-100">
                <h3 className="text-sm font-bold uppercase border-b border-slate-200 pb-2 mb-3 text-slate-700">
                  Quick Overview
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.specifications?.slice(0, 6).map((spec, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                      <span className="text-brand-accent">•</span>
                      <span>
                        <span className="font-bold">{spec.key}</span>: {spec.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <PriceCard
                  label="Regular Price"
                  price={Number(product.compareAtPrice)}
                  variant="muted"
                />
                <PriceCard
                  label="Special Price"
                  price={Number(product.basePrice)}
                  variant="accent"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 border-t pt-8">
                <div className="flex items-center border border-slate-200 rounded-md h-12 overflow-hidden bg-white shadow-sm">
                  <QtyBtn
                    label="-"
                    onClick={() => handleQuantity("dec")}
                    disabled={quantity <= 1 || isAdding}
                  />
                  <span className="w-12 text-center font-bold text-slate-700">
                    {quantity}
                  </span>
                  <QtyBtn
                    label="+"
                    onClick={() => handleQuantity("inc")}
                    disabled={quantity >= (product.stock || 0) || isAdding}
                  />
                </div>

                <Button
                  onClick={() => handleAddToCartAction()}
                  disabled={isAdding || stock < 1}
                  className="cursor-pointer bg-brand-primary hover:bg-brand-primary/90 text-white flex-1 h-12 text-xs font-bold uppercase tracking-widest shadow-md"
                >
                  {isAdding ? (
                    <Loader2 className="mr-2 animate-spin" size={18} />
                  ) : (
                    <ShoppingCart className="mr-2" size={18} />
                  )}
                  {isAdding ? "Adding..." : "Add to Cart"}
                </Button>

                <div onClick={() => handleAddToWishlist(product?.id)} className="flex gap-2">
                  <ActionIcon
                    
                    icon={<Heart size={20}
                    className={isExist ? "fill-rose-500 text-rose-500" : "text-gray-500"}
                    />}
                    hoverClass="hover:text-rose-500 hover:border-rose-500 hover:bg-rose-50"
                    
                  />
                  <ActionIcon
                    icon={<ArrowRightLeft size={20} />}
                    hoverClass="hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <Specsification specifications={product.specifications ?? []} />
          </div>
          
          <div className="hidden lg:block">
            <ProductSidebar />
          </div>
          
        </div>
             <ProductBlogCard blogPost={product.blogPost ?? null} />
            <ProductQA questions={questions} />
            <ProductReviews reviews={reviews} />
      </div>
    </div>
  );
};

// --- Modular Sub-components ---

const Breadcrumbs = ({ brand }: { brand?: string }) => (
  <nav className="flex items-center mt-9 gap-2 text-[10px] uppercase tracking-wider text-slate-500 mb-4 bg-white px-4 py-3 rounded shadow-sm border border-slate-100">
    <span className="hover:text-brand-accent cursor-pointer transition-colors">Home</span>
    <span className="text-slate-300">/</span>
    <span className="hover:text-brand-accent cursor-pointer transition-colors">Component</span>
    <span className="text-slate-300">/</span>
    <span className="text-slate-800 font-bold">{brand}</span>
  </nav>
);

const PriceCard = ({
  label,
  price,
  variant,
}: {
  label: string;
  price: number;
  variant: "muted" | "accent";
}) => (
  <div
    className={`flex-1 p-4 rounded-lg border-l-4 shadow-sm transition-all hover:shadow-md ${
      variant === "accent"
        ? "bg-brand-accent/5 border-brand-accent"
        : "bg-slate-50 border-slate-300"
    }`}
  >
    <p
      className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
        variant === "accent" ? "text-brand-accent" : "text-slate-500"
      }`}
    >
      {label}
    </p>
    <p
      className={`text-2xl font-black ${
        variant === "accent" ? "text-brand-accent" : "text-slate-700"
      }`}
    >
      ৳{price > 0 ? price.toLocaleString() : "0"}
    </p>
  </div>
);

const QtyBtn = ({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="px-4 h-full hover:bg-slate-100 disabled:opacity-20 transition-colors font-bold text-slate-600 border-none"
  >
    {label}
  </button>
);

const ActionIcon = ({
  icon,
  hoverClass,
}: {
  icon: React.ReactNode;
  hoverClass: string;
}) => (
  <Button
    variant="outline"
    size="icon"
    className={`h-12 w-12 border-slate-200 bg-white transition-all shadow-sm ${hoverClass}`}
  >
    {icon}
  </Button>
);

const SocialShare = () => (
  <div className="flex items-center justify-center gap-5 mt-8 text-slate-400 border-t border-slate-100 pt-6">
    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Share This:</span>
    <Facebook size={18} className="cursor-pointer hover:text-blue-600 transition-colors" />
    <Twitter size={18} className="cursor-pointer hover:text-sky-500 transition-colors" />
    <Share2 size={18} className="cursor-pointer hover:text-brand-accent transition-colors" />
  </div>
);

export default ProductDetailsPage;