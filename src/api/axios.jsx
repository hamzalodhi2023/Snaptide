// axios.js or api.js
import axios from "axios";
import store from "../redux/store";
import { handleTokenRefresh, logout } from "../redux/slices/authSlice";
import { getNavigate } from "../utils/navigate"; // 🧭 Global navigate

const api = axios.create({
  baseURL: import.meta.env.VITE_SNAPTIDE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const resultAction = await store.dispatch(handleTokenRefresh());

      if (handleTokenRefresh.fulfilled.match(resultAction)) {
        return api(originalRequest);
      } else {
        store.dispatch(logout());

        const navigate = getNavigate(); // 🧭 use global navigate
        navigate("/login");

        return Promise.reject("Session expired. Please login again.");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
