// redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const URL = `${import.meta.env.VITE_SNAPTIDE_URL}`;

const initialState = {
  token: Cookies.get("accessToken") || null,
  loading: false,
  error: null,
};

// ✅ Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${URL}/auth/login`, userData, {
        withCredentials: true,
      });

      const in15Minutes = new Date(new Date().getTime() + 15 * 60 * 1000);
      Cookies.set("accessToken", res.data.accessToken, {
        expires: in15Minutes,
        path: "/",
      });

      return res.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });
    }
  }
);

// ✅ Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${URL}/auth/register`, userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// ✅ Refresh Access Token
export const handleTokenRefresh = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${URL}/auth/refresh`, {
        withCredentials: true,
      });

      const newAccessToken = res.data.accessToken;

      const in15Minutes = new Date(new Date().getTime() + 15 * 60 * 1000);
      Cookies.set("accessToken", newAccessToken, {
        expires: in15Minutes,
        path: "/",
      });

      return newAccessToken;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// ✅ Logout User
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${URL}/auth/logout`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      Cookies.remove("accessToken");
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        Cookies.remove("accessToken");
      })

      // Refresh
      .addCase(handleTokenRefresh.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(handleTokenRefresh.rejected, (state) => {
        state.token = null;
        Cookies.remove("accessToken");
      });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
