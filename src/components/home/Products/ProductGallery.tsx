"use client";
import React, { useState } from 'react';

export const ProductGallery = ({ images }: { images: { url: string; isMain: boolean }[] }) => {
  const [active, setActive] = useState(images.find(img => img.isMain)?.url || images[0].url);

  return (
    <div className="space-y-4">
      <div className="reveal-frame aspect-[4/5] bg-ui-soft">
        <img src={active} alt="Product" className="h-full w-full object-cover" />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((img, idx) => (
          <button 
            key={idx} 
            onClick={() => setActive(img.url)}
            className={`h-24 w-24 flex-shrink-0 border p-1 transition-all ${active === img.url ? 'border-brand-accent' : 'border-gray-100'}`}
          >
            <img src={img.url} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};