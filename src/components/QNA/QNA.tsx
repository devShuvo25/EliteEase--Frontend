"use client";

import { HelpCircle, Send, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Question } from "../../types/question";
import React, { useRef, useState } from "react";
import { useAuthCheck } from "@/hook/useAuthCheck";

interface IQna {
  onCreate: (text: string) => void;
  onUpdate?: (id: string, text: string) => void;
  onDelete?: (id: string) => void;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  question: string;
  questions: Question[];
}

export const ProductQA = ({ 
  questions, 
  onCreate, 
  onUpdate, 
  onDelete, 
  question, 
  setQuestion 
}: IQna) => {
  const { user } = useAuthCheck();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEditInitiation = (item: Question) => {
    setEditingId(item?.id);
    setQuestion(item?.content);
    if (textareaRef.current) {
      textareaRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      textareaRef.current.focus();
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setQuestion("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    if (editingId) {
      // SUCCESS: Passing ID as first arg, Content as second
      onUpdate?.(question,editingId);
    } else {
      onCreate(question);
    }

    setQuestion("");
    setEditingId(null);
  };

  return (
    <div className="bg-white rounded shadow-sm mt-8 overflow-hidden border border-gray-100">
      <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2 bg-gray-50/50">
        <HelpCircle size={18} className="text-brand-primary" />
        <h2 className="text-base font-bold text-brand-primary uppercase tracking-tight">
          Questions & Answers
        </h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="mb-10 pb-10 border-b border-dashed border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              {editingId ? "Edit your question" : "Have a technical question? Ask our experts"}
            </label>
            {editingId && (
              <button 
                type="button" 
                onClick={cancelEdit}
                className="text-[10px] text-rose-500 font-bold uppercase flex items-center gap-1 hover:underline"
              >
                <X size={12} /> Cancel Edit
              </button>
            )}
          </div>
          
          <div className="flex flex-col gap-3">
<Textarea 
  ref={textareaRef}
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  placeholder="Type your question here..."
  className={`
    min-h-24 w-full p-4 text-sm transition-all duration-300 resize-none
    bg-white rounded-xl outline-none shadow-sm
    placeholder:text-gray-300
    
    /* Default Border: Thin 1px */
    border-[1px] border-gray-100 hover:border-gray-200
    
    /* Focus State: Maintain 1px thickness but change color */
    focus:border-brand-primary 
    focus:ring-[3px] focus:ring-brand-primary/5
    
    /* Editing State */
    ${editingId 
      ? 'border-brand-accent ring-[3px] ring-brand-accent/5' 
      : ''
    }
  `}
  required
/>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!question.trim()}
                className={`${editingId ? 'bg-brand-accent' : 'bg-brand-primary'} hover:opacity-90 text-white text-[11px] font-bold uppercase tracking-widest px-8 h-11 transition-colors`}
              >
                {editingId ? <><Pencil size={14} className="mr-2" /> Update Question</> : <><Send size={14} className="mr-2" /> Ask Question</>}
              </Button>
            </div>
          </div>
        </form>

        <div className="space-y-8">
          {questions?.length > 0 ? (
            questions.map((item) => {
              const isOwner = user?.id === item.userId;
              const isBeingEdited = editingId === item.id;

              return (
                <div key={item.id} className={`relative group transition-opacity ${isBeingEdited ? 'opacity-50' : ''}`}>
                  <div className="flex gap-4 mb-4">
                    <div className="h-8 w-8 rounded bg-brand-primary/5 flex items-center justify-center shrink-0">
                      <span className="text-brand-primary font-bold text-xs">Q</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="text-sm font-bold text-gray-800 leading-tight mb-1">
                          {item?.content}
                        </h4>

                        {isOwner && !isBeingEdited && (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleEditInitiation(item)}
                              className="p-1.5 text-gray-400 hover:text-brand-primary hover:bg-gray-100 rounded-md transition-colors"
                              title="Edit"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => onDelete?.(item.id)}
                              className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium italic">
                        Asked by {isOwner ? "You" : item?.userId} on {item?.createdAt}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-sm text-gray-400 py-10">No questions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};