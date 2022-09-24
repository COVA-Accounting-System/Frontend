import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { setInitialState } from "../../../reducers/client.reducer";
import { getAllClients } from "../../../services/client.service";
import useLoadInitialData from "../../../hooks/useLoadInitialData";
import Table from "../../../components/Table/Table";
import { Button } from '../../../components/Button/Button'
import "./Client.scss";

const Client = () => {
  useLoadInitialData(getAllClients, setInitialState);
  const clients = useSelector((state) =>
    state.clients.filter((client) => client.isVisible == true)
  );

  const columnDefs = useMemo( () => [
    { headerName: "Nombre", field: "name" },
    { headerName: "Apellido", field: "lastName" },
    { headerName: "Phone", field: "phone" },
    { headerName: "Deuda", field: "inDebt" },
  ])
  return (
    <div>
      <h1>Clientes</h1>
      <input type="text" placeholder="Buscar..." />
      <Button label={'Crear cliente'} type={'create'} system={'inventory'}/>
      <Table rowData={clients} columnDefs={columnDefs} />
    </div>
  );
};

export default Client;
