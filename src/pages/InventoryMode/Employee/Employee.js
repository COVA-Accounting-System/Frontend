import React, { useMemo } from "react";
import "./Employee.scss";
import { getAllEmployees } from "../../../services/employee.service";
import { setInitialState } from "../../../reducers/employee.reducer";
import { useSelector } from "react-redux";
import useLoadInitialData from "../../../hooks/useLoadInitialData";
import Table from "../../../components/Table/Table";

const Employee = () => {
  useLoadInitialData(getAllEmployees, setInitialState);
  const employees = useSelector((state) =>
    state.employees.filter((employee) => employee.isVisible == true)
  );

  const columnDefs = useMemo(() => [
    { headerName: "Nombre", field: "name" },
    { headerName: "Apellidos", field: "lastName" },
    { headerName: "Ci", field: "ci" },
    { headerName: "Telefono", field: "phone" },
    { headerName: "Nacionalidad", field: "nationality" },
    { headerName: "Fecha de inicio", field: "startDate" },
    { headerName: "Fecha de nacimiento", field: "dateOfBirth" },
  ])

  return (
    <div>
      <Table rowData={employees} columnDefs={columnDefs} />
    </div>
  );
};

export default Employee;
