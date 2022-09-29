import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Employee from './pages/InventoryMode/Employee/Employee'
import { store } from "./app/store";
import { Provider } from "react-redux";
import InventoryMode from "./pages/InventoryMode/InventoryMode";
import Client from "./pages/InventoryMode/Client/Client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <Routes>
          <Route path="/inventory-mode/" element={<InventoryMode />}>
              <Route path="client" element={<Client />} />
              <Route path="employee" element={<Employee />} />
          </Route>
          <Route path="/employee" element={<Employee />} />
        </Routes>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
