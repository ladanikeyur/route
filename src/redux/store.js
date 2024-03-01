import { configureStore } from "@reduxjs/toolkit";
import slice from "../redux/Slice/slice";

export const store = configureStore({
  reducer: {
    slice: slice,
  },
});
