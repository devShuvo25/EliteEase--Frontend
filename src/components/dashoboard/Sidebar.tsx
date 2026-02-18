"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Package, MapPin, Lock, CreditCard, Archive, 
  Heart, MessageSquare, LogOut, LayoutDashboard, 
  Users, ShoppingBag, BarChart3, Truck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthCheck } from "@/hook/useAuthCheck";

const navConfig = {
  USER: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Package, label: "My orders", href: "/dashboard/orders" },
    { icon: MapPin, label: "Your addresses", href: "/dashboard/address" },
    { icon: Heart, label: "Saved items", href: "/dashboard/saved" },
    { icon: CreditCard, label: "Payments", href: "/dashboard/payments" },
    { icon: Lock, label: "Login & security", href: "/dashboard/security" },
  ],
  STAFF: [
    { icon: LayoutDashboard, label: "Staff Portal", href: "/staff/dashboard" },
    { icon: ShoppingBag, label: "Inventory", href: "/staff/inventory" },
    { icon: Truck, label: "Order Dispatch", href: "/staff/orders" },
    { icon: MessageSquare, label: "Support Tickets", href: "/staff/support" },
    { icon: Users, label: "Customer Lookups", href: "/staff/customers" },
    { icon: Lock, label: "Security", href: "/staff/security" },
  ],
  ADMIN: [
    { icon: BarChart3, label: "Overview", href: "/admin/overview" },
    { icon: ShoppingBag, label: "Manage Products", href: "/admin/products" },
    { icon: Users, label: "Customer List", href: "/admin/customers" },
    { icon: Archive, label: "All Orders", href: "/admin/all-orders" },
    { icon: Lock, label: "Site Settings", href: "/admin/settings" },
  ],
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuthCheck();
  const role = user?.role || "CUSTOMER"
//   const role = "STAFF"

  // Determine which links to show based on user role
  const getNavLinks = () => {
    if (!user) return []; // Or return navConfig.USER as a default guest view
    
    switch (role) {
      case "CUSTOMER":
        return navConfig.USER;
      case "STAFF":
        return navConfig.STAFF;
      case "ADMIN":
        return navConfig.ADMIN;
      default:
        return navConfig.USER;
    }
  };

  const navLinks = getNavLinks();

  return (
    <div className="w-full md:w-64 flex flex-col gap-1">
      {/* Role Indicator for Staff/Admin */}
      {user && user.role !== "CUSTOMER" && (
        <div className="px-4 py-2 mb-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 w-fit px-2 py-0.5 rounded">
            {user.role} Access
          </p>
        </div>
      )}

      {navLinks.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group",
              isActive 
                ? "bg-[#E8F0FE] text-[#1A73E8]" 
                : "text-[#37393F] hover:bg-gray-50"
            )}
          >
            <div className={cn(
              "p-1 rounded-md border transition-colors",
              isActive ? "border-[#1A73E8] bg-white text-[#1A73E8]" : "border-gray-200 text-[#37393F]"
            )}>
              <item.icon size={16} />
            </div>
            {item.label}
          </Link>
        );
      })}
      
      <div className="my-6 border-t border-gray-100" />
      
      <Link 
        href="/support"
        className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-[#37393F] hover:bg-gray-50 rounded-lg group"
      >
        <div className="p-1 rounded-md border border-gray-200 group-hover:border-gray-300">
            <MessageSquare size={16} />
        </div>
        Customer support
      </Link>
      
      <button 
        onClick={() => {/* Add your logout logic */}}
        className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-[#37393F] hover:bg-gray-50 rounded-lg group text-left w-full"
      >
        <div className="p-1 rounded-md border border-gray-200 group-hover:border-red-200 group-hover:text-red-500">
            <LogOut size={16} />
        </div>
        Log out
      </button>
    </div>
  );
}