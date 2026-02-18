import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function AddressForm() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</Label>
          <Input placeholder="e.g. Alex John" className="h-11 rounded-lg border-gray-200" />
        </div>
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone Number</Label>
          <Input placeholder="+1 234 567 890" className="h-11 rounded-lg border-gray-200" />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Street Address</Label>
        <Input placeholder="House number and street name" className="h-11 rounded-lg border-gray-200" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">City</Label>
          <Input placeholder="New York" className="h-11 rounded-lg border-gray-200" />
        </div>
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">State</Label>
          <Input placeholder="NY" className="h-11 rounded-lg border-gray-200" />
        </div>
        <div className="col-span-2 md:col-span-1 space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">ZIP Code</Label>
          <Input placeholder="10001" className="h-11 rounded-lg border-gray-200" />
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox id="default" className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
        <label htmlFor="default" className="text-xs font-bold text-[#37393F] cursor-pointer">
          Set as default shipping address
        </label>
      </div>

      <Button className="w-full bg-[#37393F] hover:bg-[#1A73E8] text-white h-12 rounded-xl font-black uppercase text-xs tracking-[0.2em] transition-all">
        Save Address
      </Button>
    </div>
  );
}