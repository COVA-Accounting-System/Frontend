import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const providerInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DATA_API}/contact/provider`,
  // timeout: 10000,
  headers: { 'x-access-token': localStorage.getItem('token') }
})

const initialState = {
  data: [],
  actualProvider: {}
}

const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.data = action.payload
    },
    setActualProvider: (state, action) => {
      state.actualProvider = action.payload
    },
    addProvider: (state, action) => {
      state.data.push(action.payload)
    },
    editProvider: (state, action) => {
      state.data = state.data.map((provider) => {
        if (provider._id === action.payload._id) {
          provider = action.payload
        }
        return provider
      })
    }
  }
})

export const { setInitialState, addProvider, setActualProvider, editProvider } =
  providerSlice.actions
export default providerSlice.reducer

export const getAllProviders = () => async (dispatch) => {
  try {
    const providers = await providerInstance.get('/')
    dispatch(setInitialState(providers.data))
  } catch (err) {
    console.error(err)
  }
}

export const createProvider = (data) => async (dispatch) => {
  try {
    const newProvider = await providerInstance.post('/', data)
    dispatch(addProvider(newProvider.data))
    return newProvider.status
  } catch (err) {
    console.error(err)
  }
}

export const deleteProvider = (data) => async (dispatch) => {
  try {
    const deletedProvider = await providerInstance.put('/delete', data)
    dispatch(editProvider(deletedProvider.data))
    return deletedProvider.status
  } catch (err) {
    console.error(err)
  }
}

export const updateProvider = (data) => async (dispatch) => {
  try {
    const updatedProvider = await providerInstance.put('/update', data)
    dispatch(editProvider(updatedProvider.data))
    return updatedProvider.status
  } catch (err) {
    console.error(err)
  }
}
