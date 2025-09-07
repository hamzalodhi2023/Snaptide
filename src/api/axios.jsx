import axios from "axios";
import Cookies from "js-cookie";
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
    { withCredentials: true }
  );

  const newAccessToken = res.data.accessToken;

  // Redux + Cookie update
  store.dispatch(setToken(newAccessToken));
  // 1 minute testing cookie
  const inOneMinute = new Date(new Date().getTime() + 1 * 60 * 1000);
  Cookies.set("accessToken", newAccessToken, {
    expires: inOneMinute,
  });

  return newAccessToken;
};

// 1️⃣ Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default api;
