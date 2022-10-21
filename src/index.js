//React imports
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

//React router imports
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Redux imports
import { Provider } from "react-redux";
import { store } from "./app/store";

//Components imports
import Login from "./pages/Login";
import InventoryMode from "./pages/InventoryMode/InventoryMode";
import Client from "./pages/InventoryMode/Client/Client";
import Employee from "./pages/InventoryMode/Employee/Employee";
import RawProvider from "./pages/InventoryMode/Provider/RawProvider";
import Product from "./pages/InventoryMode/Products/Product";
import PageNotFound from "./pages/PageNotFound";

//Library imports
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/inventory-mode/" element={<InventoryMode />}>
            <Route path="material" />
            <Route path="order" />
            <Route path="client" element={<Client />} />
            <Route path="employee" element={<Employee />} />
            <Route path="provider" element={<RawProvider />} />
            <Route path="product" element={<Product />} />
            <Route path="report" />
            <Route
              path="*"
              element={<Navigate to="/page-not-found" replace={true} />}
            />
          </Route>
          <Route
            path="*"
            element={<Navigate to="/page-not-found" replace={true} />}
          />
          <Route path="/page-not-found" element={<PageNotFound />} />
        </Routes>
      </Provider>
    </BrowserRouter>
    <Toaster />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
