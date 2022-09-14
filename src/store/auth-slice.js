const authSlice = createSlice({
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
    localStorage.setItem("token", getState().auth.token);
    return result;
  };
};

export const authActions = authSlice.actions;
