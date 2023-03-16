import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const rawMaterialInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DATA_API}/inventory/raw_material`,
  // timeout: 10000,
  headers: { 'x-access-token': localStorage.getItem('token') }
})

const initialState = {
  data: [],
  actualRawMaterial: {}
}

const rawMaterialSlice = createSlice({
  name: 'rawMaterial',
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.data = action.payload
    },
    setActualRawMaterial: (state, action) => {
      state.actualRawMaterial = action.payload
    },
    addRawMaterial: (state, action) => {
      state.data.push(action.payload)
    },
    editRawMaterial: (state, action) => {
      state.data = state.data.map(rawMaterial => {
        if (rawMaterial._id === action.payload._id) {
            rawMaterial = action.payload
        }
        return rawMaterial
      })
    }
  }
})

export const {
  setInitialState,
  addRawMaterial,
  setActualRawMaterial,
  editRawMaterial
} = rawMaterialSlice.actions

export default rawMaterialSlice.reducer

//http calls
export const getAllRawMaterials = () => async dispatch => {
  try {
    const rawMaterials = await rawMaterialInstance.get('/')
    dispatch(setInitialState(rawMaterials.data))
  } catch (err) {
    console.error(err)
  }
}

export const createRawMaterial = data => async dispatch => {
  try {
    const newRawMaterial = await rawMaterialInstance.post('/', data)
    dispatch(addRawMaterial(newRawMaterial.data))
    return newRawMaterial.status
  } catch (err) {
    console.error(err)
  }
}

export const deleteRawMaterial = data => async dispatch => {
  try {
    const deletedRawMaterial = await rawMaterialInstance.put('/delete', data)
    dispatch(editRawMaterial(deletedRawMaterial.data))
    return deletedRawMaterial.status
  } catch (err) {
    console.error(err)
  }
}

export const updatedRawMaterial = data => async dispatch => {
  try {
    const updatedRawMaterial = await rawMaterialInstance.put('/update', data)
    dispatch(editRawMaterial(updatedRawMaterial.data))
    return updatedRawMaterial.status
  } catch (err) {
    console.error(err)
  }
}
