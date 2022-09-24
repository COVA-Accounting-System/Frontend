import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setInitialState: (state, action) =>{
        return action.payload   
    },
    addClient: (state, action) => {
      state.push(action.payload);
    }
}
});

export const { setInitialState, addClient } = clientSlice.actions;
export default clientSlice.reducer;