import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/slices/authSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
    }
})