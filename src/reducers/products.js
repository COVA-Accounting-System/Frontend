import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const productInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DATA_API}/product`,
  // timeout: 10000,
  headers: { 'x-access-token': localStorage.getItem('token') }
})

const initialState = {
  data: [],
  actualProduct: {}
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.data = action.payload
    },
    setActualProduct: (state, action) => {
      state.actualProduct = action.payload
    },
    addProduct: (state, action) => {
      state.data.push(action.payload)
    },
    editProduct: (state, action) => {
      state.data = state.data.map(product => {
        if (product._id === action.payload._id) {
          product = action.payload
        }
        return product
      })
    }
  }
})

export const { setInitialState, addProduct, setActualProduct, editProduct } =
  productSlice.actions
export default productSlice.reducer

export const getAllProducts = () => async dispatch => {
  try {
    const products = await productInstance.get('/')
    dispatch(setInitialState(products.data))
  } catch (err) {
    console.error(err)
  }
}

export const createProduct = data => async dispatch => {
  try {
    const newProduct = await productInstance.post('/', data)
    dispatch(addProduct(newProduct.data))
    return newProduct.status
  } catch (err) {
    console.error(err)
  }
}

export const deleteProduct = data => async dispatch => {
  try {
    const deletedProduct = await productInstance.put('/delete', data)
    dispatch(editProduct(deletedProduct.data))
    return deletedProduct.status
  } catch (err) {
    console.error(err)
  }
}

export const updateProduct = data => async dispatch => {
  try {
    const updatedProduct = await productInstance.put('/update', data)
    dispatch(editProduct(updatedProduct.data))
    return updatedProduct.status
  } catch (err) {
    console.error(err)
  }
}
