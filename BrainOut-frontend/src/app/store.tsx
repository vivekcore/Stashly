import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/FormSlice";
import userReducer from "../features/UserSlice";
import alertReducer from "../features/AlertSlice";
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    logoutAlert: alertReducer,
  },
});

// Types for TS (IMPORTANT)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
