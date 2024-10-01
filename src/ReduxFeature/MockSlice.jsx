import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [], isLoading: false };

const mockSlice = createSlice({
  name: "mock",
  initialState,
  reducers: {
    loading: (state) => {
      state.isLoading = true;
    },
    fetchData: (state, action) => {
      state.value = action.payload;
      state.isLoading = false;
    },

    createEmpoyees: (state, action) => {
      state.value.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const index = state.value.findIndex(
        (employee) => employee._id === action.payload._id
      );
      if (index !== -1) {
        state.value[index] = action.payload;
      }
    },
    deleteEmployee: (state, action) => {
      state.value = state.value.filter(
        (employee) => employee._id !== action.payload
      );
    },
  },
});

export const {
  loading,
  fetchData,
  getData,
  createEmpoyees,
  updateEmployee,
  deleteEmployee,
} = mockSlice.actions;
export default mockSlice.reducer;
