import React, { useMemo, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { setInitialState } from "../../../reducers/provider.reducer";
import { getProviders } from "../../../services/provider.service";
import useLoadInitialData from "../../../hooks/useLoadInitialData";
import Table from "../../../components/Table/Table";
import { Button } from "../../../components/Button/Button";
import DataTableIcons from "../../../components/DataTableActions/DataTableIcons";
import "../styles/Template.styles.scss";

const RowProvider = () => {
  const gridRef = useRef();
  useLoadInitialData(getProviders, setInitialState);
  const providers = useSelector((state) =>
    state.providers.filter((provider) => provider.isVisible === true)
  );

  const columnDefs = useMemo(() => [
    {
      headerName: "Tienda",
      field: "storeName",
      resizable: true,
      sortable: true,
    },
    {
      headerName: "NIT",
      field: "nit",
      resizable: true,
      sortable: true,
    },
    { headerName: "Teléfono", field: "phone", resizable: true},
    { headerName: "Ciudad", field: "city", resizable: true, sortable: true },
    {
      headerName: "Pais",
      field: "country",
      resizable: true,
      sortable: false,
      // width: 120,
    },
    {
      headerName: "Direccion",
      field: "address",
      resizable: false,
      sortable: true,
    },
    {
      headerName: " ",
      resizable: false,
      cellRenderer: DataTableIcons,
      pinned: "right",
      width: 224,
      minWidth: 224
    },
  ],[]);

  const gridOptions = useMemo(() => ({
    pagination: false,
    onGridReady: (params) => {
      params.columnApi.autoSizeAllColumns();
    },
    onGridSizeChanged: (params) => {
      params.columnApi.autoSizeAllColumns();
    },
    columnDefs: columnDefs,
    cacheQuickFilter: true,
    animateRows: true,
  }), [columnDefs]);


  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  return (
    <div>
      <div className="page-container">
        <div className="elements-container">
          <h1 className="page-title">Proveedores</h1>
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
                label={"Crear proveedor"}
                type={"create"}
                system={"inventory"}
              />
            </div>
          </div>
          <div>
            <Table
              rowData={providers}
              gridRef={gridRef}
              gridOptions={gridOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RowProvider;
