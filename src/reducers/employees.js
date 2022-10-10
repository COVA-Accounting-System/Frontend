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
    editEmployee: (state, action) => {
      state.data = state.data.map((employee) => {
        if (employee._id === action.payload._id) {
          employee = action.payload;
        }
        return employee;
      });
    }
  },
});

export const { setInitialState, addEmployee, setActualEmployee, editEmployee } =
  employeeSlice.actions;
export default employeeSlice.reducer;

export const getAllEmployees = () => async (dispatch) => {
  try {
    const employees = await axios.get(API_URL);
    dispatch(setInitialState(employees.data));
  } catch (err) {
    console.error(err);
  }
};

export const createEmployee = (data) => async (dispatch) => {
  try {
    const newEmployee = await axios.post(API_URL, data);
    dispatch(addEmployee(newEmployee.data));
    return newEmployee.status
  } catch (err) {
    console.error(err);
  }
};

export const deleteEmployee = (data) => async (dispatch) => {
  try {
    const deletedEmployee = await axios.put(`${API_URL}/delete`, data);
    dispatch(editEmployee(deletedEmployee.data));
    return deletedEmployee.status
  } catch (err) {
    console.error(err);
  }
};

export const updateEmployee = (data) => async (dispatch) => {
  try {
    const updatedEmployee = await axios.put(`${API_URL}/update`, data);
    dispatch(editEmployee(updatedEmployee.data));
    return updatedEmployee.status
  } catch (err) {
    console.error(err);
  }
};
