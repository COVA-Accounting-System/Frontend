import React from "react";
import { Button } from "../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteClient } from "../../../reducers/clients";
import "../DialogModal.scss";

const ConfirmationModal = ({ onClickCancel }) => {
  const entity = useSelector((state) => state.crud.entityName);
  const dispatch = useDispatch()

  const client = useSelector((state) => state.clients.actualClient);
  
  const onClickDelete = () => {
      dispatch(deleteClient(client))
      onClickCancel()
  }
  
  return (
    <div className="confirmation-container">
      <div>
        <h1 className="confirmation-title">Eliminar {entity}</h1>
        <p className="confirmation-text">
          ¿Está seguro que desea eliminar este {entity}?
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
