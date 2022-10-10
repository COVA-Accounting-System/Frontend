import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";
import Table from "../../../components/Table/Table";
import { getAllProducts, setActualProduct } from "../../../reducers/products";
import { changeAction, changeEntity } from "../../../reducers/crud";
import { Button } from "../../../components/Button/Button";
import DataTableIcons from "../../../components/DataTableActions/DataTableIcons";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Template.styles.scss";
import ModalContainer from "../../../components/DialogModal/ModalContainer";

const Product = () => {
  const dispatch = useDispatch();
  const gridRef = useRef();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const products = useSelector((state) =>
    state.products.data.filter((param) => param.isVisible === true)
  );

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(changeEntity({ entity: "product", entityName: "productos" }));
  }, [dispatch]);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Producto",
        field: "name",
        resizable: true,
        sortable: true,
        minWidth: 130,
        width: 180,
        maxWidth: 250,
      },
      {
        headerName: "Descripcion",
        field: "description",
        resizable: true,
        sortable: false,
        minWidth: 130,
        width: 240,
        maxWidth: 350
      },
      // { headerName: "Fotografia", field: "photography", resizable: true },
      {
        headerName: "Precio por unidad",
        field: "unitPrice",
        resizable: false,
        sortable: true,
        minWidth: 200,
        // width: 180,
        maxWidth: 250,
      },
      {
        headerName: "Precio por docena",
        field: "dozenPrice",
        resizable: false,
        sortable: true,
        // maxWidth: 220,
        minWidth: 200,
        flex: 1,
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
            dispatch(setActualProduct(data));
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
          <h1 className="page-title">Productos</h1>
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
                label={"Crear producto"}
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
              rowData={products}
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

export default Product;
