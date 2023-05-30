import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const clientInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DATA_API}/contact/client`,
  headers: { 'x-access-token': localStorage.getItem('token') }
})

const initialState = {
  data: [],
  actualClient: {}
}

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.data = action.payload
    },
    setActualClient: (state, action) => {
      state.actualClient = action.payload
    },
    addClient: (state, action) => {
      state.data.push(action.payload)
    },
    editClient: (state, action) => {
      state.data = state.data.map(client => {
        if (client._id === action.payload._id) {
          client = action.payload
        }
        return client
      })
    }
  }
})

export const { setInitialState, addClient, setActualClient, editClient } =
  clientSlice.actions
export default clientSlice.reducer

export const getAllClients = () => async dispatch => {
  try {
    const clients = await clientInstance.get('/')
    dispatch(setInitialState(clients.data))
  } catch (err) {
    console.error(err)
  }
}

export const createClient = data => async dispatch => {
  try {
    const newClient = await clientInstance.post('/', data)
    dispatch(addClient(newClient.data))
    return newClient.status
  } catch (err) {
    console.error(err)
  }
}

export const deleteClient = data => async dispatch => {
  try {
    const deletedClient = await clientInstance.put('/delete', data)
    dispatch(editClient(deletedClient.data))
    return deletedClient.status
  } catch (err) {
    console.error(err)
  }
}

export const updateClient = data => async dispatch => {
  try {
    const updatedClient = await clientInstance.put('/update', data)
    dispatch(editClient(updatedClient.data))
    return updatedClient.status
  } catch (err) {
    console.error(err)
  }
}
