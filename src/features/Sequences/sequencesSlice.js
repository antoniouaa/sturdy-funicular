import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    description: "Human protein 1",
    species: "Homo sapiens",
    sequence: "ACGT",
    type: "PROTEIN_FULL",
  },
  {
    id: "2",
    description: "Canine RNA 1",
    species: "Canis lupus",
    sequence: "TGCA",
    type: "RNA",
  },
];

const sequencesSlice = createSlice({
  name: "sequences",
  initialState,
  reducers: {
    sequenceAdded(state, action) {
      state.push(action.payload);
    },
  },
});

export const { sequenceAdded } = sequencesSlice.actions;

export default sequencesSlice.reducer;
