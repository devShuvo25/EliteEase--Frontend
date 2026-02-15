"use client";

import { 
  User, 
  Settings, 
  LogOut, 
  ShoppingBag, 
  Languages, 
  LogIn,
  ChevronRight,
  CreditCard,
  UserPlus
} from "lucide-react";
import { useRouter } from "next/navigation";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuthCheck } from "@/hook/useAuthCheck";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { toast } from "sonner";
import { baseApi } from "@/redux/api/baseApi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function UserNav() {
  const router = useRouter();
  const { user } = useAuthCheck();
  const dispatch = useDispatch();

  const handleLogout = () => {
    const toastId = toast.loading("Ending session...");
    dispatch(logout()); 
    dispatch(baseApi.util.resetApiState()); 
    toast.success("Successfully loged out", { id: toastId });
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10  rounded-full border-2 border-transparent hover:border-slate-200 transition-all active:scale-95 p-0">
          <Avatar className="h-9 w-9 border border-slate-100">
            <AvatarImage src={user?.image} alt={user?.name || "User"} />
            <AvatarFallback className="bg-brand-primary/10 text-brand-primary font-bold">
              {user?.name?.slice(0, 2).toUpperCase() || <User size={18} />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 bg-white  p-2 shadow-xl border-slate-100" align="end" sideOffset={8}>
        {user ? (
          <>
            {/* Header Section */}
            <DropdownMenuLabel className="font-normal px-2 py-3">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold text-slate-900 leading-none">
                  {user.name || "Account"}
                </p>
                <p className="text-xs font-medium text-slate-500 truncate">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator className="bg-slate-50" />
            
            {/* Main Actions */}
            <DropdownMenuGroup className="py-1">
              <NavMenuItem 
                icon={<User size={16} />} 
                label="My Profile" 
                onClick={() => router.push("/profile")} 
              />
              <NavMenuItem 
                icon={<ShoppingBag size={16} />} 
                label="Orders & Returns" 
                onClick={() => router.push("/dashboard/orders")} 
              />
              <NavMenuItem 
                icon={<CreditCard size={16} />} 
                label="Billing" 
                onClick={() => router.push("/billing")} 
              />
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-slate-50" />

            {/* App Settings */}
            <DropdownMenuGroup className="py-1">
              <NavMenuItem icon={<Languages size={16} />} label="Language: EN" />
              <NavMenuItem icon={<Settings size={16} />} label="Settings" />
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-slate-50" />

            {/* Logout */}
            <DropdownMenuItem 
              onClick={handleLogout} 
              className="mt-1 rounded-md text-rose-600 focus:bg-rose-50 focus:text-rose-700 cursor-pointer font-medium"
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <div className="px-2 py-3">
              <p className="text-sm font-bold text-slate-800">Welcome Guest</p>
              <p className="text-[11px] text-slate-500">Sign in to manage your orders</p>
            </div>
            <DropdownMenuSeparator />
            <div className="p-1 space-y-1">
              <Button 
                onClick={() => router.push("/login")}
                className="text-white w-full justify-start h-9 text-xs font-bold bg-brand-primary hover:bg-brand-primary/90"
              >
                <LogIn className="mr-2 h-4 w-4 text-white" /> Login
              </Button>
              <Button 
                variant="outline"
                onClick={() => router.push("/register")}
                className="w-full justify-start h-9 text-xs font-bold border-slate-200"
              >
                <UserPlus className="mr-2 h-4 w-4" /> Register
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Senior Move: Extracting repetitive items to a sub-component for cleaner code
function NavMenuItem({ icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) {
  return (
    <DropdownMenuItem 
      onClick={onClick}
      className="flex items-center justify-between group px-2 py-2.5 cursor-pointer rounded-md transition-colors focus:bg-slate-50"
    >
      <div className="flex items-center">
        <span className="mr-3 text-slate-400 group-hover:text-brand-primary transition-colors">
          {icon}
        </span>
        <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
          {label}
        </span>
      </div>
      <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-500 transition-all group-hover:translate-x-0.5" />
    </DropdownMenuItem>
  );
}