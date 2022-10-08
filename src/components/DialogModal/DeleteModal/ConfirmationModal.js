import React from "react";
import { Button } from "../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteClient } from "../../../reducers/clients";
import { deleteEmployee } from "../../../reducers/employees";
import "../DialogModal.scss";

const ConfirmationModal = ({ onClickCancel }) => {
  const entityName = useSelector((state) => state.crud.entityName);
  const entity = useSelector((state) => state.crud.entity);
  const dispatch = useDispatch()

  const client = useSelector((state) => state.clients.actualClient);
  const employee = useSelector((state) => state.employees.actualEmployee);
  
  const onClickDelete = () => {
    switch(entity){
      case "client":
        dispatch(deleteClient(client));
        break;
      case "employee":
        dispatch(deleteEmployee(employee));
        break;
      default:
        break;
    }
      onClickCancel()
  }
  
  return (
    <div className="confirmation-container">
      <div>
        <h1 className="confirmation-title">Eliminar {entityName}</h1>
        <p className="confirmation-text">
          ¿Está seguro que desea eliminar este {entityName}?
        </p>
      </div>
      <div className="button-container">
        <Button
          className="button-cancel"
          label={"Eliminar"}
          type={"confirm-delete"}
          onClick={onClickDelete}
        />
        <Button label={"Cancelar"} type={"cancel"} onClick={onClickCancel} />
      </div>
    </div>
  );
};

export default ConfirmationModal;
