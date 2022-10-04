import React, { useMemo, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { setInitialState } from "../../../reducers/product.reducer";
import { getProducts } from "../../../services/product.service";
import useLoadInitialData from "../../../hooks/useLoadInitialData";
import Table from "../../../components/Table/Table";
import { Button } from "../../../components/Button/Button";
import DataTableIcons from "../../../components/DataTableActions/DataTableIcons";
import "../styles/Template.styles.scss";

const Product = () => {

  const gridRef = useRef();

  useLoadInitialData(getProducts, setInitialState);
  const products = useSelector((state) =>
    state.products.filter((product) => product.isVisible === true)
  );

  const columnDefs = useMemo(() => [
    {
      headerName: "Producto",
      field: "name",
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Descripcion",
      field: "description",
      resizable: true,
      sortable: true,
    },
    // { headerName: "Fotografia", field: "photography", resizable: true },
    { headerName: "Precio por unidad", field: "unitPrice", resizable: true, sortable: true },
    {
      headerName: "Precio por docena",
      field: "dozenPrice",
      resizable: false,
      sortable: false,
      // width: 120,
    },
    {
      headerName: " ",
      resizable: false,
      cellRenderer: DataTableIcons,
      pinned: "right",
      width: 224,
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
      params.api.sizeColumnsToFit();
      // params.columnApi.autoSizeAllColumns();
    },
    onGridSizeChanged: (params) => {
      // params.columnApi.autoSizeAllColumns();
      params.api.sizeColumnsToFit();
    },
    columnDefs: columnDefs,
    cacheQuickFilter: true,
    animateRows: true
  }), [columnDefs])

  return (
    <div>
      <div className="page-container">
        <div className="elements-container">
          <h1 className="page-title">Productos</h1>
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
                label={"Crear producto"}
                type={"create"}
                system={"inventory"}
              />
            </div>
          </div>
          <div>
            <Table
              rowData={products}
              gridOptions={gridOptions}
              gridRef={gridRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
