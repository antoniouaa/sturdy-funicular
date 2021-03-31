import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { RouteError } from "../../utils/Exceptions";

export const fetchSequences = createAsyncThunk("fetchSequences", async () => {
  const response = await fetch(`/seq`, {
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
    const response = await fetch(`/seq`, {
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
  async (payload) => {
    const { description, species, type, sequence, id } = payload;
    const { token } = payload;
    const response = await fetch(`/seq/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ description, species, type, sequence }),
    });
    const data = await response.json();
    if (response.status === 200) {
      return data.data.attributes;
    }
    throw new RouteError(data.errors);
  }
);

const sequencesSlice = createSlice({
  name: "sequences",
  initialState: {
    sequences: [],
    status: "idle",
    error: null,
  },
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
    [patchSequence.pending]: (state, action) => {
      state.status = "loading";
    },
    [patchSequence.fulfilled]: (state, action) => {
      const {
        description,
        sequence,
        type,
        species,
        id,
        dna_attributes,
      } = action.payload;
      state.status = "succeeded";
      state.sequences = state.sequences.map((seq) => {
        if (seq.id === id) {
          return {
            ...seq,
            description,
            sequence,
            type,
            species,
            id,
            dna_attributes,
          };
        }
        return seq;
      });
    },
  },
});

export const selectAllSequences = (state) => state.sequences.sequences;

export const selectSequenceById = (state, sequenceId) =>
  state.sequences.find((seq) => seq.id === sequenceId);

export default sequencesSlice.reducer;
