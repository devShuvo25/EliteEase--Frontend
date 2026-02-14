// redux/api/categoryApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { Category } from "@/types/user.type";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query<{ data: Category[] }, void>({
      query: () => "/categories",
      providesTags: ["categories"],
    }),

    createCategory: builder.mutation({
      query: ({ data }) => ({
        url: "/categories",
        method: "POST",
        body: data, // { name, description }
      }),
      invalidatesTags: ["categories"],
    }),

    updateCategory: builder.mutation({
      query: ({ data }) => ({
        url: `/categories/${data.id}`,
        method: "PATCH", // or "PUT" depending on your backend
        body: data, // { id, name, description }
      }),
      invalidatesTags: ["categories"],
    }),

    deleteCategory: builder.mutation({
      query: ({ data }) => ({
        url: `/categories/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoryApi;