// userApi.ts

/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "@/redux/api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    alluser: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: "/users",
        method: "GET",
        params: { page, limit }, // This sends ?page=2&limit=10
      }),
      providesTags: ["Users"],
      // Optional: transform response to match your UI
      transformResponse: (response: any) => ({
        users: response.data,
        meta: response.meta, // { page, limit, total, totalPages }
      }),
    }),
    getUserById: builder.query({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    getPermission: builder.query({
      query: ({ admin }) => ({
        url: `/permissions/${admin.id}`,
        method: "GET",
      }),
      providesTags: ["permissions"],
    }),
    upPermission: builder.mutation({
      query: ({ admin }) => ({
        url: `/permissions/${admin.id}`,
        method: "PATCH",
        body: admin,
      }),
      invalidatesTags: ["permissions"],
    }),

    addUser: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation({
      query: ({ data }) => ({
        url: `/users/${data.id}`,
        method: "PATCH", // or "PUT" depending on your backend
        body: data, // { id, name, description }
      }),
      invalidatesTags: ["Users"],
      
    }),

    deleteUser: builder.mutation({
      query: ({ data }) => ({
        url: `/users/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    asignCat: builder.mutation({
      query: ({ userId, categoryIds }) => ({
        url: `/users/${userId}/assign-categories`,
        method: "PATCH",
        body: { categoryIds },
      }),
      invalidatesTags: ["Users"],
    }),
    myProfile: builder.query({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
      providesTags: ["Users"],
    }), 
  }),
  overrideExisting: true,
});

export const {
  useAlluserQuery,
  useAddUserMutation,
  useGetUserByIdQuery,
  useGetPermissionQuery,
  useUpPermissionMutation,
  useAsignCatMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useMyProfileQuery
} = userApi;
