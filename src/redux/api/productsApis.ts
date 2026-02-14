// redux/api/categoryApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { Product } from "@/types/product";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<{ data: Product[] }, void>({
      query: () => "/products",
      providesTags: ["products"],
    }),
    
    getProductById: builder.query({
      query: ({id}) => ({
        url : `/products/${id}`
      }),
      providesTags: ["products"],
    }),

    createProducts: builder.mutation({
      query: ({ data }) => ({
        url: "/products",
        method: "POST",
        body: data, // { name, description }
      }),
      invalidatesTags: ["products"],
    }),

    updateProducts: builder.mutation({
      query: ({ data }) => ({
        url: `/categories/${data.id}`,
        method: "PATCH", // or "PUT" depending on your backend
        body: data, // { id, name, description }
      }),
      invalidatesTags: ["products"],
    }),

    deleteProducts: builder.mutation({
      query: ({ data }) => ({
        url: `/products/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductsMutation,
  useUpdateProductsMutation,
  useDeleteProductsMutation,
} = productsApi;
