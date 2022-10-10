import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";
import Table from "../../../components/Table/Table";
import {
  getAllProviders,
  setActualProvider,
} from "../../../reducers/providers";
import { changeAction, changeEntity } from "../../../reducers/crud";
import { Button } from "../../../components/Button/Button";
import DataTableIcons from "../../../components/DataTableActions/DataTableIcons";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Template.styles.scss";
import ModalContainer from "../../../components/DialogModal/ModalContainer";
import toast, { Toaster } from "react-hot-toast";

const RawProvider = () => {
  const dispatch = useDispatch();
  const gridRef = useRef();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const providers = useSelector((state) =>
    state.providers.data.filter((param) => param.isVisible === true)
  );

  useEffect(() => {
    dispatch(getAllProviders());
    dispatch(changeEntity({ entity: "provider", entityName: "proveedor" }));
  }, [dispatch, providers]);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Tienda",
        field: "storeName",
        resizable: true,
        sortable: true,
        minWidth: 110,
        width: 250,
        maxWidth: 300,
      },
      {
        headerName: "NIT",
        field: "nit",
        resizable: true,
        sortable: true,
        minWidth: 100,
        width: 130,
        maxWidth: 160,
      },
      {
        headerName: "Teléfono",
        field: "phone",
        resizable: true,
        minWidth: 120,
        width: 147,
        maxWidth: 177,
      },
      {
        headerName: "Ciudad",
        field: "city",
        resizable: true,
        sortable: true,
        minWidth: 120,
        width: 150,
        maxWidth: 180,
      },
      {
        headerName: "Pais",
        field: "country",
        resizable: true,
        sortable: true,
        width: 150,
        minWidth: 100,
        maxWidth: 180,
      },
      {
        headerName: "Direccion",
        field: "address",
        resizable: false,
        sortable: true,
        minWidth: 130,
        width: 270,
        maxWidth: 320,
      },
      {
        headerName: " ",
        resizable: false,
        pinned: "right",
        minWidth: 224,
        cellRenderer: DataTableIcons,
        colId: "Actions",
        cellRendererParams: {
          openModal: () => {
            setModalIsOpen(true);
          },
          setData: (data) => {
            dispatch(setActualProvider(data));
          },
          dispatchAction: (action) => {
            dispatch(changeAction(action));
          },
        },
      },
    ],
    []
  );

  const gridOptions = useMemo(
    () => ({
      pagination: false,
      onGridReady: (params) => {
        // params.columnApi.autoSizeAllColumns();
      },
      onGridSizeChanged: (params) => {
        // params.columnApi.autoSizeAllColumns();
      },
      columnDefs: columnDefs,
      cacheQuickFilter: true,
      animateRows: true,
    }),
    [columnDefs]
  );

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
                onClick={() => {
                  setModalIsOpen(true);
                  dispatch(changeAction("create"));
                }}
              />
            </div>
          </div>
          <div>
            <Table
              gridRef={gridRef}
              gridOptions={gridOptions}
              rowData={providers}
            />
          </div>
        </div>
      </div>
      <ModalContainer
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default RawProvider;
