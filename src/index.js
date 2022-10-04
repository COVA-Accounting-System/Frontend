//React imports
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

//React router imports
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Redux imports
import { Provider } from "react-redux";
import { store } from "./app/store";

//Components imports
import InventoryMode from "./pages/InventoryMode/InventoryMode";
import Client from "./pages/InventoryMode/Client/Client";
import Employee from './pages/InventoryMode/Employee/Employee'
import RawProvider from "./pages/InventoryMode/Provider/RawProvider";
import Product from "./pages/InventoryMode/Products/Product";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <Routes>
          <Route path="/inventory-mode/" element={<InventoryMode />}>
              <Route path="material"/>
              <Route path="order" />
              <Route path="client" element={<Client />} />
              <Route path="employee" element={<Employee />} />
              <Route path="provider" element={<RawProvider />} />
              <Route path="product" element={<Product />} />
              <Route path="report"/>
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
