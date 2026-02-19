"use client";

import React from "react";
import Image from "next/image";
import { BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPostProps {
  blogPost: {
    productId: string;
    title: string;
    authorName: string;
    bannerImage: string;
    content: string;
    images: Array<{ url: string; altText: string; order: number }>;
  } | null;
}

export const ProductBlogCard = ({ blogPost }: BlogPostProps) => {
  if (!blogPost) return null;

  // Create an excerpt from the content string for the UI
  const excerpt = blogPost.content.replace(/<[^>]*>/g, '').substring(0, 160) + "...";

  return (
    <div className="bg-white rounded shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md">
      <div className="border-b border-gray-100 px-6 py-4 bg-brand-primary text-white flex items-center gap-2">
        <BookOpen size={18} strokeWidth={2.5} />
        <h2 className="text-sm md:text-base font-bold tracking-tight uppercase">
          Expert Insight
        </h2>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-4 rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <Image 
              width={400} 
              height={400} 
              src={blogPost.bannerImage} 
              alt={blogPost.title} 
              className="w-full aspect-video md:aspect-square object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="md:col-span-8 flex flex-col">
            <h3 className="text-xl md:text-2xl font-black text-brand-primary mb-3 leading-tight">
              {blogPost.title}
            </h3>

            <div className="flex items-center gap-3 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-5">
              <span className="text-brand-primary/70">By {blogPost.authorName}</span>
              <span className="h-1 w-1 bg-gray-300 rounded-full" />
              <span>LATEST UPDATE</span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6 italic border-l-2 border-brand-accent pl-4 py-1 bg-gray-50/50 rounded-r">
              {excerpt}
            </p>

            <div 
              className="prose prose-sm max-w-none text-gray-700 mb-6 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />

            <div className="mt-auto">
              <Button 
                variant="link" 
                className="p-0 h-auto text-brand-accent font-black uppercase text-[10px] tracking-[0.2em] hover:no-underline hover:opacity-80 flex items-center group"
              >
                Read Full Article 
                <ChevronRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};