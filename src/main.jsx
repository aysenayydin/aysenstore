import React from "react";
import { MantineProvider } from "@mantine/core";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Listing from "./routes/listing.jsx";
import Product from "./routes/product.jsx";
import { Layout } from "./components/layout.jsx";
import App from "./App.jsx";
import { Products } from "./routes/products.jsx";
import {Categories} from "./routes/categories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "products", element: <Products /> },
      { path: "categories", element: <Categories /> },
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
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </Provider>
  // </React.StrictMode>
);
