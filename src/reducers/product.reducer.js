import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const productSlice = createSlice({
    name: ' product',
    initialState,
    reducers: {
        setInitialState: (state, action) => {
            return action.payload;
        },
        addProduct: (state, action) => {
            state.push(action.payload);
        }
    }
});

export const {setInitialState, addProduct} = productSlice.actions;
export default productSlice.reducer;