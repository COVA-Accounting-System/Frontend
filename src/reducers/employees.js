import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4001/api/inventory/employee";

const initialState = {
  data: [],
  actualEmployee: {},
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.data = action.payload;
    },
    setActualEmployee: (state, action) => {
      state.actualEmployee = action.payload;
    },
    addEmployee: (state, action) => {
      state.data.push(action.payload);
    },
    removeEmployee: (state, action) => {
      state.data = state.data.map((employee) => {
        if (employee._id === action.payload._id) {
          employee.isVisible = false;
        }
        return employee;
      });
    },
  },
});

export const { setInitialState, addEmployee, setActualEmployee, removeEmployee } =
  employeeSlice.actions;
export default employeeSlice.reducer;

export const getAllEmployees = () => async (dispatch) => {
  try {
    const data = await axios.get(API_URL);
    dispatch(setInitialState(data.data));
  } catch (err) {
    console.error(err);
  }
};

export const createEmployee = (data) => async (dispatch) => {
  try {
    await axios.post(API_URL, data);
    dispatch(getAllEmployees());
  } catch (err) {
    console.error(err);
  }
};

export const deleteEmployee = (data) => async (dispatch) => {
  try {
    await axios.put(`${API_URL}/delete`, data);
    dispatch(removeEmployee(data));
  } catch (err) {
    console.error(err);
  }
};

export const updateEmployee = (data) => async (dispatch) => {
  try {
    await axios.put(`${API_URL}/update`, data);
    dispatch(getAllEmployees());
  } catch (err) {
    console.error(err);
  }
};
