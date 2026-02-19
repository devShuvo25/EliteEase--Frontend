"use client";

import React, { useState, useRef } from "react";
import { Star, Send, UserCircle, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuthCheck } from "@/hook/useAuthCheck";

interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: { firstName: string; lastName: string; avatarUrl?: string | null };
}

interface ProductReviewsProps {
  reviews?: Review[];
  onCreate: (rating: number, comment: string) => void;
  onUpdate: (id: string, comment: string, rating: number) => void;
  onDelete: (id: string) => void;
}

export const ProductReviews = ({ reviews, onCreate, onUpdate, onDelete }: ProductReviewsProps) => {
  const { user } = useAuthCheck();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEditInitiation = (review: Review) => {
    setEditingId(review.id);
    setRating(review.rating);
    setComment(review.comment);
    
    if (textareaRef.current) {
      textareaRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      textareaRef.current.focus();
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setRating(0);
    setComment("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim()) return;

    if (editingId) {
      onUpdate(editingId, comment, rating);
    } else {
      onCreate(rating, comment);
    }

    // Reset
    setEditingId(null);
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
            {reviews?.length || 0} Reviews
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {reviews?.map((review) => {
            const isOwner = user?.id === review.userId;
            const isBeingEdited = editingId === review.id;

            return (
              <div
                key={review.id}
                className={`bg-white border border-gray-100 p-6 rounded-lg transition-all ${
                  isBeingEdited ? "opacity-50 ring-2 ring-brand-accent/20" : "hover:border-brand-accent/20"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-brand-primary border border-gray-100">
                      <UserCircle size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-brand-primary uppercase tracking-tight">
                        {review.user.firstName} {review.user.lastName}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {new Date(review.createdAt).toLocaleDateString("en-US", {
                          month: "long", day: "numeric", year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={`${i < review.rating ? "fill-brand-accent text-brand-accent" : "text-gray-200"}`}
                        />
                      ))}
                    </div>
                    
                    {isOwner && !isBeingEdited && (
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => handleEditInitiation(review)}
                          className="p-1 text-gray-400 hover:text-brand-primary transition-colors"
                        >
                          <Pencil size={14} />
                        </button>
                        <button 
                          onClick={() => onDelete(review.id)}
                          className="p-1 text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- REVIEW FORM --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-brand-primary tracking-tight">
              {editingId ? "Update Your Feedback" : "Product Feedback"}
            </h2>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
              {editingId ? "Modify your rating and comment" : "Submit your review below"}
            </p>
          </div>
          {editingId && (
            <Button variant="ghost" size="sm" onClick={cancelEdit} className="text-rose-500 text-xs font-bold uppercase">
              <X size={14} className="mr-1" /> Cancel Edit
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-8">
          <div className="flex flex-col">
            <span className="text-[9px] font-semibold uppercase tracking-widest mb-2">Tap to rate</span>
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
                    className={`${star <= (hover || rating) ? "fill-brand-accent text-brand-accent" : "text-gray-200"} transition-colors duration-150`}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <span className="mt-2 text-[10px] font-bold text-brand-accent tracking-tight">
                {rating}/5 — {rating === 5 ? "Excellent" : rating >= 4 ? "Great" : "Good"}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Your Review</label>
<Textarea
  ref={textareaRef}
  value={comment}
  onChange={(e) => setComment(e.target.value)}
  placeholder="Write your thoughts here..."
 className={`
    min-h-24 w-full p-4 text-sm transition-all duration-300 resize-none
    bg-white rounded-xl outline-none shadow-sm
    placeholder:text-gray-300
    
    /* Default Border: Thin 1px */
    border-[1px] border-gray-100 hover:border-gray-200
    
    /* Focus State: Maintain 1px thickness but change color */
    focus:border-brand-primary 
    focus:ring-[3px] focus:ring-brand-primary/5
    
    /* Editing State */
    ${editingId 
      ? 'border-brand-accent ring-[3px] ring-brand-accent/5' 
      : ''
    }
  `}
  required
/>
          </div>

          <Button
            type="submit"
            disabled={rating === 0 || !comment}
            className={`w-45 text-white h-12 ${editingId ? 'bg-brand-accent' : 'bg-brand-primary'} hover:opacity-90 text-xs font-bold uppercase tracking-[0.2em] shadow-md transition-all disabled:opacity-30`}
          >
            {editingId ? <><Pencil size={14} className="mr-2" /> Update Review</> : <><Send size={14} className="mr-2" /> Submit Review</>}
          </Button>
        </form>
      </div>
    </div>
  );
};