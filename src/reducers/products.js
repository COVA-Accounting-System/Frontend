import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4001/api/inventory/product";

const initialState = {
  data: [],
  actualProduct: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.data = action.payload;
    },
    setActualProduct: (state, action) => {
      state.actualProduct = action.payload;
    },
    addProduct: (state, action) => {
      state.data.push(action.payload);
    },
    editProduct: (state, action) => {
      state.data = state.data.map((product) => {
        if (product._id === action.payload._id) {
          product = action.payload;
        }
        return product;
      });
    }
  },
});

export const { setInitialState, addProduct, setActualProduct, editProduct } =
  productSlice.actions;
export default productSlice.reducer;

export const getAllProducts = () => async (dispatch) => {
  try {
    const products = await axios.get(API_URL);
    dispatch(setInitialState(products.data));
  } catch (err) {
    console.error(err);
  }
};

export const createProduct = (data) => async (dispatch) => {
  try {
    const newProduct = await axios.post(API_URL, data);
    dispatch(addProduct(newProduct.data));
    return newProduct.status;
  } catch (err) {
    console.error(err);
  }
};

export const deleteProduct = (data) => async (dispatch) => {
  try {
    const deletedProduct = await axios.put(`${API_URL}/delete`, data);
    dispatch(editProduct(deletedProduct.data));
    return deletedProduct.status;
  } catch (err) {
    console.error(err);
  }
};

export const updateProduct = (data) => async (dispatch) => {
  try {
    const updatedProduct = await axios.put(`${API_URL}/update`, data);
    dispatch(editProduct(updatedProduct.data));
    return updatedProduct.status;
  } catch (err) {
    console.error(err);
  }
};
