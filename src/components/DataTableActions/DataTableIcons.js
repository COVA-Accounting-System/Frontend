import React from "react";
import "./DataTableIcons.scss";

const DataTableIcons = () => {
  return (
    <div>
      <div className="icons-container">
        <div className="icon-container">
            <span className="material-symbols-outlined icon icon-visibility">
                visibility
            </span>
        </div>
        <div className="icon-container">
          <span className="material-symbols-outlined icon icon-edit">edit</span>
        </div>
        <div className="icon-container">
          <span className="material-symbols-outlined icon icon-delete">delete</span>
        </div>
      </div>
    </div>
  );
};

export default DataTableIcons;
