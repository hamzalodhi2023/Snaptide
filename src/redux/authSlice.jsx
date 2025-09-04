import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//` SnapTide URL

const URL = import.meta.env.SNAPTIDE_URL;

//` variable for save user login form data
let userFormStorage = null;

//` initial state for loading and error
const initialState = {
  user: userFormStorage,
  error: null,
  loading: false,
};

//` Create Async Thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/auth/login`, userData);
      localStorage.setItem("userToken", response.data.token);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//` Slice for Login and Register
