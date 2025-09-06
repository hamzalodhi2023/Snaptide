import axios from "axios";
import { store } from "../redux/store";
import { setToken, logout } from "../redux/slices/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_SNAPTIDE_URL,
  withCredentials: true,
});

// 🔁 Token Refresh Handler
const handleTokenRefresh = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_SNAPTIDE_URL}/auth/refresh`,
    {
      withCredentials: true,
    }
  );

  const newAccessToken = res.data.accessToken;

  // Redux + localStorage update
  store.dispatch(setToken(newAccessToken));
  localStorage.setItem("accessToken", newAccessToken);

  return newAccessToken;
};

// 1️⃣ Request Interceptor
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

// 2️⃣ Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await handleTokenRefresh();

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
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
