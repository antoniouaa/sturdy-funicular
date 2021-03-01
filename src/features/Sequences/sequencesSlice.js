import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { RouteError } from "../../utils/Exceptions";

const initialState = {
  sequences: [],
  status: "idle",
  error: null,
};

export const fetchSequences = createAsyncThunk("fetchSequences", async () => {
  const response = await fetch(`${process.env.REACT_BACKEND}/seq`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return data.data.map((seq) => seq.attributes);
});

export const postSequence = createAsyncThunk(
  "postSequence",
  async (payload) => {
    const { description, species, type, sequence } = payload;
    const { token } = payload;
    const response = await fetch(`${process.env.REACT_BACKEND}/seq`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ description, species, type, sequence }),
    });
    const data = await response.json();
    if (response.status === 201) {
      return data.data.attributes;
    }
    throw new RouteError(data.errors);
  }
);

export const patchSequence = createAsyncThunk(
  "patchSequence",
  async (body) => {}
);

const sequencesSlice = createSlice({
  name: "sequences",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSequences.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchSequences.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.sequences = state.sequences.concat(action.payload);
    },
    [fetchSequences.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [postSequence.pending]: (state, action) => {
      state.status = "loading";
    },
    [postSequence.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.sequences = state.sequences.concat(action.payload);
    },
    [postSequence.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const selectAllSequences = (state) => state.sequences.sequences;

export const selectSequenceById = (state, sequenceId) =>
  state.sequences.find((seq) => seq.id === sequenceId);

export default sequencesSlice.reducer;
