// redux/api/cartApi.ts
import { baseApi } from "@/redux/api/baseApi";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET: Fetch all cart items for the logged-in user
    getAllCartItems: builder.query({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
      providesTags: ["cart"],
    }),

    // POST: Add a new item to the cart
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/cart",
        method: "POST",
        body: data, // Expected: { productId, quantity }
      }),
      invalidatesTags: ["cart"],
    }),

    // PATCH: Update quantity of a specific cart item
    updateCartItemQuantity: builder.mutation({
      query: ({ cartItemId, quantity }) => ({
        url: `/cart/${cartItemId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["cart"],
    }),

    // DELETE: Remove a specific item
    removeFromCart: builder.mutation({
      query: (cartItemId) => ({
        url: `/cart/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),

    // DELETE: Clear the entire cart
    clearCart: builder.mutation({
      query: () => ({
        url: "/cart/clear-cart",
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetAllCartItemsQuery,
  useAddToCartMutation,
  useUpdateCartItemQuantityMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;