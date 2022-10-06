import React from "react";
import { Button } from "../../Button/Button";
import { useSelector } from "react-redux";
import "../DialogModal.scss";

const ConfirmationModal = ({ onClickCancel, onClickDelete }) => {
  const entity = useSelector((state) => state.crud.entityName);
  return (
    <div className="confirmation-container">
      <div>
        <h1 className="confirmation-title">Eliminar {entity}</h1>
        <p className="confirmation-text">
          ¿Está seguro que desea eliminar este {entity}?
        </p>
      </div>
      <div className="button-container">
        <div></div>
        <div></div>
        <Button
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
