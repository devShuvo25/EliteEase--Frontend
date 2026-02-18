import { Button } from "@/components/ui/button";
import { AddressCard } from "./adressCard";


export default function AddressPage() {

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#37393F]">Your Addresses</h2>
          <p className="text-xs text-gray-400 font-medium">Manage your shipping and billing locations</p>
        </div>
        <Button className="bg-[#1A73E8] hover:bg-blue-700 text-white rounded-xl font-black uppercase text-[10px] tracking-widest h-10 px-6">
          + Add New
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map through addresses here */}
        <AddressCard
          address={{
            id: "1",
            type: "HOME",
            isDefault: true,
            name: "Alex John",
            street: "Great street, New York Brooklyn 5A",
            city: "New York",
            state: "NY",
            zip: "212891",
            phone: "+1 234 567 890"
          }}
        />
      </div>
    </div>
  );
}