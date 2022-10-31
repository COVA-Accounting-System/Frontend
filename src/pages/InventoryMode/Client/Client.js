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
import Input from "../../../components/Input/Input";
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
        resizable: false,
        sortable: true,
        width: 180,
        minWidth: 100,
        // maxWidth: 230,
      },
      {
        headerName: "Apellido",
        field: "lastName",
        resizable: false,
        sortable: true,
        minWidth: 100,
        width: 230,
        // maxWidth: 270,
      },
      {
        headerName: "Teléfono",
        field: "phone",
        resizable: false,
        minWidth: 100,
        width: 190,
        // maxWidth: 200,
      },
      {
        headerName: "Dirección",
        field: "address",
        resizable: false,
        sortable: true,
        minWidth: 110,
        flex: 1,
      },
      {
        headerName: " ",
        resizable: false,
        pinned: "right",
        maxWidth: 160,
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
    // console.log(document.getElementsByName("filter-text-box").value)
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  return (
    <div>
      <div className="page-container">
        <h1 className="page-title">Clientes</h1>
        <div className="elements-container">
          <section className="task-bar-datatable">
            <div className="input-container">
              <Input
                id={"filter-text-box"}
                label={"Buscar"}
                type={"text"}
                style={"botton-border"}
                onChange={onFilterTextBoxChanged}
              />
            </div>
            <div className="button-container">
              <Button
                label={"Crear cliente"}
                type={"login"}
                system={"accounting"}
                onClick={() => {
                  setModalIsOpen(true);
                  dispatch(changeAction("create"));
                }}
              />
            </div>
          </section>
          <section className="table-section">
            <Table
              gridRef={gridRef}
              gridOptions={gridOptions}
              rowData={clients}
            />
          </section>
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
