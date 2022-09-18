import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = null;
    },
  },
});

export const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("appState", JSON.stringify(getState()));
    return result;
  };
};

export const reHydrateStore = () => {
  if (localStorage.getItem("appState") !== null) {
    return JSON.parse(localStorage.getItem("appState"));
  }
};

export const authActions = authSlice.actions;
