/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/authSlice";
import { useMyProfileQuery } from "@/redux/api/userApi";
import { Loader2, Laptop } from "lucide-react";
import MyFormInput from "../form/MyFormInput";
import MyFormWrapper from "../form/MyFormWrapper";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required").min(6, "Must be 6+ chars"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useMyProfileQuery(undefined, { skip: true });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await login(data).unwrap();
      if (response?.success) {
        console.log("succes");
        const token = response?.data?.accessToken;
        Cookies.set("token", token, { expires: 7 });
        dispatch(setUser({ token }));
        toast.success(`Welcome back!`);
        router.push("/")

      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#f4f7f5]">
      {/* Left Side: Dark Branding & Testimonial */}
      <div className="hidden lg:flex flex-col justify-between bg-[#111111] p-12 text-white relative overflow-hidden">
        <div className="z-10 flex items-center gap-2 text-orange-500">
          <div className="bg-orange-500 text-white p-1.5 rounded-lg">
            <Laptop size={20} strokeWidth={3} />
          </div>
          <span className="font-bold tracking-tighter text-xl">RYANS</span>
        </div>

        <div className="z-10 max-w-md">
          <h1 className="text-4xl font-semibold leading-tight mb-4">
            Manage your Tech <br /> 
            <span className="text-gray-400 font-normal">from anywhere.</span>
          </h1>
          <p className="text-gray-400 text-sm mb-12">
            Access your orders, track warranties, and explore the latest hardware analytics in one dashboard.
          </p>

          <div className="bg-[#1c1c1c] p-6 rounded-2xl border border-white/5 shadow-2xl">
            <p className="text-gray-300 text-sm leading-relaxed italic mb-4">
              This platform is a game-changer! It&apos;s easy to use, provides valuable insights, and has helped me make smarter business decisions.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-orange-500 to-yellow-400" />
              <div>
                <p className="text-xs font-bold">Casey Bachmeyer</p>
                <p className="text-[10px] text-gray-500">Founder, Sisyphus Ventures</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-1 z-10">
          {[1,2,3,4].map(i => <div key={i} className={`h-1 rounded-full ${i===1 ? 'w-4 bg-orange-500' : 'w-1 bg-gray-700'}`} />)}
        </div>
      </div>

      {/* Right Side: Form Card */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-110 bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-gray-100">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">Sign in</h2>

          <MyFormWrapper onSubmit={onSubmit} resolver={zodResolver(loginSchema)} className="space-y-5">
            <MyFormInput
              name="email"
              type="email"
              placeholder="Business E-mail"
              inputClassName="h-12 bg-gray-50 border-none rounded-xl px-4 text-sm focus:ring-2 focus:ring-orange-500/20"
            />
            <MyFormInput
              name="password"
              type="password"
              placeholder="Password"
              inputClassName="h-12 bg-gray-50 border-none rounded-xl px-4 text-sm focus:ring-2 focus:ring-orange-500/20"
            />

            <div className="flex justify-end">
              <Link href="#" className="text-xs font-medium text-gray-400 hover:text-orange-500">Forgot password?</Link>
            </div>

            <Button disabled={isLoading} className="w-full h-12 bg-[#ff5200] hover:bg-[#e64a00] text-white rounded-xl font-medium transition-all shadow-lg shadow-orange-500/20 mt-4">
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign in to Account"}
            </Button>
          </MyFormWrapper>

          <p className="mt-8 text-center text-sm text-gray-500 font-medium">
            Don&apos;t have an account? <Link href="/register" className="text-orange-500 hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}