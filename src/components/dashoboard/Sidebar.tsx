"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useAuthCheck } from "@/hook/useAuthCheck";
import { useNavLinks } from "@/constant/dashBoard.NavLinks";
import { LogOut, MessageSquare } from "lucide-react";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/features/authSlice";

export function DashboardSidebar() {
  const { navLinks } = useNavLinks();
  const { user } = useAuthCheck();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  // logout
  function handleLogout() {
    if (user) {
      Cookies.remove("token");
      dispatch(setCredentials({ token: null }));
      router.push("/");
    }
  }

  //   const role = "STAFF"

  // Determine which links to show based on user role

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

      {navLinks?.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group cursor-pointer",
              isActive
                ? "bg-[#E8F0FE] text-[#1A73E8]"
                : "text-[#37393F] hover:bg-gray-50",
            )}
          >
            <div
              className={cn(
                "p-1 rounded-md border transition-colors",
                isActive
                  ? "border-[#1A73E8] bg-white text-[#1A73E8]"
                  : "border-gray-200 text-[#37393F]",
              )}
            >
              <item.icon size={16} />
            </div>
            {item.label}
          </Link>
        );
      })}

      <div className="my-6 border-t border-gray-100" />

      <Link
        href="/support"
        className="cursor-pointer flex items-center gap-3 px-4 py-2 text-sm font-medium text-[#37393F] hover:bg-gray-50 rounded-lg group"
      >
        <div className="p-1 rounded-md border border-gray-200 group-hover:border-gray-300">
          <MessageSquare size={16} />
        </div>
        Customer support
      </Link>

      <button
        onClick={handleLogout}
        className="cursor-pointer flex items-center gap-3 px-4 py-2 text-sm font-medium text-[#37393F] hover:bg-gray-50 rounded-lg group text-left w-full"
      >
        <div className="p-1 rounded-md border border-gray-200 group-hover:border-red-200 group-hover:text-red-500">
          <LogOut size={16} />
        </div>
        Log out
      </button>
    </div>
  );
}
