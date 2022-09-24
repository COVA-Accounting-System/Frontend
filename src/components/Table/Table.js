import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { useRef } from "react";

const Table = ({ rowData, columnDefs, animatedRows = true }) => {
  const gridRef = useRef();
  return (
    <div>
      <div className="ag-theme-alpine" style={{width: 1000, height: 500}}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          animatedRows={animatedRows}
        />
      </div>
    </div>
  );
};

export default Table;
