import { createSlice } from "@reduxjs/toolkit";

const state = {
  logged_in: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: state,
  reducers: {
    userLogIn: (state, action) => {
      state.logged_in = true;
      state.user = action.payload;
    },
    userLogOut: (state, action) => {
      state.logged_in = false;
      state.user = null;
    },
  },
});

export default userSlice.reducer;

export const { userLogIn, userLogOut } = userSlice.actions;

export const selectUser = (state) => state.user;
