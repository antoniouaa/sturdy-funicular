import { configureStore } from "@reduxjs/toolkit";

import sequencesReducer from "../features/Sequences/sequencesSlice";

export default configureStore({
  reducer: {
    sequences: sequencesReducer,
  },
});
