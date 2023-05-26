import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import './Table.scss'

const Table = ({
  rowData,
  gridOptions,
  gridRef,
  doesExternalFilterPass
}) => {
  return (
    <div className='ag-theme-alpine data-table-container'>
      <AgGridReact
        ref={gridRef}
        overlayNoRowsTemplate={'Cargando datos...'}      
        doesExternalFilterPass={doesExternalFilterPass}
        rowData={rowData}
        suppressRowTransform
        gridOptions={gridOptions}
      />
    </div>
  )
}

export default Table

