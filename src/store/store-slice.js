import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeApi = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.escuelajs.co/api/v1/" }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "categories",
    }),
    getProducts: builder.query({
      query: (id) => `categories/${id}/products`,
    }),
    getAllProducts: builder.query({
      query: (offset = 0) => `products?offset=${offset}&limit=10`,
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
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("appState")).auth.token
          }`,
        },
      }),
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        url: "products",
        method: "POST",
        body,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
    }),
    addCategory: builder.mutation({
      query: (body) => ({
        url: "categories",
        method: "POST",
        body,
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
  useAddProductMutation,
  useLazyGetAllProductsQuery,
  useDeleteProductMutation,
  useAddCategoryMutation,
} = storeApi;
