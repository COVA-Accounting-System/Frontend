import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";
import Table from "../../../components/Table/Table";
import { getAllClients, deleteClient } from "../../../reducers/clients";
import { Button } from "../../../components/Button/Button";
import DataTableIcons from "../../../components/DataTableActions/DataTableIcons";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Template.styles.scss";
import ModalContainer from "../../../components/DialogModal/ModalContainer";

const Client = () => {
  const dispatch = useDispatch();
  const gridRef = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});

  const clients = useSelector((state) =>
    state.clients.data.filter((param) => param.isVisible === true)
  );

  useEffect(() => {
    dispatch(getAllClients());
  }, [dispatch]);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  const columnDefs = useMemo(
    () => [
      { headerName: "Nombre", field: "name", resizable: true, sortable: true },
      {
        headerName: "Apellido",
        field: "lastName",
        resizable: true,
        sortable: true,
      },
      { headerName: "Teléfono", field: "phone", resizable: true },
      {
        headerName: "Deuda",
        field: "inDebt",
        resizable: false,
        sortable: true,
      },
      {
        headerName: " ",
        resizable: false,
        pinned: "right",
        width: 224,
        cellRenderer: DataTableIcons,
        colId: "Actions",
        cellRendererParams: {
          onClickDelete: () => setModalIsOpen(true),
        },
      },
    ],
    []
  );

  const gridOptions = useMemo(
    () => ({
      pagination: false,
      onGridReady: (params) => {
        params.api.sizeColumnsToFit();
      },
      onGridSizeChanged: (params) => {
        params.api.sizeColumnsToFit();
      },
      columnDefs: columnDefs,
      cacheQuickFilter: true,
      onCellClicked: (params) => {
        setSelectedClient(params.data);
      },
      animateRows: true,
    }),
    [columnDefs]
  );

  return (
    <div>
      <div className="page-container">
        <div className="elements-container">
          <h1 className="page-title">Clientes</h1>
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
                label={"Crear cliente"}
                type={"create"}
                system={"inventory"}
              />
            </div>
          </div>
          <div>
            <Table
              gridRef={gridRef}
              gridOptions={gridOptions}
              rowData={clients}
            />
          </div>
        </div>
      </div>
      <ModalContainer
        identity={"cliente"}
        isOpen={modalIsOpen}
        onConfirmAction={() => {
          dispatch(deleteClient(selectedClient));
          setModalIsOpen(false);
        }}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default Client;
