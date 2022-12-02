import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from '../reducers/employees'
import providerReducer from '../reducers/providers'
import productReducer from '../reducers/products'
import clientReducer from '../reducers/clients'
import crud from '../reducers/crud'
import authentication from '../reducers/authentication'
import orderReducer from '../reducers/orders'

export const store = configureStore({
  reducer: {
    clients: clientReducer,
    employees: employeeReducer,
    providers: providerReducer,
    products: productReducer,
    crud,
    authentication,
    orders: orderReducer
  }
})
