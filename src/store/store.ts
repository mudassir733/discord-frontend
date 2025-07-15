
import { configureStore } from "@reduxjs/toolkit";
import statusReducer from "./slices/statusTypeSlice";
import notificationReducer from "./slices/notificationSlice";

export const store = configureStore({
    reducer: {
        status: statusReducer,
        notifications: notificationReducer,
    },
});

// Infer the type of the state
export type RootState = ReturnType<typeof store.getState>;
// Infer the type of dispatch
export type AppDispatch = typeof store.dispatch;