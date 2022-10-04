import React from "react";
import { Button } from "../Button/Button";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {

  const onClickStyle = {
      
  }

  return (
    <div className="sidebar-container">
      <div className="button-mode-container">
        <Button
          label={"MODO INVENTARIO"}
          system={"inventory"}
          type={"changeMode"}
        />
      </div>

      <div className="elements-group">
        <div className="flex-ul-display">
          <div className="element-name">
            <span>ALMACEN</span>
          </div>
        </div>
        <div>
          <NavLink className="element" to="/inventory-mode/material">
            <span className="material-symbols-outlined side-bar-icon">
              category
            </span>

            <div className="element-name">
              <span>Materiales</span>
            </div>
          </NavLink>
          <NavLink className="element" to="/inventory-mode/order">
            <span className="material-symbols-outlined side-bar-icon">
              edit_document
            </span>

            <div className="element-name">
              <span>Pedidos</span>
            </div>
          </NavLink>
        </div>
      </div>
      {/* <hr /> */}
      <div className="elements-group">
        <div className="flex-ul-display">
          <div className="element-name">
            <span>AGENDA</span>
          </div>
        </div>
        <div>
          <NavLink className="element" to="/inventory-mode/client">
            <span className="material-symbols-outlined side-bar-icon">
              person
            </span>

            <div className="element-name">
              <span>Clientes</span>
            </div>
          </NavLink>
          <NavLink className="element" to="/inventory-mode/employee">
            <span className="material-symbols-outlined side-bar-icon">
              badge
            </span>

            <div className="element-name">
              <span>Empleados</span>
            </div>
          </NavLink>
          <NavLink className="element" to="/inventory-mode/product">
            <span className="material-symbols-outlined side-bar-icon">
              sell
            </span>

            <div className="element-name">
              <span>Productos</span>
            </div>
          </NavLink>
          <NavLink className="element" to="/inventory-mode/provider">
            <span className="material-symbols-outlined side-bar-icon">
              local_mall
            </span>

            <div className="element-name">
              <span>Proveedores</span>
            </div>
          </NavLink>
        </div>
      </div>

      <div className="elements-group">
        <div className="flex-ul-display">
          <div className="element-name">
            <span>REPORTES</span>
          </div>
        </div>
        <NavLink className="element" to="/inventory-mode/report">
          <span className="material-symbols-outlined side-bar-icon">
            area_chart
          </span>

          <div className="element-name">
            <span>Reportes</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
