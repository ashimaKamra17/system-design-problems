import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import uiReducer from "./slices/uiSlice";

// Configure the store
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
