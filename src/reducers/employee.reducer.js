import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      return action.payload;
    },
    addEmployee: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setInitialState, addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
