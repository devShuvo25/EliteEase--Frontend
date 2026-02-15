import { Loader2 } from "lucide-react";

/**
 * A centered, full-screen loading spinner
 * used for initial product data fetching.
 */
export const LoadingSpinner = () => {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center gap-4 animate-in fade-in duration-500">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <div className="absolute h-16 w-16 rounded-full border-4 border-brand-primary/10 animate-pulse" />
        
        {/* Main Spinning Loader */}
        <Loader2 
          className="text-brand-primary animate-spin" 
          size={42} 
          strokeWidth={1.5} 
        />
      </div>
      
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-800">
          Loading
        </p>
        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
          Fetching product details...
        </p>
      </div>
    </div>
  );
};