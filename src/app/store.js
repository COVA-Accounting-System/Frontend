import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "../reducers/client.reducer";
import employeeReducer from "../reducers/employee.reducer"

export const store = configureStore({
  reducer: {
    clients: clientReducer,
    employees: employeeReducer
  },
});

