import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { storeApi } from "./store-slice";
import { authSlice } from "./slices/auth-slice";
import { localStorageMiddleware } from "./auth-slice.js";

export const store = configureStore({
  reducer: {
    [storeApi.reducerPath]: storeApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      storeApi.middleware,
      localStorageMiddleware,
    ]),
});

setupListeners(store.dispatch);
