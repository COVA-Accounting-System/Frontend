import React from "react";
import "./InventoryMode.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";

import { useSelector } from "react-redux";

const InventoryMode = () => {
  const isLogged = useSelector((state) => {
    return state.authentication.isLogged;
  });
  return (
    <div>
      {isLogged ? (
        <div className="view-container">
          <div className="sidebar-container">
            <Sidebar />
          </div>
          <div className="content-container">
            <div className="navbar-container">
              <Navbar />
            </div>
            <div className="data-container">
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <Navigate to={"/login"} replace={true} />
      )}
    </div>
  );
};

export default InventoryMode;
