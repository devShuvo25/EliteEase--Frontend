import { Star, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InfoProps {
  brand: string | null;
  name: string;
  price: number;
  compareAt?: number | null;
  rating: number;
  reviewCount: number;
  description: string;
}

export const ProductInfo = ({ brand, name, price, compareAt, rating, reviewCount, description }: InfoProps) => (
  <div className="flex flex-col border-b border-gray-100 pb-10">
    <div className="flex items-center justify-between mb-2">
      <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-accent">{brand}</span>
      <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
        <Star size={12} className="fill-brand-accent text-brand-accent" />
        {rating} ({reviewCount})
      </div>
    </div>
    
    <h1 className="text-4xl font-bold tracking-tight text-brand-primary mb-6">{name}</h1>
    
    <div className="flex items-baseline gap-4 mb-8">
      <span className="text-3xl font-black text-brand-primary">${price}</span>
      {compareAt && <span className="text-lg text-gray-300 line-through">${compareAt}</span>}
    </div>

    <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-xl">{description}</p>

    <div className="flex gap-4">
      <Button className="flex-1 h-14 bg-brand-primary hover:bg-brand-primary/90 text-[10px] font-bold uppercase tracking-[0.2em] rounded-none">
        <ShoppingBag className="mr-2" size={18} /> Add to Collection
      </Button>
      <Button variant="outline" className="h-14 w-14 rounded-none border-gray-200 hover:border-brand-accent hover:text-brand-accent transition-all">
        <Heart size={20} />
      </Button>
    </div>
  </div>
);