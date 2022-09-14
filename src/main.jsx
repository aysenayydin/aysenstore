import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import Root from "./routes/root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Listing from "./routes/listing.jsx";
import Product from "./routes/product.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/listing/:id",
    element: <Listing />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
