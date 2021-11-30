import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "../store/data/dataSlice";
import userSlice from "../store/user/userSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    data: dataSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
