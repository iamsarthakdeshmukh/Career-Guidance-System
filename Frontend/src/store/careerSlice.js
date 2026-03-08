import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  careerSuggestion: null,
  student: null,
};

const careerSlice = createSlice({
  name: "career",
  initialState,
  reducers: {
    setCareerData: (state, action) => {
      state.careerSuggestion = action.payload.careerSuggestion;
      state.student = action.payload.student;
    },
    clearCareerData: (state) => {
      state.careerSuggestion = null;
      state.student = null;
    },
  },
});

export const { setCareerData, clearCareerData } = careerSlice.actions;
export default careerSlice.reducer;
