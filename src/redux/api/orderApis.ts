// redux/api/categoryApi.ts
import { baseApi } from "@/redux/api/baseApi";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => "/orders",
      providesTags: ["orders"],
    }),

    createOrders: builder.mutation({
      query: ({ data }) => ({
        url: "/orders",
        method: "POST",
        body: data, // { name, description }
      }),
      invalidatesTags: ["orders"],
    }),

    updateOrders: builder.mutation({
      query: ({ data }) => ({
        url: `/orders/${data.id}`,
        method: "PATCH", // or "PUT" depending on your backend
        body: data, // { id, name, description }
      }),
      invalidatesTags: ["orders"],
    }),

    deleteOrders: builder.mutation({
      query: ({ data }) => ({
        url: `/orders/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
    useCreateOrdersMutation,
    useGetAllCategoryQuery,
    useUpdateOrdersMutation,
    useDeleteOrdersMutation

} = ordersApi;