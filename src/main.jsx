import React from "react";
import { MantineProvider } from "@mantine/core";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
// import "./index.css";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Listing from "./routes/listing.jsx";
import Product from "./routes/product.jsx";
import { Layout } from "./components/layout.jsx";
import Index from "./routes/index.jsx";
import { Products } from "./routes/products.jsx";
import { Categories } from "./routes/categories";
import { Users } from "./routes/users.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: "products", element: <Products /> },
      { path: "categories", element: <Categories /> },
      { path: "users", element: <Users /> },
      {
        path: "listing/:id",
        element: <Listing />,
      },
      {
        path: "product/:id",
        element: <Product />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <MantineProvider
      withNormalizeCSS
      withDefaultStyles
      withGlobalStyles
      theme={{
        colorScheme: "light",
        colors: {
          // Add your color
          deepBlue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
          // or replace default theme color
          blue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
        },

        shadows: {
          md: "1px 1px 3px rgba(0, 0, 0, .25)",
          xl: "5px 5px 3px rgba(0, 0, 0, .25)",
        },

        headings: {
          fontFamily: "Roboto, sans-serif",
          sizes: {
            h1: { fontSize: 30 },
          },
        },
        defaultGradient: { from: "#ed6ea0", to: "#ec8c69", deg: 35 },
        loader: "bars",
      }}
    >
      <RouterProvider router={router} />
    </MantineProvider>
  </Provider>
  // </React.StrictMode>
);
