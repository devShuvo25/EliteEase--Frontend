/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useAuthCheck } from "@/hook/useAuthCheck";
import { User } from "lucide-react";

export function UserNav() {
const {user} = useAuthCheck()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        
        <Link href={'/dashboard'} className="relative h-10 w-10  rounded-full border-2 border-transparent hover:border-slate-200 transition-all active:scale-95 p-0">
          <Avatar className="h-9 w-9 border border-slate-100">
            <AvatarImage src={user?.image} alt={user?.name || "User"} />
            <AvatarFallback className="bg-brand-primary/10 text-brand-primary font-bold">
              {user?.name?.slice(0, 2).toUpperCase() || <User size={18} />}
            </AvatarFallback>
          </Avatar>
        </Link>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}

// Senior Move: Extracting repetitive items to a sub-component for cleaner cod