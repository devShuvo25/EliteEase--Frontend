"use client";

import React from "react";
import { MapPin, Pencil, Trash2, Home, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Address {
  id: string;
  type: "HOME" | "OFFICE" | "OTHER";
  isDefault: boolean;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export function AddressCard({ address }: { address: Address}) {
  return (
    <Card className="border-gray-200 shadow-none rounded-xl overflow-hidden hover:border-blue-200 transition-all group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg border border-gray-100 text-gray-400 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
              {address.type === "HOME" ? <Home size={18} /> : address.type === "OFFICE" ? <Briefcase size={18} /> : <MapPin size={18} />}
            </div>
            <div>
              <h4 className="font-bold text-[#37393F] text-sm uppercase tracking-tight">{address.name}</h4>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{address.type}</p>
            </div>
          </div>
          {address.isDefault && (
            <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-100 text-[9px] font-black uppercase tracking-tighter">
              Default
            </Badge>
          )}
        </div>

        <div className="space-y-1 mb-6">
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            {address.street}<br />
            {address.city}, {address.state} {address.zip}<br />
            <span className="text-gray-400 text-xs mt-2 block font-bold italic">Phone: {address.phone}</span>
          </p>
        </div>

        <div className="flex gap-2 border-t border-gray-50 pt-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-[10px] font-black uppercase tracking-widest text-[#37393F] hover:bg-gray-50 flex-1 gap-2"
          >
            <Pencil size={12} /> Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 hover:text-red-600 flex-1 gap-2"
          >
            <Trash2 size={12} /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}