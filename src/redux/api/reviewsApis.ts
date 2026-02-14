// redux/api/categoryApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { Product } from "@/types/product";

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query<{ data: Product[] }, void>({
      query: () => "/reviews",
      providesTags: ["reviews"],
    }),
    
    getReviewsByProductId: builder.query({
      query: ({id}) => ({
        url : `/reviews/product/${id}`
      }),
      providesTags: ["reviews"],
    }),

    createReviews: builder.mutation({
      query: ({ data }) => ({
        url: "/reviews",
        method: "POST",
        body: data, // { name, description }
      }),
      invalidatesTags: ["reviews"],
    }),

    updateReviews: builder.mutation({
      query: ({ data }) => ({
        url: `/reviews/${data.id}`,
        method: "PATCH", // or "PUT" depending on your backend
        body: data, // { id, name, description }
      }),
      invalidatesTags: ["reviews"],
    }),

    deleteReviews: builder.mutation({
      query: ({ data }) => ({
        url: `/reviews/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const {
useGetAllReviewsQuery,
useGetReviewsByProductIdQuery,
useUpdateReviewsMutation,
useCreateReviewsMutation,
useDeleteReviewsMutation
} = reviewsApi;
