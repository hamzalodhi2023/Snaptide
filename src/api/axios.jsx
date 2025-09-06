import axios from "axios";
import { store } from "../redux/store";
import { setToken, logout } from "../redux/slices/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_SNAPTIDE_URL,
  withCredentials: true, // for httpOnly refresh token
});

// 1️⃣ REQUEST Interceptor — add access token from Redux
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2️⃣ RESPONSE Interceptor — handle 401 and refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh token endpoint
        const res = await axios.get(
          `${import.meta.env.VITE_SNAPTIDE_URL}/auth/refresh`,
          {
            withCredentials: true,
          }
        );

        const newAccessToken = res.data.accessToken;

        // Set new token to Redux and localStorage
        store.dispatch(setToken(newAccessToken));
        localStorage.setItem("accessToken", newAccessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        store.dispatch(logout());
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
