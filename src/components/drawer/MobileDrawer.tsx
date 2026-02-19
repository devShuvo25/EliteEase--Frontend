"use client";
import Link from "next/link";
import { LogIn, LogOut, Menu, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose, // 1. Import DrawerClose
} from "@/components/ui/drawer";
import { useNavLinks } from "@/constant/dashBoard.NavLinks";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { setCredentials } from "@/redux/features/authSlice";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useAuthCheck } from "@/hook/useAuthCheck";

export function MobileNavDrawer() {
  const { navLinks } = useNavLinks();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAuthCheck();

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(setCredentials({ token: null }));
    router.push("/");
  };

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-7 w-7" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-white h-full w-[280px] mt-10 rounded-none border-r">
        <div className="flex flex-col h-full py-6">
          <div className="flex-1 flex flex-col gap-2 p-4">
            {user && navLinks?.map((item) => {
              const isActive = pathname === item.href;

              return (
                /* 2. Wrap Links in DrawerClose to auto-hide on click */
                <DrawerClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group",
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
                </DrawerClose>
              );
            })}
          </div>

          <div className="p-4 border-t flex flex-col gap-2">
            <DrawerClose asChild>
              <Link
                href="/support"
                className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-[#37393F] hover:bg-gray-50 rounded-lg group"
              >
                <div className="p-1 rounded-md border border-gray-200 group-hover:border-gray-300">
                  <MessageSquare size={16} />
                </div>
                Customer support
              </Link>
            </DrawerClose>

            {user ? (
              <DrawerClose asChild>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-[#37393F] hover:bg-gray-50 rounded-lg group text-left w-full"
                >
                  <div className="p-1 rounded-md border border-gray-200 group-hover:border-red-200 group-hover:text-red-500">
                    <LogOut size={16} />
                  </div>
                  Log out
                </button>
              </DrawerClose>
            ) : (
              <DrawerClose asChild>
                <button
                  onClick={() => router.push("/login")}
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-[#37393F] hover:bg-gray-50 rounded-lg group text-left w-full"
                >
                  <div className="p-1 rounded-md border border-gray-200 group-hover:border-red-200 group-hover:text-red-500">
                    <LogIn size={16} />
                  </div>
                  Log in
                </button>
              </DrawerClose>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}