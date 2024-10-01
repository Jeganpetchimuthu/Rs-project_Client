import { configureStore } from "@reduxjs/toolkit";
import mockReducer from "../ReduxFeature/MockSlice";

export const store = configureStore({
  reducer: {
    mockApiReducer: mockReducer,
  },
});

export default store;
