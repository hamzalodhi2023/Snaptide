// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice"; // ✅ import profile slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer, // ✅ add profile to the store
  },
});

export default store;

