/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {  useState } from "react";
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
import { 
  useCreateReviewsMutation,
  useDeleteReviewsMutation,
  useGetReviewsByProductIdQuery,
  useUpdateReviewsMutation, 

} from "@/redux/api/reviewsApis";
import { 
  useCreateQuestionsMutation, 
  useDeleteQuestionsMutation, 
  useGetQuestionsByIdQuery, 
  useUpdateQuestionsMutation 
} from "@/redux/api/questionsApis";
import { useAddToCartMutation } from "@/redux/api/cartApi";
import { Product } from "@/types/product";
import { closeAlert, showAppAlert, showConfirmDialog, showLoadingAlert } from "@/utils/alert";
import { useAddToWishlistMutation, useGetWishlistQuery } from "@/redux/api/wishListApis";
import { useAuthCheck } from "@/hook/useAuthCheck";
import { blog } from "@/constant/Blog";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const { checkAccess } = useAuthCheck();

  // --- API Hooks ---
  const { data: productRes, isLoading } = useGetProductByIdQuery({ id: productId! }, { skip: !productId });
  const { data: reviewsRes } = useGetReviewsByProductIdQuery({ id: productId! }, { skip: !productId });
  const { data: questionsRes } = useGetQuestionsByIdQuery(productId ?? "", { skip: !productId });
  const { data: wishRes } = useGetWishlistQuery(undefined);

  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  
  // Question Mutations
  const [createQuestion] = useCreateQuestionsMutation();
  const [updateQuestion] = useUpdateQuestionsMutation();
  const [deleteQuestion] = useDeleteQuestionsMutation();

  // Review Mutations
  const [createReview] = useCreateReviewsMutation();
  const [updateReview] = useUpdateReviewsMutation();
  const [deleteReview] = useDeleteReviewsMutation();

  // --- Derived State ---
  const product = (productRes?.data as Product) || {};
  const reviews = reviewsRes?.data || [];
  const questions = questionsRes?.data || [];
  const isExistInWishlist = wishRes?.data?.products?.some((p :Product) => p.id === product?.id);

  // --- Local UI State ---
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [question, setQuestion] = useState<string>("");

  const mainImage = selectedImg || product?.images?.[0]?.url || "/placeholder.png";
  const stock = product?.stock || 0;
// --- Derived State ---
console.log("product:",product)
const currentUnitPrice = product?.basePrice || 0; 
const totalPrice = currentUnitPrice * quantity;

  // --- Handlers ---
  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "inc" && quantity < stock) setQuantity((prev) => prev + 1);
    if (type === "dec" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCartAction = async () => {
    if (!checkAccess(['CUSTOMER', 'SUPER_ADMIN', 'STAFF', 'ADMIN'])) return;
    if (!productId) return toast.error("Product not found");
    if (stock < 1) return showAppAlert("Sorry, Stock out", "Try another product", "warning");

    const result = await showConfirmDialog("Add to Cart?", `Add ${quantity} units of ${product.name}?`);

    if (result.isConfirmed) {
      try {
        showLoadingAlert("Adding to Cart...", "Please wait");
        await addToCart({ productId, quantity }).unwrap();
        closeAlert();
        toast.success("Added to cart!", {
          action: { label: "View Cart", onClick: () => router.push('/cart') },
        });
      } catch (error: any) {
        closeAlert();
        showAppAlert("Oops!", error?.data?.message || "Failed to add", "error");
      }
    }
  };

  const handleAddToWishlist = async () => {
    if (isExistInWishlist) return toast.warning("Already in wishlist");
    try {
      await addToWishlist(productId!).unwrap();
      toast.success("Added to wishlist! ❤️");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add to wishlist");
    }
  };

  /**
   * Question Handler: handles both CREATE and UPDATE
   */
  const handleUpsertQuestion = async (content: string, editingId?: string) => {
    if (!checkAccess(['CUSTOMER', 'SUPER_ADMIN', 'STAFF', 'ADMIN'])) return;
    
    const trimmed = content.trim();
    if (trimmed.length < 5) return toast.warning("Question too short.");

    const formattedContent = (trimmed.charAt(0).toUpperCase() + trimmed.slice(1)) + 
                              (trimmed.endsWith('?') ? '' : '?');

    try {
      showLoadingAlert("Processing...", "Please wait");
      
      if (editingId) {
        await updateQuestion({ id: editingId, content: formattedContent }).unwrap();
        toast.success("Question updated!");
      } else {
        await createQuestion({
          content: formattedContent,
          productId: productId,
          isPublished: true
        }).unwrap();
        toast.success("Question submitted!");
      }

      closeAlert();
      setQuestion(""); 
    } catch (error: any) {
      closeAlert();
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    const result = await showConfirmDialog("Are you sure?", "This will delete your question permanently.");
    if (result.isConfirmed) {
      try {
        await deleteQuestion({id}).unwrap();
        toast.success("Question deleted.");
      } catch (error: any) {
        toast.error("Failed to delete.");
      }
    }
  };

  /**
   * Review Handler: handles both CREATE and UPDATE
   */
  const handleUpsertReview = async (rating: number, comment: string, editingId?: string) => {
    if (!checkAccess(['CUSTOMER', 'SUPER_ADMIN', 'STAFF', 'ADMIN'])) return;

    try {
      showLoadingAlert("Processing...", "Please wait");

      if (editingId) {
        const data = {
          id: editingId,
          rating,
          comment
        }
        await updateReview(data).unwrap()
        toast.success("Review updated!");
      } else {
        const data = {
          productId : productId,
          rating : rating,
          comment : comment
        }
        await createReview(data).unwrap();
        toast.success("Review submitted!");
      }
      closeAlert();
    } catch (error: any) {
      closeAlert();
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const handleDeleteReview = async (id: string) => {
    const result = await showConfirmDialog("Are you sure?", "This will delete your review permanently.");
    if (result.isConfirmed) {
      try {
        await deleteReview(id).unwrap();
        toast.success("Review deleted.");
      } catch (error: any) {
        toast.error("Failed to delete.");
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-[#f2f4f8] min-h-screen  pb-12 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">

        <div className="bg-white rounded shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <div className="border border-gray-100 rounded p-4 bg-white flex flex-col items-center">
                <div className="h-80 md:h-96 w-full flex items-center justify-center overflow-hidden">
                  <Image width={600} height={600} src={mainImage} alt={product.name || "Product"} className="max-h-full object-contain" priority />
                </div>
                <div className="flex gap-2 mt-6 overflow-x-auto pb-2 w-full no-scrollbar">
                  {product.images?.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImg(img.url)} className={`w-16 h-16 border rounded p-1 shrink-0 ${mainImage === img.url ? "border-brand-accent ring-2 ring-brand-accent/20" : "border-gray-200"}`}>
                      <Image alt="thumb" width={64} height={64} src={img.url} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              </div>
              <SocialShare />
            </div>

            <div className="lg:col-span-7">
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">{product.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge variant="secondary" className="bg-slate-100 text-slate-600">SKU: {product.sku}</Badge>
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-brand-accent text-brand-accent" />
                  <span className="text-xs font-bold">{product.avgRating?.toFixed(1) || "0.0"} / 5.0</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600 font-bold">
                  <CheckCircle2 size={14} /> In Stock ({stock})
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-5 mb-6 border border-slate-100">
                <h3 className="text-sm font-bold uppercase border-b pb-2 mb-3">Quick Overview</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.specifications?.slice(0, 6).map((spec, i) => (
                    <li key={i} className="text-xs text-slate-600 flex gap-2">
                      <span className="text-brand-accent">•</span>
                      <span><span className="font-bold">{spec.key}</span>: {spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <PriceCard label="Regular Price" price={Number(product.compareAtPrice)} variant="muted" />
                <PriceCard label="Special Price" price={Number(totalPrice)} variant="accent" />
              </div>

              <div className="flex flex-wrap items-center gap-4 border-t pt-8">
                <div className="flex items-center border border-slate-200 rounded-md h-12 bg-white">
                  <QtyBtn label="-" onClick={() => handleQuantity("dec")} disabled={quantity <= 1 || isAdding} />
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <QtyBtn label="+" onClick={() => handleQuantity("inc")} disabled={quantity >= stock || isAdding} />
                </div>
                <Button onClick={handleAddToCartAction} disabled={isAdding || stock < 1} className="bg-brand-primary text-white h-12 flex-1 font-bold uppercase tracking-widest">
                  {isAdding ? <Loader2 className="animate-spin mr-2" size={18} /> : <ShoppingCart className="mr-2" size={18} />}
                  Add to Cart
                </Button>
                <div className="flex gap-2">
                  <ActionIcon onClick={handleAddToWishlist} icon={<Heart size={20} className={isExistInWishlist ? "fill-rose-500 text-rose-500" : "text-gray-500"} />} hoverClass="hover:text-rose-500" />
                  <ActionIcon icon={<ArrowRightLeft size={20} />} hoverClass="hover:text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <Specsification specifications={product.specifications ?? []} />
            <ProductBlogCard blogPost={blog ?? null} />
            <ProductQA 
                questions={questions} 
                onUpdate={handleUpsertQuestion}
                onCreate={handleUpsertQuestion} 
                onDelete={handleDeleteQuestion} 
                setQuestion={setQuestion} 
                question={question} 
            />
            <ProductReviews 
                reviews={reviews} 
                onCreate={handleUpsertReview}
                onUpdate={(id, comment, rating) => handleUpsertReview(rating, comment, id)}
                onDelete={handleDeleteReview}
            />
          </div>
          <div className="hidden lg:block">
            <ProductSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const LoadingSpinner = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4">
    <Loader2 className="animate-spin text-brand-primary" size={40} />
    <p className="text-sm font-medium text-gray-500">Loading Product Details...</p>
  </div>
);

const PriceCard = ({ label, price, variant }: { label: string; price: number; variant: "muted" | "accent" }) => (
  <div className={`flex-1 p-4 rounded-lg border-l-4 shadow-sm ${variant === "accent" ? "bg-brand-accent/5 border-brand-accent" : "bg-slate-50 border-slate-300"}`}>
    <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${variant === "accent" ? "text-brand-accent" : "text-slate-500"}`}>{label}</p>
    <p className={`text-2xl font-black ${variant === "accent" ? "text-brand-accent" : "text-slate-700"}`}>৳{price.toLocaleString()}</p>
  </div>
);

const QtyBtn = ({ label, onClick, disabled }: { label: string; onClick: () => void; disabled: boolean }) => (
  <button type="button" onClick={onClick} disabled={disabled} className="px-4 h-full hover:bg-slate-100 disabled:opacity-20 font-bold transition-colors">{label}</button>
);

const ActionIcon = ({ icon, hoverClass, onClick }: { icon: React.ReactNode; hoverClass: string; onClick?: () => void }) => (
  <Button onClick={onClick} variant="outline" size="icon" className={`h-12 w-12 border-slate-200 bg-white shadow-sm transition-all ${hoverClass}`}>
    {icon}
  </Button>
);



const SocialShare = () => (
  <div className="flex items-center justify-center gap-5 mt-8 text-slate-400 border-t pt-6">
    <span className="text-[10px] font-bold uppercase tracking-widest">Share:</span>
    <Facebook size={18} className="cursor-pointer hover:text-blue-600" />
    <Twitter size={18} className="cursor-pointer hover:text-sky-500" />
    <Share2 size={18} className="cursor-pointer hover:text-brand-accent" />
  </div>
);

export default ProductDetailsPage;