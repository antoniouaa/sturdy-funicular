import { configureStore } from "@reduxjs/toolkit";

import sequencesReducer from "../features/Sequences/sequencesSlice";
import usersReducer from "../features/Users/usersSlice";

export default configureStore({
  reducer: {
    sequences: sequencesReducer,
    users: usersReducer,
  },
});
