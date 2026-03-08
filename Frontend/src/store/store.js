
// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import careerReducer from "./careerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    career: careerReducer,
  },
});