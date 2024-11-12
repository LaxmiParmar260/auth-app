import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authService from "./authService";

const userExist = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    user: userExist || null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.isError = false);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.isError = false);
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = true),
          (state.message = action.payload);
      })
      .addCase(loginUser.pending, (state, action) => {
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.isError = false);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.isError = false);
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = true),
          (state.message = action.payload);
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = false),
          (state.message = "");
        state.user = null;
      });
  },
});

export default authSlice.reducer;

//Register user
export const registerUser = createAsyncThunk(
  "REGISTER/USER",
  async (formData, thunkAPI) => {
    try {
      return await authService.register(formData);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//login user
export const loginUser = createAsyncThunk(
  "LOGIN/USER",
  async (formData, thunkAPI) => {
    try {
      return await authService.login(formData);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//logOut user
export const logOutUser = createAsyncThunk("LOGOUT/USER", async () => {
  localStorage.removeItem("user");
});
