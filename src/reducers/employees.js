import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const employeeInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DATA_API}/contact/employee`,
  // timeout: 10000,
  headers: { 'x-access-token': localStorage.getItem('token') }
})

const initialState = {
  data: [],
  actualEmployee: {}
}

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.data = action.payload
    },
    setActualEmployee: (state, action) => {
      state.actualEmployee = action.payload
    },
    addEmployee: (state, action) => {
      state.data.push(action.payload)
    },
    editEmployee: (state, action) => {
      state.data = state.data.map((employee) => {
        if (employee._id === action.payload._id) {
          employee = action.payload
        }
        return employee
      })
    }
  }
})

export const { setInitialState, addEmployee, setActualEmployee, editEmployee } =
  employeeSlice.actions
export default employeeSlice.reducer

export const getAllEmployees = () => async (dispatch) => {
  try {
    const employees = await employeeInstance.get('/')
    dispatch(setInitialState(employees.data))
  } catch (err) {
    console.error(err)
  }
}

export const createEmployee = (data) => async (dispatch) => {
  try {
    const newEmployee = await employeeInstance.post('/', data)
    dispatch(addEmployee(newEmployee.data))
    return newEmployee.status
  } catch (err) {
    console.error(err)
  }
}

export const deleteEmployee = (data) => async (dispatch) => {
  try {
    const deletedEmployee = await employeeInstance.put('/delete', data)
    dispatch(editEmployee(deletedEmployee.data))
    return deletedEmployee.status
  } catch (err) {
    console.error(err)
  }
}

export const updateEmployee = (data) => async (dispatch) => {
  try {
    const updatedEmployee = await employeeInstance.put('/update', data)
    dispatch(editEmployee(updatedEmployee.data))
    return updatedEmployee.status
  } catch (err) {
    console.error(err)
  }
}
