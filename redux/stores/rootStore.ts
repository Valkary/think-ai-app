import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import authReducer from "../slices/authSlice";

// Define app state
export const rootState = configureStore({
    reducer: {
        auth: authReducer
    }
});

export type AppDispatch = typeof rootState.dispatch;
export type RootState = ReturnType<typeof rootState.getState>;