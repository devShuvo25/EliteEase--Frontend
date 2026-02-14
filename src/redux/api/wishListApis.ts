import { baseApi } from "./baseApi"; // Path to your base RTK Query API

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get user's wishlist
    getWishlist: builder.query({
      query: () => ({
        url: "/wishlist",
        method: "GET",
      }),
      providesTags: ["Wishlist"],
    }),

    // 2. Add product to wishlist
    addToWishlist: builder.mutation({
      query: (productId: string) => ({
        url: "/wishlist/add",
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // 3. Remove product from wishlist
    removeFromWishlist: builder.mutation({
      query: (productId: string) => ({
        url: "/wishlist/remove",
        method: "PATCH",
        body: { productId },
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // 4. Clear all wishlist items
    clearWishlist: builder.mutation({
      query: () => ({
        url: "/wishlist/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
} = wishlistApi;