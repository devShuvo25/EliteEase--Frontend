import React from 'react';
import { MoveRight, ChevronDown } from 'lucide-react';

interface ProductsHeaderProps {
  itemCount: number;
  onPriceChange?: (range: string) => void;
  onBrandChange?: (brand: string) => void; // Added brand prop
  onViewAll?: () => void;
}

export const ProductsHeader = ({ 
  itemCount = 0, 
  onPriceChange, 
  onBrandChange,
  onViewAll 
}: ProductsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6 border-b border-gray-100 pb-8">
      {/* Title Section */}
      <div className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-primary">
          Flash Sale
        </h1>
        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
          {itemCount} Exceptional Pieces Found
        </p>
      </div>

      {/* Actions Section */}
      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
        
        {/* Brand Filter */}
        <div className="relative min-w-40">
          <select 
            onChange={(e) => onBrandChange?.(e.target.value)}
            className="w-full appearance-none bg-ui-soft border border-gray-200 px-4 py-2.5 pr-10 text-xs font-semibold uppercase tracking-wider text-brand-primary focus:outline-none focus:border-brand-accent transition-colors cursor-pointer"
          >
            <option value="">All Brands</option>
            <option value="apple">Apple</option>
            <option value="samsung">Samsung</option>
            <option value="sony">Sony</option>
            <option value="dell">Dell</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="relative min-w-40">
          <select 
            onChange={(e) => onPriceChange?.(e.target.value)}
            className="w-full appearance-none bg-ui-soft border border-gray-200 px-4 py-2.5 pr-10 text-xs font-semibold uppercase tracking-wider text-brand-primary focus:outline-none focus:border-brand-accent transition-colors cursor-pointer"
          >
            <option value="">Price Range</option>
            <option value="0-500">$0 - $500</option>
            <option value="500-2000">$500 - $2,000</option>
            <option value="2000-5000">$2,000 - $5,000</option>
            <option value="5000+">$5,000+</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};