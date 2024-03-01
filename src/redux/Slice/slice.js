import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reposetoryData: [],
  loading: false,
  checkData: [],
};

export const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    repoData: (state, actions) => {
      state.reposetoryData = actions.payload;
      state.loading = false;
      state.checkData = [];
    },
    loading: (state) => {
      state.loading = true;
    },
    checkData: (state, actions) => {
      state.checkData = [...state.checkData, actions.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { repoData, loading, checkData, removeCheck } = slice.actions;

export default slice.reducer;
