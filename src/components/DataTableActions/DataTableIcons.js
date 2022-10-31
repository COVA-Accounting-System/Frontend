import React from "react";
import "./DataTableIcons.scss";

const DataTableIcons = (props) => {
  const { data, openModal, dispatchAction, setData } = props;

  const onClickDelete = () => {
    dispatchAction("delete");
    setData(data);
    openModal();
  };

  const onClickEdit = () => {
    dispatchAction("edit");
    setData(data);
    openModal();
  };

  return (
    <div>
      <div className="icons-container">
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
