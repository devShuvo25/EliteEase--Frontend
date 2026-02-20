import { BRANDS } from '@/constant/brandsData';
import { Product } from '@/types/product';
import { ChevronDown, Filter } from 'lucide-react';

interface ProductsHeaderProps {
  products : Product[]
  itemCount: number;
  setBrand: (value: string | undefined) => void;
  setPrice: (value: string | undefined) => void;
  onViewAll?: () => void;
}

export const ProductsHeader = ({ 
  itemCount = 0,
  products, 
  setBrand,
  setPrice 
}: ProductsHeaderProps) => {
  
  return (
    // Reduced mb-12 -> mb-6 and pb-8 -> pb-3
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 border-b border-gray-100 pb-3">
      
      {/* Title Section - Tightened spacing */}
      <div className="flex flex-col md:flex-row items-baseline gap-2">
        <h1 className="text-xl md:text-2xl font-black tracking-tighter text-brand-primary uppercase">
          Flash Sale
        </h1>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded">
          {itemCount} Units
        </span>
      </div>

      {/* Actions Section - Compacted dropdowns */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="hidden md:block text-gray-300 mr-1">
          <Filter size={14} />
        </div>
        
        {/* Brand Filter */}
        <div className="relative flex-1 md:min-w-35">
          <select 
            onChange={(e) => setBrand?.(e.target.value)}
            className="w-full appearance-none bg-gray-50 border border-gray-200 px-3 py-1.5 pr-8 text-[10px] font-bold uppercase tracking-tight text-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all cursor-pointer rounded-md"
          >
            <option value="">All Brands</option>
            
           {BRANDS?.map((b,i) => <option key={i} value={b.value}>{b.name}</option> )}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <ChevronDown size={12} className="text-gray-400" />
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="relative flex-1 md:min-w-35">
          <select 
            onChange={(e) => setPrice?.(e.target.value)}
            className="w-full appearance-none bg-gray-50 border border-gray-200 px-3 py-1.5 pr-8 text-[10px] font-bold uppercase tracking-tight text-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all cursor-pointer rounded-md"
          >
            <option value="">Price Range</option>
            <option value="0-500">$0 - $500</option>
            <option value="500-2000">$500 - $2k</option>
            <option value="2000-5000">$2k - $5k</option>
            <option value="5000+">$5k+</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <ChevronDown size={12} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};