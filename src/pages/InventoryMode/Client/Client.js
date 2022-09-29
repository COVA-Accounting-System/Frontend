import React, { useMemo, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { setInitialState } from "../../../reducers/client.reducer";
import { getAllClients } from "../../../services/client.service";
import useLoadInitialData from "../../../hooks/useLoadInitialData";
import Table from "../../../components/Table/Table";
import { Button } from "../../../components/Button/Button";
import "./Client.scss";
import DataTableIcons from "../../../components/DataTableActions/DataTableIcons";

const Client = () => {

  const gridRef = useRef();
  useLoadInitialData(getAllClients, setInitialState);
  const clients = useSelector((state) =>
    state.clients.filter((client) => client.isVisible == true)
  );

  const columnDefs = useMemo(() => [
    { headerName: "Nombre", field: "name", resizable: true, sortable: true},
    { headerName: "Apellido", field: "lastName", resizable: true, sortable: true},
    { headerName: "Teléfono", field: "phone", resizable: true},
    { headerName: "Deuda", field: "inDebt", resizable: false, sortable: true },
    {
      headerName: " ",
      resizable: false,
      cellRenderer: DataTableIcons,
      pinned: 'right',
      width: 210,
    },
  ]);


  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
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
            <Table rowData={clients} columnDefs={columnDefs} gridRef={gridRef}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
