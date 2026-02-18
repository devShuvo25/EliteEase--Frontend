"use client"
import React from "react";
import Image from "next/image";
import { Trash2, X, ShoppingBag, Loader2, HeartOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";

interface WishlistPageModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClose: () => void;
  products: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
  isRemoving: boolean;
  isClearing: boolean;
}

const WishlistPageModal = ({
  isOpen,
  setIsOpen,
  onClose,
  products,
  onRemove,
  onClear,
  isRemoving,
  isClearing,
}: WishlistPageModalProps) => {
  const router = useRouter();
  if (!isOpen) return null;

  const handleViewDetails = (id: string) => {
    if (id) {
      setIsOpen(false);
      router.push(`/product/${id}`);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Sidebar */}
      <div className="relative w-full max-w-lg bg-[#f8fafc] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="bg-white px-6 py-5 border-b flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-brand-primary" size={24} />
            <h2 className="text-xl font-bold text-slate-800">My Wishlist ({products?.length || 0})</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={24} className="text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {products && products?.length > 0 ? (
            products?.map((product) => (
              <div 
                key={product.id}
                onClick={() => handleViewDetails(product?.id as string)} 
                className="group cursor-pointer bg-white border border-slate-100 rounded-xl p-4 flex gap-4 items-center shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Product Image */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-50 shrink-0 border border-slate-50">
                  <Image
                    src={product.images?.[0]?.url || "/placeholder.png"}
                    alt={product?.name as string}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                
                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-brand-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-brand-primary font-black mt-1">৳{Number(product.basePrice).toLocaleString()}</p>
                </div>

                {/* Actions Group */}
                <div className="flex items-center gap-1">
                  {/* VIEW BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents parent div onClick
                      handleViewDetails(product?.id as string) ;
                    }}
                    className="p-2.5 text-slate-400 hover:text-brand-primary hover:bg-blue-50 rounded-lg transition-all"
                    title="View Product"
                  >
                    <Eye size={20} />
                  </button>

                  {/* REMOVE BUTTON */}
                  <button
                    disabled={isRemoving}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents navigating to details page
                      onRemove(product?.id as string);
                    }}
                    className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all disabled:opacity-50"
                    title="Remove Item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="bg-slate-100 p-6 rounded-full">
                <HeartOff size={48} className="text-slate-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Your wishlist is empty</h3>
                <p className="text-slate-500 text-sm px-10">Add items you love to find them later!</p>
              </div>
              <Button onClick={onClose} className="bg-brand-primary h-12 px-8 rounded-xl">Continue Shopping</Button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {products && products.length > 0 && (
          <div className="p-6 bg-white border-t space-y-3">
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-slate-500 font-medium text-sm">Summary</span>
              <span className="text-slate-800 font-bold">{products.length} Items</span>
            </div>
            
            <Button
              onClick={onClear}
              disabled={isClearing}
              variant="outline"
              className="w-full border-rose-100 text-rose-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 h-12 rounded-xl font-bold transition-all"
            >
              {isClearing ? <Loader2 className="animate-spin mr-2" /> : <Trash2 size={18} className="mr-2" />}
              Clear All Favorites
            </Button>
            
            <Button
              onClick={onClose}
              className="w-full text-white h-12 rounded-xl font-bold"
            >
              Close Wishlist
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPageModal;