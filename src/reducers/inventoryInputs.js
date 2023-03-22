import { createSlice } from '@reduxjs/toolkit'

import axios from 'axios'
import * as toast from '../services/toastService'

export const inventoryInputInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DATA_API}/inventory/inventory_input`,
  // timeout: 1000,
  headers: { 'x-access-token': localStorage.getItem('token') }
})

const initialState = {
  data: [],
  actualInventoryInput: {}
}

const inventoryInputSlice = createSlice({
  name: 'inventoryInput',
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.data = action.payload
    },
    setActualInventoryInput: (state, action) => {
      state.actualInventoryInput = action.payload
    },
    addInventoryInput: (state, action) => {
      state.data.push(action.payload)
    },
    editInventoryInput: (state, action) => {
      state.data = state.data.map(order => {
        if (order._id === action.payload._id) {
          order = action.payload
        }
        return order
      })
    }
  }
})

export const { setInitialState, addInventoryInput, setActualInventoryInput, editInventoryInput } =
  inventoryInputSlice.actions
export default inventoryInputSlice.reducer

export const getAllInventoryInputs = () => async dispatch => {
  try {
    const inventoryInputs = await inventoryInputInstance.get('/')
    dispatch(setInitialState(inventoryInputs.data))
  } catch (err) {
    console.error(err)
  }
}

export const createInventoryInput = data => async dispatch => {
  try {
    const newInventoryInput = await inventoryInputInstance.post('/', data)
    dispatch(addInventoryInput(newInventoryInput.data))
    toast.invetorySuccess('Entrada de inventario creada con éxito')
    return newInventoryInput
  } catch (err) {
    toast.inventoryError('Error al registrar entrada de inventario')
    console.error(err)
  }
}

export const deleteInventoryInput = data => async dispatch => {
  try {
    const deletedInventoryInput = await inventoryInputInstance.put('/delete', data)
    dispatch(editInventoryInput(deletedInventoryInput.data))
    return deletedInventoryInput.status
  } catch (err) {
    console.error(err)
  }
}

export const updateInventoryInput = data => async dispatch => {
  try {
    const updatedInventoryInput = await inventoryInputInstance.put('/update', data)
    dispatch(editInventoryInput(updatedInventoryInput.data))
    return updatedInventoryInput.status
  } catch (err) {
    console.error(err)
  }
}

