"use client";

import React, { useState } from "react";
import { Star, Send, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";



interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: { firstName: string; lastName: string; avatarUrl?: string | null };
}

interface ProductReviewsProps {
  reviews?: Review[];
}

export const ProductReviews = ({ reviews }: ProductReviewsProps) => {
  console.log("reviews,", reviews)
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRating(0);
    setComment("");
  };

  return (
    <div className="flex flex-col gap-8 mt-8">
      {/* --- REVIEWS LIST --- */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-sm font-bold uppercase tracking-widest text-brand-primary">
            Customer Reviews
          </h3>
          <span className="text-xs text-gray-400">
            {reviews?.length} Reviews
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {reviews?.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-100 p-6 rounded-lg transition-all hover:border-brand-accent/20"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-ui-soft flex items-center justify-center text-brand-primary border border-gray-100">
                    <UserCircle size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-primary uppercase tracking-tight">
                      {review.user.firstName} {review.user.lastName}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-medium">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={`${i < review.rating ? "fill-brand-accent text-brand-accent" : "text-gray-200"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed pl-13">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- REVIEW FORM --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-brand-primary tracking-tight">
            Product Feedback
          </h2>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
            Submit your review below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-8">
          <div className="flex flex-col">
            {/* Minimal Label */}
            <span className="text-[9px] font-semibold uppercase tracking-widest  mb-2">
              Tap to rate
            </span>

            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform active:scale-95"
                >
                  <Star
                    size={28}
                    className={`${
                      star <= (hover || rating)
                        ? "fill-brand-accent text-brand-accent"
                        : "text-gray-200"
                    } transition-colors duration-150`}
                    strokeWidth={1.5} // Thinner stroke for a lighter feel
                  />
                </button>
              ))}
            </div>

            {/* Discrete Status Text */}
            {rating > 0 && (
              <span className="mt-2 text-[10px] font-bold text-brand-accent tracking-tight animate-in fade-in duration-300">
                {rating}/5 —{" "}
                {rating === 5 ? "Excellent" : rating >= 4 ? "Great" : "Good"}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">
              Your Review
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your thoughts here..."
              className="min-h-24 w-full bg-white border-gray-100 rounded-xl text-sm p-4 
                 placeholder:text-gray-300 shadow-sm transition-all duration-200
                 focus:border-brand-accent focus:ring-0 focus-visible:ring-0 
                 resize-none border-[1.5px]"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={rating === 0 || !comment}
            className="w-45 text-white h-12 bg-brand-primary hover:bg-brand-primary/90 text-xs font-bold uppercase tracking-[0.2em] shadow-md transition-all disabled:opacity-30"
          >
            <Send size={14} className="mr-2" /> Submit Review
          </Button>
        </form>
      </div>
    </div>
  );
};
