// src/hooks/useAuthGuard.ts
import { useGetMeQuery } from "@/redux/api/authApi";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

export const useAuthCheck = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // We use the 'getMe' query to check the actual session
  const { data: userData, isError } = useGetMeQuery(undefined);
  const user = userData?.data;

  const checkAccess = (allowedRoles?: string[]) => {
    // 1. Check if logged in
    if (!user || isError) {
      toast.error("Authentication required", {
        description: "Please login to continue.",
      });
      // Important: Encode the pathname to handle query strings correctly
      router.push(`/login?callback=${encodeURIComponent(pathname)}`);
      return false;
    }

    // 2. Check Role permissions
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      toast.error("Access Denied", {
        description: `Your role (${user.role}) is not authorized for this action.`,
      });
      return false;
    }

    return true;
  };

  return { checkAccess, user };
};