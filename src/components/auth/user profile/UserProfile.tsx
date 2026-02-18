"use client";

import React from "react";
import { 
  User, 
  Lock, 
  Bell, 
  Camera,
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function UserProfilePage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 p-1.5 bg-brand-primary text-white rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform">
              <Camera size={16} />
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">John Doe</h1>
            <p className="text-slate-500 text-sm font-medium">john.doe@example.com</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-blue-100">
                Verified Customer
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="text-xs font-bold uppercase tracking-widest">View Orders</Button>
          <Button className="bg-brand-primary text-xs font-bold uppercase tracking-widest">Edit Profile</Button>
        </div>
      </div>

      <Separator className="my-8" />

      {/* 2. Content Tabs */}
      <Tabs defaultValue="account" className="flex flex-col md:flex-row gap-8">
        <TabsList className="flex md:flex-col h-auto bg-transparent gap-2 md:w-64 items-start overflow-x-auto md:overflow-visible pb-2">
          <TabsTrigger 
            value="account" 
            className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-xl transition-all"
          >
            <User size={18} />
            <span className="font-bold text-sm tracking-tight">Account Settings</span>
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-xl transition-all"
          >
            <Lock size={18} />
            <span className="font-bold text-sm tracking-tight">Login & Security</span>
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-xl transition-all"
          >
            <Bell size={18} />
            <span className="font-bold text-sm tracking-tight">Notifications</span>
          </TabsTrigger>
        </TabsList>

        <div className="flex-1">
          {/* ACCOUNT SETTINGS CONTENT */}
          <TabsContent value="account" className="mt-0 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Card className="border-slate-100 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-tight">Personal Information</CardTitle>
                <CardDescription>Update your personal details and how others see you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="text-xs font-bold uppercase text-slate-500">First Name</Label>
                    <Input id="first-name" defaultValue="John" className="rounded-lg focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="text-xs font-bold uppercase text-slate-500">Last Name</Label>
                    <Input id="last-name" defaultValue="Doe" className="rounded-lg" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase text-slate-500">Email Address</Label>
                  <Input id="email" defaultValue="john.doe@example.com" disabled className="bg-slate-50 opacity-70" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-bold uppercase text-slate-500">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 000-0000" className="rounded-lg" />
                </div>
                <Button className="bg-brand-primary w-fit mt-4 px-8 font-bold uppercase text-xs tracking-widest">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SECURITY CONTENT */}
          <TabsContent value="security" className="mt-0 space-y-6">
            <Card className="border-slate-100 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-tight">Password Management</CardTitle>
                <CardDescription>Change your password regularly to stay secure.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current" className="text-xs font-bold uppercase text-slate-500">Current Password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new" className="text-xs font-bold uppercase text-slate-500">New Password</Label>
                  <Input id="new" type="password" />
                </div>
                <Button className="bg-slate-900 text-white w-fit px-8 font-bold uppercase text-xs tracking-widest hover:bg-brand-primary">Update Password</Button>
              </CardContent>
            </Card>

            <Card className="border-red-50 shadow-sm rounded-2xl bg-red-50/20">
              <CardHeader>
                <CardTitle className="text-lg font-black text-red-600 uppercase tracking-tight">Danger Zone</CardTitle>
                <CardDescription>Permanently delete your account and all data.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" className="font-bold uppercase text-xs tracking-widest">Delete Account</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}