import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//` SnapTide URL

const URL = `${import.meta.env.VITE_SNAPTIDE_URL}`;

//` variable for save user login form data
let userAccessToken = null;

try {
  userAccessToken = localStorage.getItem("accessToken") || null;
} catch (err) {
  userAccessToken = null;
}

const initialState = {
  token: userAccessToken,
  error: null,
  loading: false,
};

//` Create Async Thunk for Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/auth/login`, userData);
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log(localStorage.getItem("accessToken"));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//` Create Async Thunk for Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      localStorage.removeItem("accessToken");
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
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
