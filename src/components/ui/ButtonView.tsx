import React from 'react';
import { MoveRight } from 'lucide-react';

interface LuxuryLinkProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export const ButtonView = ({ 
  label = "View All Collection", 
  onClick, 
  className = "" 
}: LuxuryLinkProps) => {
  return (
    <button
      onClick={onClick}
      className={`group cursor-pointer flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-brand-primary transition-all hover:text-brand-accent ${className}`}
    >
      <span>{label}</span>
      
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 transition-all duration-300 group-hover:border-brand-accent group-hover:translate-x-1">
        <MoveRight size={14} className="transition-colors group-hover:text-brand-accent" />
      </div>
    </button>
  );
};

