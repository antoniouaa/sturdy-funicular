import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { RouteError } from "../../utils/Exceptions";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  const response = await fetch("http://127.0.0.1:5000/user", {
    method: "GET",
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return data.data.map(({ attributes }) => {
    return { ...attributes, loggedIn: false };
  });
});

export const signUpUser = createAsyncThunk(
  "signUpUser",
  async ({ username, password }) => {
    const response = await fetch("http://127.0.0.1:5000/user/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.status === 201) {
      return { ...data.data.attributes, loggedIn: false };
    }
    throw new RouteError(data.errors);
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ username, password }) => {
    const response = await fetch("http://127.0.0.1:5000/user/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return { ...data.data.attributes, token: data.token, loggedIn: true };
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllUsers.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.users = state.users.concat(action.payload);
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [signUpUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.users = state.users.concat(action.payload);
    },
    [signUpUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const selectAllUsers = (state) => state.users.users;

export const selectUserByUsername = (state, username) =>
  state.users.find((user) => user.username === username);

export default usersSlice.reducer;
