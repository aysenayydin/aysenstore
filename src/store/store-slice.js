import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeApi = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.escuelajs.co/api/v1/" }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "categories",
    }),
    getProducts: builder.query({
      query: (id) => `categories/${id}/products?offset=0&limit=10`,
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "auth/profile",
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useLazyGetProductsQuery,
  useLazyGetProductQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
} = storeApi;
