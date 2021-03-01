import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { RouteError } from "../../utils/Exceptions";

export const signUpUser = createAsyncThunk(
  "signUpUser",
  async ({ username, password }) => {
    const response = await fetch(`${process.env.REACT_BACKEND}/user/signup`, {
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
    const response = await fetch(`${process.env.REACT_BACKEND}/user/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.status === 201) {
      const token = await data.data.token;
      return { ...data.data.attributes, token, isLoggedIn: true };
    }
    throw new RouteError(data.errors);
  }
);

export const logoutUser = createAsyncThunk("logoutUser", async () => {
  return { status: "idle", error: null, user: { isLoggedIn: false } };
});

export const fetchRefreshToken = createAsyncThunk(
  "fetchRefreshToken",
  async (token) => {
    const response = await fetch(`${process.env.REACT_BACKEND}/user/refresh`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status === 201) {
      const new_token = await data.data.token;
      return new_token;
    }
    throw new RouteError(data.errors);
  }
);

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
      state.error = action.error.message;
      state.status = "failed";
    },
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
    },
    [loginUser.rejected]: (state, action) => {
      state.error = action.error;
      state.status = "failed";
    },
    [logoutUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [logoutUser.fulfilled]: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.status = "succeeded";
    },
    [logoutUser.rejected]: (state, action) => {
      state.error = action.error;
      state.status = "failed";
    },
    [fetchRefreshToken.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchRefreshToken.fulfilled]: (state, action) => {
      const { payload } = action;
      state.user = { ...state.user, token: payload };
      state.status = "succeeded";
    },
    [fetchRefreshToken.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export const isUserLoggedIn = (state) => state.user.user.isLoggedIn;
export const getError = (state) => state.user.error;
export const getToken = (state) => state.user.user.token;

export default userSlice.reducer;
