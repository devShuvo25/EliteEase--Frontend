"use client";

import React, { useState } from "react";
import { HelpCircle, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Question } from "../../types/question";

interface IQna {
  questions: Question[];
}

export const ProductQA = ({ questions }: IQna) => {
  const [question, setQuestion] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuestion("");
  };

  return (
    <div className="bg-white rounded shadow-sm mt-8 overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2 bg-gray-50/50">
        <HelpCircle size={18} className="text-brand-primary" />
        <h2 className="text-base font-bold text-brand-primary uppercase tracking-tight">
          Questions & Answers
        </h2>
      </div>

      <div className="p-6">
        {/* Question Submission Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-10 pb-10 border-b border-dashed border-gray-200"
        >
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-3">
            Have a technical question? Ask our experts
          </label>
          <div className="flex flex-col gap-3">
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="min-h-24 w-full bg-white border-gray-100 rounded-xl text-sm p-4 
                 placeholder:text-gray-300 shadow-sm transition-all duration-200
                 focus:border-brand-accent focus:ring-0 focus-visible:ring-0 
                 resize-none border-[1.5px]"
              required
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-brand-primary hover:bg-brand-primary/90 text-white text-[11px] font-bold uppercase tracking-widest px-8 h-11"
              >
                <Send size={14} className="mr-2" /> Ask Question
              </Button>
            </div>
          </div>
        </form>

        {/* Q&A List */}
        <div className="space-y-8">
          {questions?.map((item) => (
            <div key={item.id} className="group">
              {/* Question Row */}
              <div className="flex gap-4 mb-4">
                <div className="h-8 w-8 rounded bg-brand-primary/5 flex items-center justify-center shrink-0">
                  <span className="text-brand-primary font-bold text-xs">
                    Q
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 leading-tight mb-1">
                    {item?.content}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-medium italic">
                    Asked by {item?.userId} on {item?.createdAt}
                  </p>
                </div>
              </div>

              {/* Answer Row (Ryans Style - Indigo/Blue tint for staff) */}
              <div className="flex gap-4 ml-6 pl-6 border-l-2 border-brand-accent/20">
                <div className="h-8 w-8 rounded bg-brand-accent/10 flex items-center justify-center shrink-0">
                  <MessageCircle size={14} className="text-brand-accent" />
                </div>
                {item?.answers?.map((ans) => (
                  <div
                    key={ans?.id}
                    className="bg-gray-50/80 p-4 rounded-r-xl rounded-bl-xl w-full border-l-2 border-brand-accent/30 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Staff Indicator */}
                        <span className="bg-brand-primary text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                          Staff Response
                        </span>

                        {/* Separator */}
                        <span className="hidden sm:block h-1 w-1 rounded-full bg-gray-300" />

                        {/* Time & Date Option */}
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                          <span>
                            {ans?.createdAt
                              ? new Date(ans.createdAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )
                              : "Recently"}
                          </span>
                          <span className="text-gray-300">|</span>
                          <span className="text-brand-accent">
                            {ans?.createdAt
                              ? new Date(ans?.createdAt).toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  },
                                )
                              : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed font-medium">
                      {ans?.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
