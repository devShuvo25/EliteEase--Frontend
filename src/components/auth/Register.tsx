/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Laptop, Loader2, Search, ChevronDown } from "lucide-react";
import { Country } from 'country-state-city';
import { useRegisterMutation } from "@/redux/api/authApi";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is too short"),
  countryCode: z.string().default("BD"),
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
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const allCountries = useMemo(() => Country.getAllCountries(), []);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema) as any,
    defaultValues: {
      countryCode: "BD",
      phone: ""
    }
  });

  const selectedCountryCode = watch("countryCode").toUpperCase(); // Ensure uppercase
  const selectedCountryData = useMemo(() => 
    Country.getCountryByCode(selectedCountryCode), 
  [selectedCountryCode]);

  const phoneCode = selectedCountryData?.phonecode.startsWith('+') 
    ? selectedCountryData?.phonecode 
    : `+${selectedCountryData?.phonecode}`;

  const filteredCountries = allCountries.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phonecode.includes(searchTerm) ||
    c.isoCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const onSubmit = async (values: RegisterFormData) => {
    try {
      const fullPhone = `${phoneCode}${values.phone}`;
      const payload = { ...values, phoneNumber: fullPhone };
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
      {/* Left Side: Branding (Unchanged) */}
      <div className="hidden lg:flex flex-col justify-between bg-[#111111] p-16 text-white relative overflow-hidden">
        <div className="z-10 flex items-center gap-2 text-orange-500">
          <div className="bg-orange-500 text-white p-2 rounded-xl shadow-lg shadow-orange-500/20">
            <Laptop size={24} strokeWidth={3} />
          </div>
          <span className="font-black tracking-tighter text-2xl uppercase italic">RYANS CLONE</span>
        </div>

        <div className="z-10 max-w-md">
          <h1 className="text-5xl font-bold leading-tight mb-6 text-white">
            Manage your Tech <br /> 
            <span className="text-gray-500 font-medium tracking-tight">Anywhere.</span>
          </h1>
          <p className="text-gray-400 text-lg mb-12 font-medium">
            Join the community and experience the next generation of tech analytics.
          </p>
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
        <div className="w-full max-w-135 bg-white rounded-[3rem] p-8 lg:p-12 shadow-xl shadow-slate-200/50 border border-gray-100">
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

            {/* Updated Phone Field with UPPERCASE Short Forms */}
            <div className="space-y-1">
              <div className={`flex items-stretch h-13 bg-gray-50 rounded-2xl overflow-visible relative group focus-within:ring-2 focus-within:ring-orange-500/20 transition-all ${errors.phone ? 'ring-2 ring-red-100' : ''}`}>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 h-full px-4 border-r border-gray-200 hover:bg-gray-100 transition-colors rounded-l-2xl"
                  >
                    <Image height={50} width={30} 
                      src={`https://flagcdn.com/w40/${selectedCountryCode.toLowerCase()}.png`} 
                      className="w-5 h-3.5 object-cover rounded-xs" 
                      alt="" 
                    />
                    <span className="text-xs font-bold text-gray-700 uppercase">{selectedCountryCode}</span>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-150">
                      <div className="p-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between gap-2">
                        <Search size={14} className="text-gray-400" />
                        <input 
                          className="bg-transparent text-xs outline-none w-full" 
                          placeholder="Search country..." 
                          value={searchTerm} 
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {filteredCountries.map(c => (
                          <div 
                            key={c.isoCode} 
                            onClick={() => { setValue("countryCode", c.isoCode.toUpperCase()); setIsDropdownOpen(false); setSearchTerm(""); }}
                            className="flex items-center gap-2 px-4 py-2.5 hover:bg-orange-50 cursor-pointer transition-colors"
                          >
                            <Image height={20} width={20} src={`https://flagcdn.com/w20/${c.isoCode.toLowerCase()}.png`} className="w-4 h-3 object-cover rounded-xs" alt="" />
                            <span className="text-xs font-bold text-gray-900 uppercase">{c.isoCode}</span>
                            <span className="text-[12px] font-bold ">+{c.phonecode}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center flex-1 px-4">
                  <span className="text-gray-400 text-sm w-20 font-bold mr-2">{phoneCode}</span>
                  <input 
                    {...register("phone")}
                    placeholder="1712345678"
                    onChange={(e) => setValue("phone", e.target.value.replace(/\D/g, ''))}
                    className="bg-transparent text-sm w-full outline-none font-medium text-gray-900" 
                  />
                </div>
              </div>
              {errors.phone && <p className="text-[10px] text-red-500 ml-2 font-bold">{errors.phone.message}</p>}
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
                  I agree to the <Link href="#" className="text-gray-900 font-bold hover:underline text-black">Terms of Service</Link> and <Link href="#" className="text-gray-900 font-bold hover:underline text-black">Privacy Policy</Link>
                </label>
            </div>

            <Button 
              disabled={isLoading} 
              className="w-full h-14 bg-[#ff5200] hover:bg-[#e64a00] text-white rounded-[1.25rem] font-bold text-base transition-all shadow-xl shadow-orange-500/25 active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
            >
               {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Get Started"}
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