import { configureStore } from "@reduxjs/toolkit";

import sequencesReducer from "../features/Sequences/sequencesSlice";
import usersReducer from "../features/Users/userSlice";

export default configureStore({
  reducer: {
    sequences: sequencesReducer,
    user: usersReducer,
  },
});
