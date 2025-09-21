// redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import api from "../../api/axios";

const URL = `${import.meta.env.VITE_SNAPTIDE_URL}`;

const initialState = {
  token: Cookies.get("accessToken") || null,
  loading: false,
  error: null,

  // 🆕 Forgot Password
  forgotLoading: false,
  forgotSuccessMessage: null,
  forgotError: null,

  resetLoading: false,
  resetSuccessMessage: null,
  resetError: null,

  // 🔁 Validate Reset Token
  validateLoading: false,
  isResetTokenValid: null, // true | false | null
  validateError: null,
};

//? ✅ Login User
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
        message: error.response?.data?.msg || error.message,
      });
    }
  }
);

//? ✅ Register User
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

//? ✅ Refresh Access Token
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

//? ✅ Logout User
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

//? ✅ Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/forgot-password", { email });
      return res.data; // Assuming response has a message like { message: "Email sent" }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

//? ✅ Set Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password, id }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${URL}/auth/reset-password`, {
        newPassword: password,
        token,
        userId: id,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

//? ✅ Validate Reset Token
export const validateResetToken = createAsyncThunk(
  "auth/validateResetToken",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${URL}/auth/validate-reset-token`, {
        token,
        userId: id,
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
      //? ✅ Login
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
      //? ✅ Register
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
      //? ✅ Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        Cookies.remove("accessToken");
      })
      //? ✅ Refresh Token
      .addCase(handleTokenRefresh.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(handleTokenRefresh.rejected, (state) => {
        state.token = null;
        Cookies.remove("accessToken");
      })
      //? ✅ Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.forgotLoading = true;
        state.forgotSuccessMessage = null;
        state.forgotError = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotLoading = false;
        state.forgotSuccessMessage = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotLoading = false;
        state.forgotError = action.payload?.message || "Something went wrong.";
      })
      //? ✅ Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.resetLoading = true;
        state.resetSuccessMessage = null;
        state.resetError = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetLoading = false;
        state.resetSuccessMessage = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetLoading = false;
        state.resetError = action.payload?.message || "Reset failed.";
      })
      //? ✅ Validate Reset Token
      .addCase(validateResetToken.pending, (state) => {
        state.validateLoading = true;
        state.isResetTokenValid = null;
        state.validateError = null;
      })
      .addCase(validateResetToken.fulfilled, (state, action) => {
        state.validateLoading = false;
        state.isResetTokenValid = action.payload.valid; // true | false
      })
      .addCase(validateResetToken.rejected, (state, action) => {
        state.validateLoading = false;
        state.isResetTokenValid = false;
        state.validateError =
          action.payload?.message || "Token validation failed.";
      });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
