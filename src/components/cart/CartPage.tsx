/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Trash2,
  Plus,
  Minus,
  Loader2,
  ArrowLeft,
  ShoppingBag,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  useGetAllCartItemsQuery,
  useUpdateCartItemQuantityMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} from "@/redux/api/cartApi";
import Link from "next/link";
import {
  showAppAlert,
  showConfirmDialog,
  showLoadingAlert,
} from "@/utils/alert";

export default function CartPage() {
  const { data: cartRes, isLoading } = useGetAllCartItemsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateQty, { isLoading: isUpdating }] =
    useUpdateCartItemQuantityMutation();
  const [removeItem] = useRemoveFromCartMutation();
  const [clearCart, { isLoading: isClearing }] = useClearCartMutation();

  const cartItems = cartRes?.data?.items || [];
  const subTotal = cartItems.reduce(
    (acc: number, item: any) => acc + item.product.basePrice * item.quantity,
    0,
  );
  // Logic: Sums all numeric charges. If all items are free, results in 0.
  const totalDeliveryCharge = cartItems?.reduce((acc: number, item: any) => {
    const charge = Number(item?.product?.deliveryCharge) || 0;
    return acc + charge;
  }, 0);

  // For Display: Logic to show "Free" if the sum is 0
  const displayDelivery =
    totalDeliveryCharge > 0 ? `৳${totalDeliveryCharge}` : "Free";
  // Adjust path as needed

  const handleClear = async () => {
    // Step 1: Trigger the Common Confirmation Dialog
    const result = await showConfirmDialog(
      "Are you sure?",
      "This will remove all items from your cart and restore product stock.",
    );

    // Step 2: Proceed only if the user confirms
    if (result.isConfirmed) {
      try {
        // Step 3: Show the Common Loading Spinner
        showLoadingAlert("Processing...", "Cleaning up your shopping cart.");

        // Execute the mutation (RTK Query)
        await clearCart(undefined).unwrap();
        // Step 4: Show the Common Success Alert
        // We pass 'success' as the icon variable
        await showAppAlert(
          "Success!",
          "Your cart has been cleared.",
          "success",
        );
      } catch (err: any) {
        // Step 5: Handle Errors using the Common Alert
        const errorMessage =
          err?.data?.message || "Something went wrong while clearing the cart.";

        showAppAlert("Error!", errorMessage, "error");
        console.error("Clear Cart Logic Error:", err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="animate-spin text-slate-300" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mt-12 md:mt-24 mx-auto px-4 py-8 bg-white min-h-screen">
      {/* Header Section */}
      <div className="flex flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6 ">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Shopping Bag
          </h1>
          <p className="text-slate-500 text-xs md:text-sm font-medium">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
            selected
          </p>
        </div>

        {cartItems.length > 0 && (
          <Button
            variant="ghost"
            onClick={handleClear}
            disabled={isClearing}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs md:text-sm h-9 px-3"
          >
            {isClearing ? (
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            ) : (
              <Trash2 size={16} className="mr-2" />
            )}
            <span className="hidden sm:inline">Clear All</span>
          </Button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <ShoppingBag className="h-12 w-12 text-slate-300 mb-4" />
          <h2 className="text-xl font-bold text-slate-800">
            Your bag is empty
          </h2>
          <Link href="/#products" className="mt-6">
            <Button className="bg-slate-900 text-white rounded-xl px-8">
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main List */}
          <div className="lg:col-span-8">
            <div className="divide-y divide-slate-100 border-t border-slate-100">
              {cartItems.map((item: any) => (
                <div
                  key={item.id}
                  className="py-5 flex gap-4 md:gap-6 items-center"
                >
                  {/* Small Height Image Container */}
                  <div className="h-20 w-20 md:h-24 md:w-24 shrink-0 overflow-hidden rounded-xl bg-slate-50 border border-slate-100 relative shadow-sm">
                    <Image
                      src={item.product.images[0]?.url || "/placeholder.png"}
                      alt={item.product.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  {/* Condensed Details */}
                  <div className="flex-1 flex flex-col justify-between min-h-20 md:min-h-24">
                    <div className="flex justify-between items-start">
                      <div className="max-w-37.5 md:max-w-xs">
                        <h3 className="text-sm md:text-base font-bold text-slate-900 truncate leading-tight">
                          {item.product.name}
                        </h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                          ৳{item.product.basePrice.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200 p-0.5">
                        <button
                          className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-white transition-all disabled:opacity-30"
                          onClick={() =>
                            updateQty({
                              cartItemId: item.id,
                              quantity: item.quantity - 1,
                            })
                          }
                          disabled={item.quantity <= 1 || isUpdating}
                        >
                          <Minus size={12} className="text-slate-600" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-white transition-all disabled:opacity-30"
                          onClick={() =>
                            updateQty({
                              cartItemId: item.id,
                              quantity: item.quantity + 1,
                            })
                          }
                          disabled={isUpdating}
                        >
                          <Plus size={12} className="text-slate-600" />
                        </button>
                      </div>
                      <p className="text-sm md:text-base font-black text-slate-900">
                        ৳
                        {(
                          item.product.basePrice * item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/#products"
              className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-slate-900 mt-8 group uppercase tracking-widest"
            >
              <ArrowLeft className="mr-2 h-3 w-3 group-hover:-translate-x-1 transition-transform" />
              Keep Browsing
            </Link>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-slate-50 rounded-2xl p-6 md:p-8 sticky top-24 border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-tight">
                Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-slate-500 text-sm">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">
                    ৳{subTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold italic text-xs uppercase">
                    {displayDelivery}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-6 mt-6">
                  <div className="flex justify-between items-end mb-8">
                    <span className="text-sm font-bold text-slate-500 uppercase">
                      Total
                    </span>
                    <span className="text-3xl font-black text-slate-900 tracking-tighter">
                      ৳{subTotal.toLocaleString()}
                    </span>
                  </div>

                  <Button className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg transition-all active:scale-95">
                    Checkout Now
                  </Button>

                  <div className="mt-6 flex items-center justify-center gap-2">
                    <div className="h-1 w-1 bg-slate-300 rounded-full" />
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      Secure SSL Checkout
                    </p>
                    <div className="h-1 w-1 bg-slate-300 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
