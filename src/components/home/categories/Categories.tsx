import React from 'react';
import { MoveRight } from 'lucide-react';
import { categories } from '@/constant/categoriesItems';
import { CategoryCard } from './Card/CategoryCard';

const Categories = () => {
    return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="mb-10 flex items-end justify-between border-b border-ui-border pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-8 bg-brand-accent"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent">
              Premium Collections
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-brand-primary uppercase">
            Browse <span className="italic font-medium">Categories</span>
          </h2>
        </div>

        {/* Action Button */}
        <button className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground transition-all hover:text-brand-primary">
          View All Collections
          <div className="flex h-10 w-10 items-center justify-center rounded-none border border-ui-border transition-all group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary">
            <MoveRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categories?.slice(0,6).map((c) => (
          <CategoryCard key={c.id} category={c} />
        ))}
      </div>
    </div>
    );
};

export default Categories;