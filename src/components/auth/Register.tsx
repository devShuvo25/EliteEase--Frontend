/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { Laptop, Loader2 } from "lucide-react";
import { useRegisterMutation } from "@/redux/api/authApi";
import { Button } from "@/components/ui/button";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterMutation();
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema) as any,
  });

  const onSubmit = async (values: RegisterFormData) => {
    try {
      const {  ...payload } = values;
      const res = await registerUser(payload).unwrap();
      if (res?.success) {
        toast.success("Account created successfully!");
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#f4f7f5] font-sans">
      {/* Left Side: Branding & Testimonial */}
      <div className="hidden lg:flex flex-col justify-between bg-[#111111] p-16 text-white relative overflow-hidden">
        <div className="z-10 flex items-center gap-2 text-orange-500">
          <div className="bg-orange-500 text-white p-2 rounded-xl shadow-lg shadow-orange-500/20">
            <Laptop size={24} strokeWidth={3} />
          </div>
          <span className="font-black tracking-tighter text-2xl uppercase italic">RYANS CLONE</span>
        </div>

        <div className="z-10 max-w-md">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Manage your Tech <br /> 
            <span className="text-gray-500 font-medium tracking-tight">Anywhere.</span>
          </h1>
          <p className="text-gray-400 text-lg mb-12 font-medium">
            Join the community and experience the next generation of tech analytics.
          </p>

          <div className="bg-[#1c1c1c] p-8 rounded-0.5 border border-white/5 shadow-2xl relative">
            <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
              This platform is a game-changer! It&apos;s easy to use, provides valuable insights, and has helped me make smarter tech business decisions.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-tr from-orange-600 to-yellow-400 border-2 border-[#2c2c2c]" />
              <div>
                <p className="text-sm font-bold">Casey Bachmeyer</p>
                <p className="text-xs text-gray-500">Founder, Sisyphus Ventures</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 z-10">
          {[1,2,3,4].map(i => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === 1 ? 'w-10 bg-orange-500' : 'w-1.5 bg-gray-800'}`} />
          ))}
        </div>

        <div className="absolute top-1/2 -left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Right Side: Register Form */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-130 bg-white rounded-[3rem] p-8 lg:p-12 shadow-xl shadow-slate-200/50 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8 tracking-tight">Create account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <input {...register("firstName")} placeholder="First Name" className={`h-13 bg-gray-50 border-none rounded-2xl px-5 text-sm w-full focus:ring-2 focus:ring-orange-500/20 transition-all outline-none ${errors.firstName ? 'ring-2 ring-red-100' : ''}`} />
                {errors.firstName && <p className="text-[10px] text-red-500 ml-2 font-bold">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-1">
                <input {...register("lastName")} placeholder="Last Name" className={`h-13 bg-gray-50 border-none rounded-2xl px-5 text-sm w-full focus:ring-2 focus:ring-orange-500/20 transition-all outline-none ${errors.lastName ? 'ring-2 ring-red-100' : ''}`} />
                {errors.lastName && <p className="text-[10px] text-red-500 ml-2 font-bold">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <input {...register("email")} placeholder="Business E-mail" className={`h-13 bg-gray-50 border-none rounded-2xl px-5 text-sm w-full focus:ring-2 focus:ring-orange-500/20 transition-all outline-none ${errors.email ? 'ring-2 ring-red-100' : ''}`} />
              {errors.email && <p className="text-[10px] text-red-500 ml-2 font-bold">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <input {...register("password")} type="password" placeholder="Password" className={`h-13 bg-gray-50 border-none rounded-2xl px-5 text-sm w-full focus:ring-2 focus:ring-orange-500/20 transition-all outline-none ${errors.password ? 'ring-2 ring-red-100' : ''}`} />
                {errors.password && <p className="text-[10px] text-red-500 ml-2 font-bold">{errors.password.message}</p>}
              </div>
              <div className="space-y-1">
                <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" className={`h-13 bg-gray-50 border-none rounded-2xl px-5 text-sm w-full focus:ring-2 focus:ring-orange-500/20 transition-all outline-none ${errors.confirmPassword ? 'ring-2 ring-red-100' : ''}`} />
                {errors.confirmPassword && <p className="text-[10px] text-red-500 ml-2 font-bold">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <div className="flex items-start gap-3 py-2 px-1">
                <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer" />
                <label className="text-xs text-gray-500 font-medium">
                  I agree to the <Link href="#" className="text-gray-900 font-bold hover:underline">Terms of Service</Link> and <Link href="#" className="text-gray-900 font-bold hover:underline">Privacy Policy</Link>
                </label>
            </div>

            <Button 
              disabled={isLoading} 
              className="w-full h-14 bg-[#ff5200] hover:bg-[#e64a00] text-white rounded-[1.25rem] font-bold text-base transition-all shadow-xl shadow-orange-500/25 active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
            >
               {isLoading ? (
                 <Loader2 className="animate-spin h-5 w-5" />
               ) : (
                 "Get Started"
               )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Already a member? <Link href="/login" className="text-orange-500 font-bold hover:underline ml-1">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;