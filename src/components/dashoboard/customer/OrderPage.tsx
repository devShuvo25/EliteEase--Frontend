/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { 
  Camera, Plus, Home, Briefcase, Trash2, Pencil, 
  CheckCircle2, Phone, Mail, MapPin, User,
  UserIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function SimpleProfilePage() {
  const user = {
    email: "alexjohn@gmail.com",
    username: "alex_j",
    role: "CUSTOMER",
    phoneNumber: "+880 1712 345678",
    countryCode: "BD",
    isEmailVerified: true,
    profile: {
      firstName: "Alex",
      lastName: "John",
      avatarUrl: "https://github.com/shadcn.png"
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-10 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground">Manage your profile information and saved addresses.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm px-6">
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Sidebar: Profile Summary */}
        <div className="space-y-6">
          <Card className="shadow-sm border-slate-200">
            <CardContent className="pt-8 pb-6 flex flex-col items-center">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-2 border-background shadow-md">
                  <AvatarImage src={user.profile.avatarUrl} />
                  <AvatarFallback className="bg-slate-100 text-slate-600 font-medium">
                    {user.profile.firstName?.[0]}{user.profile.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full border shadow-sm group-hover:scale-110 transition-transform"
                >
                  <Camera size={14} />
                </Button>
              </div>
              
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold">{user.profile.firstName} {user.profile.lastName}</h3>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
              </div>

              <div className="mt-4 flex gap-2">
                {user.isEmailVerified && (
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-100 font-medium">
                    <CheckCircle2 size={12} className="mr-1" /> Verified
                  </Badge>
                )}
                <Badge variant="outline" className="text-slate-500 font-medium uppercase text-[10px]">
                   {user.countryCode}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 bg-slate-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Account Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium text-blue-600">{user.role}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium text-emerald-600">Active</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content: Personal Details & Addresses */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Profile Form */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your public profile details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={user.profile.firstName || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={user.profile.lastName || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" value={user.email} disabled className="bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue={user.phoneNumber || ""} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Registry Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <MapPin size={20} className="text-blue-600" />
                Shipping Addresses
              </h2>
              
                <Dialog >
  <DialogTrigger asChild>
    <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-md border-blue-200 hover:bg-blue-50">
      <Plus size={14} className="text-blue-600" />
      <span className="text-xs font-semibold text-blue-700">Add Address</span>
    </Button>
  </DialogTrigger>
  
  <DialogContent className="Z-10000 sm:max-w-100  p-0 gap-0 overflow-hidden border-none shadow-xl bg-white">
    {/* Minimal Header */}
    <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-100">
      <DialogHeader>
        <DialogTitle className="text-base font-bold flex items-center gap-2">
          <MapPin size={16} className="text-blue-600" />
          Add New Address
        </DialogTitle>
      </DialogHeader>
    </div>

    <div className="p-4 space-y-4">
      {/* Recipient Field */}
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-[10px] font-bold uppercase text-slate-500">Recipient</Label>
        <div className="relative">
          <UserIcon className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <Input id="name" placeholder="John Doe" className="pl-8 h-9 text-sm border-slate-200" />
        </div>
      </div>

      {/* Row: Type & Phone */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="type" className="text-[10px] font-bold uppercase text-slate-500">Type</Label>
          <Select defaultValue="SHIPPING">
            <SelectTrigger id="type" className="h-9 text-sm border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SHIPPING">Shipping</SelectItem>
              <SelectItem value="BILLING">Billing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone-add" className="text-[10px] font-bold uppercase text-slate-500">Phone</Label>
          <div className="relative">
            <Phone className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <Input id="phone-add" placeholder="+880..." className="pl-8 h-9 text-sm border-slate-200" />
          </div>
        </div>
      </div>

      {/* Street Address */}
      <div className="space-y-1.5">
        <Label htmlFor="street" className="text-[10px] font-bold uppercase text-slate-500">Street Address</Label>
        <Input id="street" placeholder="House 12, Road 5..." className="h-9 text-sm border-slate-200" />
      </div>

      {/* Row: City & Country */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="city" className="text-[10px] font-bold uppercase text-slate-500">City</Label>
          <Input id="city" placeholder="Dhaka" className="h-9 text-sm border-slate-200" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="country" className="text-[10px] font-bold uppercase text-slate-500">Country</Label>
          <Input id="country" placeholder="BD" className="h-9 text-sm border-slate-200" />
        </div>
      </div>
    </div>

    {/* Compact Footer */}
    <DialogFooter className="p-4 pt-0 flex-row justify-end gap-2">
      <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-500">Cancel</Button>
      <Button type="submit" size="sm" className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-xs font-semibold shadow-sm shadow-blue-100 transition-all active:scale-95">
        Save Address
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AddressCard 
                type="SHIPPING"
                name="Alex John"
                phone="+880 1712 345678"
                address="House 45, Road 12, Banani, Dhaka"
                isDefault
              />
              <AddressCard 
                type="BILLING"
                name="Alex John"
                phone="+880 1712 345678"
                address="Corporate Tower, Level 4, Chittagong"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function AddressCard({ type, name, phone, address, isDefault = false }: any) {
  return (
    <Card className={cn(
      "relative group transition-all border-slate-200",
      isDefault ? "ring-2 ring-blue-500/20 border-blue-200 bg-blue-50/10" : "hover:border-slate-300 shadow-sm"
    )}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <div className={cn(
              "p-2 rounded-lg",
              isDefault ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"
            )}>
              {type === "SHIPPING" ? <Home size={16} /> : <Briefcase size={16} />}
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">{name}</p>
              <p className="text-[11px] text-muted-foreground font-medium mt-1">
                {type} {isDefault && <span className="text-blue-600 ml-1">• Default</span>}
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-600">
              <Pencil size={14} />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-red-600">
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-slate-600 mb-3">{address}</p>
        <p className="text-xs font-medium text-slate-500 flex items-center gap-1">
          <Phone size={12} /> {phone}
        </p>
      </CardContent>
    </Card>
  );
}