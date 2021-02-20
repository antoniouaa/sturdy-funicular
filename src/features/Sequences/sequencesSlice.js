import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: nanoid(),
    description: "Human protein 1",
    species: "Homo sapiens",
    sequence: "ACGT",
    type: "PROTEIN_FULL",
  },
  {
    id: nanoid(),
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
    sequenceUpdated(state, action) {
      const { id, description, species, sequence, type } = action.payload;
      const existingSequence = state.find((seq) => seq.id === id);
      if (existingSequence) {
        existingSequence.description = description;
        existingSequence.species = species;
        existingSequence.sequence = sequence;
        existingSequence.type = type;
      }
    },
  },
});

export const { sequenceAdded, sequenceUpdated } = sequencesSlice.actions;

export default sequencesSlice.reducer;
