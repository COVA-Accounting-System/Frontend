import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const expenseInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DATA_API}/accounting/expense`,
  // timeout: 10000,
  headers: { 'x-access-token': localStorage.getItem('token') }
})

const initialState = {
  data: [],
  actualExpense: {}
}

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.data = action.payload
    },
    setActualExpense: (state, action) => {
      state.actualExpense = action.payload
    },
    addExpense: (state, action) => {
      state.data.push(action.payload)
    },
    editExpense: (state, action) => {
      state.data = state.data.map(expense => {
        if (expense._id === action.payload._id) {
          expense = action.payload
        }
        return expense
      })
    }
  }
})

export const { setInitialState, addExpense, setActualExpense, editExpense } =
  expenseSlice.actions
export default expenseSlice.reducer

export const getAllExpenses = () => async dispatch => {
  try {
    const expenses = await expenseInstance.get('/')
    dispatch(setInitialState(expenses.data))
  } catch (err) {
    console.error(err)
  }
}

export const createExpense = data => async dispatch => {
  try {
    const newExpense = await expenseInstance.post('/', data)
    dispatch(addExpense(newExpense.data))
    return newExpense.status
  } catch (err) {
    console.error(err)
  }
}

export const deleteExpense = data => async dispatch => {
  try {
    const deletedExpense = await expenseInstance.put('/delete', data)
    dispatch(editExpense(deletedExpense.data))
    return deletedExpense.status
  } catch (err) {
    console.error(err)
  }
}

export const updateExpense = data => async dispatch => {
  try {
    const updatedExpense = await expenseInstance.put('/update', data)
    dispatch(editExpense(updatedExpense.data))
    return updatedExpense.status
  } catch (err) {
    console.error(err)
  }
}
