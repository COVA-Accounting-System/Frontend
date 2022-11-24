import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";
import Table from "../../../components/Table/Table";
import { Button } from "../../../components/Button/Button";
import DataTableIcons from "../../../components/DataTableActions/DataTableIcons";
import TextFormControl from "../../../components/Input/TextFormControl";
import PhoneFormControl from "../../../components/Input/PhoneFormControl";
import { getAllClients, setActualClient } from "../../../reducers/clients";
import { changeAction, changeEntity } from "../../../reducers/crud";
import { useDispatch, useSelector } from "react-redux";
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
                focusBorderColor="acsys.primaryColor"
                placeholder="Buscar..."
                size="sm"
                width={350}
                onChange={onFilterTextBoxChanged}
                color="acsys.iconColor"
                id={"filter-text-box"}
                spellCheck="false"
                borderRadius={"5px"}
                height={"35px"}
                fontSize={"15px"}
                autoComplete="off"
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
      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        size={"sm"}
        onClose={() => setModalIsOpen(false)}
        isOpen={modalIsOpen}
      >
        <ModalOverlay />
        <ModalContent userSelect={"none"}>
          <ModalHeader
            color={"acsys.titleColor"}
            fontWeight="700"
            fontSize="25px"
          >
            Crear cliente
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={3}>
            <TextFormControl labelName={"Nombres"} paddingSpace={0}/>
            <TextFormControl labelName={"Apellidos"} paddingSpace={4}/>
            <PhoneFormControl/>
            <TextFormControl labelName={"Dirección"} paddingSpace={4}/>
          </ModalBody>

          <ModalFooter>
            <Button
              label={"Guardar"}
              type={"confirm"}
              // onClick={action === "create" ? onClickSave : onEditSave}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Client;
