import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";
import Table from "../../../components/Table/Table";
import { getAllClients, deleteClient, setActualClient  } from "../../../reducers/clients";
import { changeAction, changeEntity } from "../../../reducers/crud";
import { Button } from "../../../components/Button/Button";
import DataTableIcons from "../../../components/DataTableActions/DataTableIcons";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Template.styles.scss";
import ModalContainer from "../../../components/DialogModal/ModalContainer";

const Client = () => {
  const dispatch = useDispatch();
  const gridRef = useRef();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const clients = useSelector((state) =>
    state.clients.data.filter((param) => param.isVisible === true)
  );
  const actualClient = useSelector((state) => state.clients.actualClient);

  useEffect(() => {
    dispatch(getAllClients());
    dispatch(changeEntity({ entity: "client", entityName: "cliente" }));
  }, [dispatch]);

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
          onClickDelete: () => {
            setModalIsOpen(true);
            dispatch(changeAction("delete"));
          },
          onClickEdit: () => {
            setModalIsOpen(true);
            dispatch(changeAction("edit"));
          },
          onClickView: () => {
            setModalIsOpen(true);
            dispatch(changeAction("view"));
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
        params.api.sizeColumnsToFit();
      },
      onGridSizeChanged: (params) => {
        params.api.sizeColumnsToFit();
      },
      columnDefs: columnDefs,
      cacheQuickFilter: true,
      onCellClicked: (params) => {
        dispatch(setActualClient(params.data));
      },
      animateRows: true,
    }),
    [columnDefs]
  );

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  const onDeleteButtonModal = () => {
    dispatch(deleteClient(actualClient));
    setModalIsOpen(false);
  }


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
              rowData={clients}
            />
          </div>
        </div>
      </div>
      <ModalContainer
        isOpen={modalIsOpen}
        onDeleteButtonModal={onDeleteButtonModal}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default Client;
