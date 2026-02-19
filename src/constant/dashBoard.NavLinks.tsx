"use client";

import { useAuthCheck } from "@/hook/useAuthCheck";
import { 
  Package, MapPin, Lock, CreditCard, Archive, 
  Heart, MessageSquare, LayoutDashboard, 
  Users, ShoppingBag, BarChart3, Truck
} from "lucide-react";

const navConfig = {
  USER: [
    { icon: LayoutDashboard, label: "Profile", href: "/dashboard" },
    { icon: Package, label: "My orders", href: "/dashboard/orders" },
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

export function useNavLinks() {
  const { user } = useAuthCheck();
  const role = user?.role || "CUSTOMER";

  const getNavLinks = () => {
    if (!user) return []; 
    
    switch (role) {
      case "CUSTOMER": return navConfig.USER;
      case "STAFF": return navConfig.STAFF;
      case "ADMIN": return navConfig.ADMIN;
      default: return navConfig.USER;
    }
  };

  return { navLinks: getNavLinks(), user };
}