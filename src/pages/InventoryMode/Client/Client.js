import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";
import Table from "../../../components/Table/Table";
import { getAllClients, setActualClient } from "../../../reducers/clients";
import { changeAction, changeEntity } from "../../../reducers/crud";
import { Button } from "../../../components/Button/Button";
import DataTableIcons from "../../../components/DataTableActions/DataTableIcons";
import { useDispatch, useSelector } from "react-redux";
import ModalContainer from "../../../components/DialogModal/ModalContainer";
import "../styles/Template.styles.scss";

const Client = () => {
  const dispatch = useDispatch();
  const gridRef = useRef();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const clients = useSelector((state) =>
    state.clients.data.filter((param) => param.isVisible === true)
  );

  useEffect(() => {
    dispatch(getAllClients());
    dispatch(changeEntity({ entity: "client", entityName: "cliente" }));
  }, [dispatch]);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Nombre",
        field: "name",
        resizable: true,
        sortable: true,
        width: 180,
        minWidth: 120,
        maxWidth: 230,
      },
      {
        headerName: "Apellido",
        field: "lastName",
        resizable: true,
        sortable: true,
        minWidth: 130,
        width: 230,
        maxWidth: 270,
      },
      {
        headerName: "Teléfono",
        field: "phone",
        resizable: true,
        minWidth: 130,
        width: 190,
        maxWidth: 200,
        // flex: 1
      },
      {
        headerName: "Deuda",
        field: "inDebt",
        resizable: false,
        sortable: true,
        minWidth: 130,
        flex: 1,
      },
      {
        headerName: " ",
        resizable: false,
        pinned: "right",
        width: 224,
        cellRenderer: DataTableIcons,
        colId: "Actions",
        cellRendererParams: {
          openModal: () => {
            setModalIsOpen(true);
          },
          setData: (data) => {
            dispatch(setActualClient(data));
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
        // params.api.sizeColumnsToFit();
      },
      onGridSizeChanged: (params) => {
        // params.api.sizeColumnsToFit();
      },
      columnDefs: columnDefs,
      cacheQuickFilter: true,
      // rowSelection: "single",
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
        onRequestClose={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default Client;
