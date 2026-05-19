import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/auth/store/user-slice";
import alertReducer from "@/features/auth/store/logout-alert-slice";
import uiReducer from "@/features/content/store/content-dialog-slice";

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
