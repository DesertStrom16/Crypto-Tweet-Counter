import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  auth: boolean;
  token: string;
};

const initialState: UserState = {
  auth: false,
  token: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    isAuth: (state, action: PayloadAction<UserState>) => {
      state.auth = action.payload.auth;
      state.token = action.payload.token;
    },
  },
});

export const { isAuth } = userSlice.actions;

export default userSlice.reducer;
