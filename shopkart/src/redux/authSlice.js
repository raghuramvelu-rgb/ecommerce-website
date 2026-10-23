import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { email: null },
  reducers: {
    signIn: (state, { payload: email }) => {
      state.email = email;
    },
    signOut: (state) => {
      state.email = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;