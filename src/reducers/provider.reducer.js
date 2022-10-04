import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const providerSlice = createSlice({
    name: 'provider',
    initialState,
    reducers:{
        setInitialState: (state, action) => {
            return action.payload
        },
        addProvider: (state, action) => {
            state.push(action.payload);
        }
    }
});

export const {setInitialState, addProvider} = providerSlice.actions;
export default providerSlice.reducer;
