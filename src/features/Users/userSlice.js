import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { RouteError } from "../../utils/Exceptions";

export const signUpUser = createAsyncThunk(
  "signUpUser",
  async ({ username, password }) => {
    const response = await fetch("/user/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.status === 201) {
      return { isLoggedIn: false };
    }
    throw new RouteError(data.errors);
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ username, password }) => {
    const response = await fetch("/user/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.status === 201) {
      const token = await data.data.token;
      localStorage.setItem("jwtToken", token);
      return { ...data.data.attributes, token, isLoggedIn: true };
    }
    throw new RouteError(data.errors);
  }
);

export const logoutUser = createAsyncThunk("logoutUser", async () => {
  return { status: "idle", error: null, user: { isLoggedIn: false } };
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { isLoggedIn: false },
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [signUpUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [signUpUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
    [logoutUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
    },
    [logoutUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export const isUserLoggedIn = (state) => state.user.user.isLoggedIn;
export const getError = (state) => state.user.error;
export const getToken = (state) => state.user.user.token;

export default userSlice.reducer;
