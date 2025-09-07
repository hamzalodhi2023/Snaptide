// 📁 src/api/axios.js

import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../redux/store";
import { handleTokenRefresh, logout } from "../redux/slices/authSlice"; // ✅ Thunk import

// 🔧 Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_SNAPTIDE_URL,
  withCredentials: true,
});

//` 2️⃣ Response interceptor — auto refresh logic using Redux thunk
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const resultAction = await store.dispatch(handleTokenRefresh());

      if (handleTokenRefresh.fulfilled.match(resultAction)) {
        return api(originalRequest); // 🔁 Retry original request
      } else {
        // 🔐 Refresh failed → Logout user
        store.dispatch(logout());
        window.location.href = "/login";
        return Promise.reject("Session expired. Please login again.");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
