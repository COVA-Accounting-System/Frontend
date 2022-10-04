import React from "react";
import { Button } from "../Button/Button";
import "./DialogModal.scss";

const ConfirmationModal = ({ identity, onClickCancel, onConfirmAction }) => {
  return (
    <div className="confirmation-container">
      <div>
        <h1 className="confirmation-title">Eliminar {identity}</h1>
        <p className="confirmation-text">
          ¿Está seguro que desea eliminar este {identity}?
        </p>
      </div>
      <div className="button-container">
        <div></div>
        <div></div>
        <Button
          label={"Eliminar"}
          type={"confirm-delete"}
          onClick={onConfirmAction}
        />
        <Button label={"Cancelar"} type={"cancel"} onClick={onClickCancel} />
      </div>
    </div>
  );
};

export default ConfirmationModal;
