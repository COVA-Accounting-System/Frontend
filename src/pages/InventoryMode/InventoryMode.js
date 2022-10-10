import React from "react";
import "./InventoryMode.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import { Toaster } from "react-hot-toast";


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
      <Toaster />
    </div>
  );
};

export default InventoryMode;
