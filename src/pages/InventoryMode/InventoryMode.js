import React from "react";
import "./InventoryMode.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet, Navigate } from "react-router-dom";

const InventoryMode = () => {
  return (
    <div>
      <div className="view-container">
          <Sidebar />
        <div className="content-container">
          {/* <div className="navbar-container">
            <Navbar />
          </div> */}
          <div className="data-container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryMode;
