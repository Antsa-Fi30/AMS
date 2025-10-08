import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    access: "",
    refresh: "",
  },
  reducers: {
    authSuccess: (state, action) => {
      state.user = action.payload.user;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;

      localStorage.setItem("access", state.access);
      localStorage.setItem("refresh", state.refresh);
      sessionStorage.setItem("user", JSON.stringify(state.user));
    },
    initializeAuth: (state) => {
      // Au chargement de l'app, récupérer depuis SessionStorage
      const savedUser = sessionStorage.getItem("user");
      if (savedUser) {
        state.user = JSON.parse(savedUser);
      }
    },
    reinit: (state) => {
      state.access = "";
      state.refresh = "";
      state.user = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      sessionStorage.removeItem("user");
    },

    updateUser: (state, action) => {
      state.user = { ...(state.user ?? {}), ...action.payload };
      sessionStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const { authSuccess, reinit, initializeAuth, updateUser } =
  authSlice.actions;
export default authSlice.reducer;

