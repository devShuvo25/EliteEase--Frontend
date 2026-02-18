/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  ExternalLink 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sample Data Structure
const orders = [
  {
    id: "73262",
    date: "Nov 10, 2025",
    status: "ON_THE_WAY",
    total: 340.00,
    itemsCount: 4,
    deliveryDate: "Fri, 13 Nov",
    items: [
      { name: "Minimalist Ceramic Cup", image: "/cup.png" },
      { name: "Table lamp for office", image: "/lamp.png" }
    ]
  },
  {
    id: "73150",
    date: "Oct 28, 2025",
    status: "DELIVERED",
    total: 125.50,
    itemsCount: 1,
    deliveryDate: "Oct 31, 2025",
    items: [
      { name: "Traditional Clay Pot", image: "/pot.png" }
    ]
  }
];

const statusConfig = {
  ON_THE_WAY: { label: "On the way", color: "text-amber-600 bg-amber-50 border-amber-100", icon: Truck },
  DELIVERED: { label: "Delivered", color: "text-emerald-600 bg-emerald-50 border-emerald-100", icon: CheckCircle2 },
  PENDING: { label: "Processing", color: "text-blue-600 bg-blue-50 border-blue-100", icon: Clock },
};

export function MyOrders() {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-[#37393F]">Order History</h2>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
          Showing {orders.length} orders
        </span>
      </div>

      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

function OrderCard({ order }: { order: any }) {
  const status = statusConfig[order.status as keyof typeof statusConfig];

  return (
    <Card className="border-gray-200 shadow-none hover:border-[#1A73E8]/30 transition-all rounded-xl overflow-hidden group">
      <CardContent className="p-0">
        {/* Top Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-gray-50/50 border-b border-gray-100">
          <div className="flex gap-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Order ID</p>
              <p className="text-sm font-bold text-[#37393F]">#{order.id}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Date Placed</p>
              <p className="text-sm font-bold text-[#37393F]">{order.date}</p>
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Amount</p>
              <p className="text-sm font-black text-[#37393F]">USD {order.total.toFixed(2)}</p>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest gap-2 rounded-lg">
            Details <ExternalLink size={12} />
          </Button>
        </div>

        {/* Main Content Body */}
        <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Status Badge */}
            <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold", status.color)}>
              <status.icon size={14} />
              {status.label}
            </div>
            <p className="text-sm text-gray-500 font-medium italic">
              Expected: <span className="text-[#37393F] font-bold not-italic">{order.deliveryDate}</span>
            </p>
          </div>

          {/* Mini Item Preview */}
          <div className="flex -space-x-3 overflow-hidden">
            {order.items.map((item: any, i: number) => (
              <div 
                key={i} 
                className="flex h-10 w-10 rounded-full ring-2 ring-white bg-gray-100 border border-gray-200  items-center justify-center overflow-hidden"
              >
                 <span className="text-[8px] font-bold text-gray-400 uppercase">Item</span>
              </div>
            ))}
            {order.itemsCount > 2 && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 ring-2 ring-white text-[10px] font-bold text-gray-500 border border-gray-200">
                +{order.itemsCount - 2}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}