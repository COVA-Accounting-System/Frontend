import React from "react";
import { useSelector } from "react-redux";
import "../DialogModal.scss";

const ViewForm = () => {
  const client = useSelector((status) => status.clients.actualClient);
  const entity = useSelector((status) => status.crud.entityName);
 
  return (
    <div className="view-form">
      <h1 className="title-container"> Ver {entity}</h1>
      <hr className="view-hr" />
      <div className="data-container">
        <div className="row-data-container">
          <p className="row-data">
            {/* <strong>Nombre: </strong> */}
            {client.name} {client.lastName}
          </p>
        </div>
        <div className="row-data-container">
          
          <p className="row-data">
            {/* <strong>Telfono: </strong>  */}
            {client.phone} </p>
        </div>
        <div className="row-data-container">
          <p className="row-data">
            <strong>Deuda:  </strong>
            {client.inDebt}
          </p>
        </div>
      </div>
      <div className="form-footer"></div>
    </div>
  );
};

export default ViewForm;
