import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "./Table.scss"
import { useState } from "react";
import { localeEs } from "../../assets/locale.es";

const Table = ({ rowData, columnDefs, animatedRows = true, columnSize = 'sizeOnFit', gridRef}) => {
  
  const [sizeConfig, setSizeConfig] = useState({
    sizeOnFit: () => {
      gridRef.current.api.sizeColumnsToFit();
    },
    autoSizeColumns: () => {
      const allColumnIds = [];
      gridRef.current.columnApi.getColumns().forEach((column) => {
        allColumnIds.push(column.getId());
      });
      gridRef.current.columnApi.autoSizeColumns(allColumnIds, true);
    }
  })

  // const gridOptions = {
  //     pagination: true,
  //     paginationPageSize: 9,
  //     localeTextFunc: (key, defaultValue) => localeEs[key] || defaultValue
  // }




  return (
      <div className="ag-theme-alpine data-table-container">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          animatedRows={animatedRows}
          onFirstDataRendered={sizeConfig[columnSize]}
          cacheQuickFilter={true}
          
          
          // gridOptions={gridOptions}
        />
      </div>
  );
};

export default Table;
