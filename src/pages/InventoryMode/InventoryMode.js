import React from "react";
import "./InventoryMode.scss";
import Client from "./Client/Client";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Employee from "./Employee/Employee";
import Navbar from "../../components/NavBar/Navbar";


const InventoryMode = () => {
  return (
    <div>
      <div className="view-container">
        <div className="sidebar-container">
            <Sidebar/>
        </div>
        <div className="content-container">
          <div className="navbar-container">
            <Navbar/>
          </div>
          <div className="data-container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryMode;
