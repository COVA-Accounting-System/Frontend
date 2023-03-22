import { createSlice } from '@reduxjs/toolkit'

import axios from 'axios'
import * as toast from '../services/toastService'

export const inventoryOutputInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DATA_API}/inventory/inventory_output`,
  // timeout: 1000,
  headers: { 'x-access-token': localStorage.getItem('token') }
})

const initialState = {
  data: [],
  actualInventoryOutput: {}
}

const inventoryOutputSlice = createSlice({
  name: 'inventoryOutput',
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.data = action.payload
    },
    setActualInventoryOutput: (state, action) => {
      state.actualInventoryOutput = action.payload
    },
    addInventoryOutput: (state, action) => {
      state.data.push(action.payload)
    },
    editInventoryOutput: (state, action) => {
      state.data = state.data.map(order => {
        if (order._id === action.payload._id) {
          order = action.payload
        }
        return order
      })
    }
  }
})

export const { setInitialState, addInventoryOutput, setActualInventoryOutput, editInventoryOutput } =
  inventoryOutputSlice.actions
export default inventoryOutputSlice.reducer

export const getAllInventoryOutputs = () => async dispatch => {
  try {
    const inventoryOutputs = await inventoryOutputInstance.get('/')
    dispatch(setInitialState(inventoryOutputs.data))
  } catch (err) {
    console.error(err)
  }
}

export const createInventoryOutput = data => async dispatch => {
  try {
    const newInventoryOutput = await inventoryOutputInstance.post('/', data)
    dispatch(addInventoryOutput(newInventoryOutput.data))
    // toast.invetorySuccess('Entrada de inventario creada con éxito')
    return newInventoryOutput
  } catch (err) {
    // toast.inventoryError('Error al registrar entrada de inventario')
    console.error(err)
  }
}

export const deleteInventoryOutput = data => async dispatch => {
  try {
    const deletedInventoryOutput = await inventoryOutputInstance.put('/delete', data)
    dispatch(editInventoryOutput(deletedInventoryOutput.data))
    return deletedInventoryOutput.status
  } catch (err) {
    console.error(err)
  }
}

export const updateInventoryOutput = data => async dispatch => {
  try {
    const updatedInventoryOutput = await inventoryOutputInstance.put('/update', data)
    dispatch(editInventoryOutput(updatedInventoryOutput.data))
    return updatedInventoryOutput.status
  } catch (err) {
    console.error(err)
  }
}

