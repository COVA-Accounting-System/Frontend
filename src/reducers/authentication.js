import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogged: false,
  email: '',
  isAdminLogged: false
}

if (window.localStorage.getItem('token')) {
  initialState.isLogged = true
}

if (window.localStorage.getItem('tokenAdmin')) {
  initialState.isAdminLogged = true
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setLogged: (state, action) => {
      state.isLogged = action.payload
    },
    setAdminLogged: (state, action) => {
      state.isAdminLogged = action.payload
    }
  }
})

export const { setLogged, setAdminLogged} = authenticationSlice.actions
export default authenticationSlice.reducer
