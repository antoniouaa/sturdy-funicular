import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  sequences: [],
  status: "idle",
  error: null,
};

export const fetchSequences = createAsyncThunk("fetchSequences", async () => {
  const response = await fetch("https://genome-sequencer.herokuapp.com/seq", {
    method: "GET",
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return data.data.map((seq) => seq.attributes);
});

const sequencesSlice = createSlice({
  name: "sequences",
  initialState,
  reducers: {
    sequenceAdded: {
      reducer(state, action) {
        state.sequences.push(action.payload);
      },
      prepare(description, species, sequence, type) {
        return {
          payload: {
            id: nanoid(),
            description,
            species,
            sequence,
            type,
          },
        };
      },
    },
    sequenceUpdated(state, action) {
      const { id, description, species, sequence, type } = action.payload;
      const existingSequence = state.sequences.sequences.find(
        (seq) => seq.id === id
      );
      if (existingSequence) {
        existingSequence.description = description;
        existingSequence.species = species;
        existingSequence.sequence = sequence;
        existingSequence.type = type;
      }
    },
  },
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
  },
});

export const selectAllSequences = (state) => state.sequences.sequences;

export const selectSequenceById = (state, sequenceId) =>
  state.sequences.sequences.find((seq) => seq.id === sequenceId);

export const { sequenceAdded, sequenceUpdated } = sequencesSlice.actions;

export default sequencesSlice.reducer;
