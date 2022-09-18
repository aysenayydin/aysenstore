import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { storeApi } from "./store-service.js";
import { authSlice, reHydrateStore } from "./auth-slice";
import { localStorageMiddleware } from "./auth-slice.js";

export const store = configureStore({
  reducer: {
    [storeApi.reducerPath]: storeApi.reducer,
    auth: authSlice.reducer,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      storeApi.middleware,
      localStorageMiddleware,
    ),
});

setupListeners(store.dispatch);
