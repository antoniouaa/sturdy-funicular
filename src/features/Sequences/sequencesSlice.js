import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = "";
const initialState = {
  sequences: [],
  status: "idle",
  error: null,
};

export const fetchSequences = createAsyncThunk("fetchSequences", async () => {
  const response = await fetch("http://127.0.0.1:5000/seq", {
    method: "GET",
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return data.data.map((seq) => seq.attributes);
});

export const postSequence = createAsyncThunk("postSequence", async (body) => {
  const response = await fetch("http://127.0.0.1:5000/seq", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log("data:", data);
  return data.data.attributes;
});

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

export const { sequenceAdded, sequenceUpdated } = sequencesSlice.actions;

export default sequencesSlice.reducer;
