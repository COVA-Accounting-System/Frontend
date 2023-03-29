import { createSlice } from '@reduxjs/toolkit'

import axios from 'axios'

export const incomeInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DATA_API}/accounting/income`,
  // timeout: 1000,
  headers: { 'x-access-token': localStorage.getItem('token') }
})

const initialState = {
  data: [],
  actualIncome: {}
}

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.data = action.payload
    },
    setActualIncome: (state, action) => {
      state.actualIncome = action.payload
    },
    addIncome: (state, action) => {
      state.data.push(action.payload)
    },
    editIncome: (state, action) => {
      state.data = state.data.map(order => {
        if (order._id === action.payload._id) {
          order = action.payload
        }
        return order
      })
    }
  }
})

export const { setInitialState, addIncome, setActualIncome, editIncome } =
  incomeSlice.actions
export default incomeSlice.reducer

export const getAllIncomes = () => async dispatch => {
  try {
    const incomes = await incomeInstance.get('/')
    dispatch(setInitialState(incomes.data))
  } catch (err) {
    console.error(err)
  }
}

export const createIncome = data => async dispatch => {
  try {
    const newIncome = await incomeInstance.post(
      '/createAndRegisterInOrder',
      data
    )
    dispatch(addIncome(newIncome.data))
    return newIncome.status
  } catch (err) {
    console.error(err)
  }
}

export const deleteIncome = data => async dispatch => {
  try {
    const deletedIncome = await incomeInstance.put(
      '/deleteAndRemoveFromOrder',
      data
    )
    dispatch(editIncome({ ...deletedIncome.data, isVisible: false }))
    return deletedIncome.status
  } catch (err) {
    console.error(err)
  }
}

export const updateIncome = data => async dispatch => {
  try {
    const updatedIncome = await incomeInstance.put('/updateAndUpdateOrder', data)
    dispatch(editIncome(updatedIncome.data))
    return updatedIncome.status
  } catch (err) {
    console.error(err)
  }
}
