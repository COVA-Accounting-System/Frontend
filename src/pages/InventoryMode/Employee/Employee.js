import React, { useMemo, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { setInitialState } from "../../../reducers/employee.reducer";
import { getAllEmployees } from "../../../services/employee.service";
import useLoadInitialData from "../../../hooks/useLoadInitialData";
import Table from "../../../components/Table/Table";
import { Button } from "../../../components/Button/Button";
import DataTableIcons from "../../../components/DataTableActions/DataTableIcons";
import "../styles/Template.styles.scss";

const Employee = () => {
  const gridRef = useRef();
  useLoadInitialData(getAllEmployees, setInitialState);
  const employees = useSelector((state) =>
    state.employees.filter((employee) => employee.isVisible === true)
  );

  const columnDefs = useMemo(() => [
    { headerName: "Nombre", field: "name", resizable: true, sortable: true },
    {
      headerName: "Apellidos",
      field: "lastName",
      resizable: true,
      sortable: true,
    },
    {
      headerName: "CI",
      field: "ci",
      resizable: true,
      sortable: false,
      width: 120,
    },
    { headerName: "Teléfono", field: "phone", resizable: true, width: 150 },
    {
      headerName: "Fecha de inicio",
      field: "startDate",
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Fecha de nacimiento",
      field: "dateOfBirth",
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Nacionalidad",
      field: "nationality",
      resizable: false,
      sortable: true,
    },
    {
      headerName: " ",
      resizable: false,
      cellRenderer: DataTableIcons,
      pinned: "right",
      width: 224,
      minWidth: 224,
  
    },
  ],[]);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  const gridOptions = useMemo(() => ({
    pagination: false,
    onGridReady: (params) => {
      // params.api.sizeColumnsToFit();
      params.columnApi.autoSizeAllColumns();
    },
    onGridSizeChanged: (params) => {
      params.columnApi.autoSizeAllColumns();
      // params.api.sizeColumnsToFit();
    },
    columnDefs: columnDefs,
    cacheQuickFilter: true,
    animateRows: true,
  }), [columnDefs]);

  return (
    <div>
      <div className="page-container">
        <div className="elements-container">
          <h1 className="page-title">Empleados</h1>
          <div className="filter-container">
            <div className="input-container">
              <input
                className="search-input"
                type="text"
                placeholder="Buscar..."
                id="filter-text-box"
                spellCheck="false"
                onInput={onFilterTextBoxChanged}
              />
            </div>
            <div className="button-container">
              <Button
                label={"Crear empleado"}
                type={"create"}
                system={"inventory"}
              />
            </div>
          </div>
          <div>
            <Table
              rowData={employees}
              gridOptions={gridOptions}
              gridRef={gridRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
