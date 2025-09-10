import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

//` SnapTide URL

const URL = `${import.meta.env.VITE_SNAPTIDE_URL}`;

const initialState = {
  token: null,
  error: null,
  loading: false,
};

//` variable for save user login form dat
try {
  initialState.token = Cookies.get("accessToken") || null;
} catch (err) {
  initialState.token = null;
}

//` Create Async Thunk for Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${URL}/auth/login`, userData, {
        withCredentials: true,
      });

      const in15Minutes = new Date(new Date().getTime() + 10 * 1000);
      Cookies.set("accessToken", res.data.accessToken, {
        expires: in15Minutes,
        path: "/",
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.res?.data || { message: error.message });
    }
  }
);

//` Create Async Thunk for Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${URL}/auth/register`, userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res?.data || { message: error.message });
    }
  }
);

export const handleTokenRefresh = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${URL}/auth/refresh`, {
        withCredentials: true,
      });

      const newAccessToken = res.data.accessToken;

      const in15Minutes = new Date(new Date().getTime() + 10 * 1000);
      Cookies.set("accessToken", newAccessToken, {
        expires: in15Minutes,
        path: "/",
      });
      return newAccessToken;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: error.message }
      );
    }
  }
);

//` Slice for Login and Register

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
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Register failed";
      })
      .addCase(handleTokenRefresh.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(handleTokenRefresh.rejected, (state) => {
        state.token = null;
      });
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
