import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const configInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DATA_API}/config`,
  // timeout: 10000,
  headers: { 'x-access-token': localStorage.getItem('token') }
})

const initialState = {
  config: {
    orderNumber: 0,
    inventoryInputNumber: 0,
    inventoryOutputNumber: 0,
    incomeNumber: 0,
    expenseNumber: 0
  }
}

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.config = action.payload
    },
    addOneToOrders: (state, action) => {
      state.config = {
        ...state.config,
        orderNumber: state.config.orderNumber + 1
      }
    },
    addOneToInventoryInput: (state, action) => {
      state.config = {
        ...state.config,
        inventoryInputNumber: state.config.inventoryInputNumber + 1
      }
    },
    addOneToInventoryOutput: (state, action) => {
      state.config = {
        ...state.config,
        inventoryOutputNumber: state.config.inventoryOutputNumber + 1
      }
    },
    addOneToIncome: (state, action) => {
      state.config = {
        ...state.config,
        incomeNumber: state.config.incomeNumber + 1
      }
    },
    addOneToExpense: (state, action) => {
      state.config = {
        ...state.config,
        expenseNumber: state.config.expenseNumber + 1
      }
    }
  }
})

export const {
  setInitialState,
  addOneToOrders,
  addOneToInventoryInput,
  addOneToInventoryOutput,
  addOneToIncome,
  addOneToExpense
} = configSlice.actions
export default configSlice.reducer

export const getConfig = () => async dispatch => {
  try {
    const config = await configInstance.get('/getAccountConfig')
    dispatch(setInitialState(config.data))
  } catch (err) {
    console.error(err)
  }
}

export const addOneToOrdersReducer = () => async dispatch => {
  dispatch(addOneToOrders())
}

export const addOneToInventoryInputReducer = () => async dispatch => {
  dispatch(addOneToInventoryInput())
}

export const addOneToInventoryOutputReducer = () => async dispatch => {
  dispatch(addOneToInventoryOutput())
}

export const addOneToIncomeReducer = () => async dispatch => {
  dispatch(addOneToIncome())
}

export const addOneToExpenseReducer = () => async dispatch => {
  dispatch(addOneToExpense())
}
