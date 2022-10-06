import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../reducers/employee.reducer"
import providerReducer from "../reducers/provider.reducer";
import productReducer from "../reducers/product.reducer";
import clientReducer from "../reducers/clients"
import crud from "../reducers/crud";

export const store = configureStore({
  reducer: {
    clients: clientReducer,
    employees: employeeReducer,
    providers: providerReducer,
    products: productReducer,
    crud: crud
  }
});

