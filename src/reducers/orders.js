import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const orderInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DATA_API}/order`,
  // timeout: 10000,
  headers: { 'x-access-token': localStorage.getItem('token') }
})

const initialState = {
  data: [],
  actualOrder: {}
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.data = action.payload
    },
    setActualOrder: (state, action) => {
      state.actualOrder = action.payload
    },
    addOrder: (state, action) => {
      state.data.push(action.payload)
    },
    editOrder: (state, action) => {
      state.data = state.data.map((order) => {
        if (order._id === action.payload._id) {
          order = action.payload
        }
        return order
      })
    }
  }
})

export const { setInitialState, addOrder, setActualOrder, editOrder } =
  orderSlice.actions
export default orderSlice.reducer

export const getAllOrders = () => async (dispatch) => {
  try {
    const orders = await orderInstance.get('/')
    dispatch(setInitialState(orders.data))
  } catch (err) {
    console.error(err)
  }
}

export const createOrder = (data) => async (dispatch) => {
  try {
    const newOrder = await orderInstance.post('/', data)
    dispatch(addOrder(newOrder.data))
    return newOrder.status
  } catch (err) {
    console.error(err)
  }
}

export const deleteOrder = (data) => async (dispatch) => {
  try {
    const deletedOrder = await orderInstance.put('/delete', data)
    dispatch(editOrder(deletedOrder.data))
    return deletedOrder.status
  } catch (err) {
    console.error(err)
  }
}

export const updateOrder = (data) => async (dispatch) => {
  try {
    const updatedOrder = await orderInstance.put('/update', data)
    dispatch(editOrder(updatedOrder.data))
    return updatedOrder.status
  } catch (err) {
    console.error(err)
  }
}
