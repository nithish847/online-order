import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,    // {_id, fullname, email, phoneNumber, role}
    token: tokenFromStorage || null,   // hydrate token here
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      if (action.payload) {
        const { _id, fullname, email, phoneNumber, role, token } = action.payload;
        state.user = { _id, fullname, email, phoneNumber, role };
        state.token = token || state.token;  // Update token if new one present, else keep old
      } else {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");  // Clear localStorage on logout
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token"); // Also clear from localStorage on clear
    },
  },
});

export const { setLoading, setUser, clearUser } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
