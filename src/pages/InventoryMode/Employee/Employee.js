import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";
import Table from "../../../components/Table/Table";
import {
  getAllEmployees,
  setActualEmployee,
} from "../../../reducers/employees";
import { changeAction, changeEntity } from "../../../reducers/crud";
import { Button } from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import DataTableIcons from "../../../components/DataTableActions/DataTableIcons";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Template.styles.scss";
import ModalContainer from "../../../components/DialogModal/ModalContainer";

const Employee = () => {
  const dispatch = useDispatch();
  const gridRef = useRef();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const employees = useSelector((state) =>
    state.employees.data.filter((param) => param.isVisible === true)
  );

  useEffect(() => {
    dispatch(getAllEmployees());
    dispatch(changeEntity({ entity: "employee", entityName: "empleado" }));
  }, [dispatch]);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Nombre",
        field: "name",
        resizable: false,
        sortable: true,
        width: 160,
        // minWidth: 120,
        // maxWidth: 250,
      },
      {
        headerName: "Apellidos",
        field: "lastName",
        resizable: false,
        sortable: true,
        // minWidth: 130,
        width: 210,
        // maxWidth: 250,
      },
      {
        headerName: "CI",
        field: "ci",
        resizable: false,
        sortable: false,
        width: 130,
        // minWidth: 60,
        // maxWidth: 160,
      },
      {
        headerName: "Teléfono",
        field: "phone",
        resizable: false,
        width: 140,
        // minWidth: 110,
        // maxWidth: 160,
      },
      {
        headerName: "Fecha de inicio",
        field: "startDate",
        resizable: false,
        sortable: true,
        width: 150,
      },
      {
        headerName: "Nacionalidad",
        field: "nationality",
        resizable: false,
        sortable: true,
        width: 150,
        // minWidth: 140,
      },
      {
        headerName: "Fecha de nacimiento",
        field: "dateOfBirth",
        resizable: false,
        sortable: true,
        width: 190,
        // minWidth: 190,
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
            dispatch(setActualEmployee(data));
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
        <h1 className="page-title">Empleados</h1>
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
                label={"Crear empleado"}
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
              rowData={employees}
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

export default Employee;
