import React from "react";
import "./DataTableIcons.scss";

const DataTableIcons = ({ onClickDelete, onClickEdit, onClickView }) => {
  return (
    <div>
      <div className="icons-container">
        <div className="icon-container">
          <span
            className="material-symbols-outlined icon icon-visibility"
            title="Ver"
            onClick={onClickView}
          >
            visibility
          </span>
        </div>
        <div className="icon-container">
          <span
            className="material-symbols-outlined icon icon-edit"
            title="Editar"
            onClick={onClickEdit}
          >
            edit
          </span>
        </div>
        <div className="icon-container">
          <span
            id="delete"
            className="material-symbols-outlined icon icon-delete"
            title="Eliminar"
            onClick={onClickDelete}
          >
            delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default DataTableIcons;
