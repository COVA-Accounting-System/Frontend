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
        resizable: true,
        sortable: true,
        width: 180,
        minWidth: 120,
        maxWidth: 250
      },
      {
        headerName: "Apellidos",
        field: "lastName",
        resizable: true,
        sortable: true,
        minWidth: 130,
        width: 210,
        maxWidth: 250
      },
      {
        headerName: "CI",
        field: "ci",
        resizable: true,
        sortable: false,
        width: 130,
        minWidth: 60,
        maxWidth: 160
      },
      {
        headerName: "Teléfono",
        field: "phone",
        resizable: true,
        width: 140,
        minWidth: 110,
        maxWidth: 160
      },
      {
        headerName: "Fecha de inicio",
        field: "startDate",
        resizable: false,
        sortable: true,
        width: 180,
        minWidth: 180,
        maxWidth: 180
      },
      {
        headerName: "Fecha de nacimiento",
        field: "dateOfBirth",
        resizable: false,
        sortable: true,
        width: 220,
        minWidth: 220,
      },
      {
        headerName: "Nacionalidad",
        field: "nationality",
        resizable: false,
        sortable: true,
        width: 180,
        minWidth: 180,
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
      // onGridReady: (params) => {
      //   params.columnApi.autoSizeAllColumns();
      // },
      // onGridSizeChanged: (params) => {
      //   params.columnApi.autoSizeAllColumns();
      // },
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
          <h1 className="page-title">Empleados</h1>
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
                label={"Crear empleado"}
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
              rowData={employees}
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

export default Employee;
