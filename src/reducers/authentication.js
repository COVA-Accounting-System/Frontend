import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogged: false,
  email: ''
}

if (window.localStorage.getItem('token')) {
  initialState.isLogged = true
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setLogged: (state, action) => {
      state.isLogged = action.payload
    }
  }
})

export const { setLogged } = authenticationSlice.actions
export default authenticationSlice.reducer
