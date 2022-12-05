import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState
} from 'react'
import Table from '../../components/Table/Table'
import { getAllProducts, setActualProduct } from '../../reducers/products'
import { changeAction, changeEntity } from '../../reducers/crud'
import { Button } from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import DataTableActions from '../../components/DataTableActions/DataTableActions'
import { useDispatch, useSelector } from 'react-redux'
import './Template.styles.scss'
// import ModalContainer from "../../../components/DialogModal/ModalContainer";

const Product = () => {
  const dispatch = useDispatch()
  const gridRef = useRef()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const products = useSelector((state) =>
    state.products.data.filter((param) => param.isVisible === true)
  )

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(changeEntity({ entity: 'product', entityName: 'productos' }))
  }, [dispatch])

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Producto',
        field: 'name',
        resizable: false,
        sortable: true,
        // minWidth: 130,
        width: 200
        // maxWidth: 250,
      },
      {
        headerName: 'Descripcion',
        field: 'description',
        resizable: false,
        sortable: false,
        // minWidth: 130,
        width: 300
        // maxWidth: 350,
      },
      // { headerName: "Fotografia", field: "photography", resizable: true },
      {
        headerName: 'Precio por unidad',
        field: 'unitPrice',
        resizable: false,
        sortable: true,
        minWidth: 220
        // width: 180,
        // maxWidth: 250,
      },
      {
        headerName: 'Precio por docena',
        field: 'dozenPrice',
        resizable: false,
        sortable: true,
        width: 220,
        // maxWidth: 220,
        // minWidth: 200,
        flex: 1
      },
      {
        headerName: ' ',
        resizable: false,
        pinned: 'right',
        maxWidth: 160,
        cellRenderer: {},
        colId: 'Actions',
        cellRendererParams: {
          openModal: () => {
            setModalIsOpen(true)
          },
          setData: (data) => {
            dispatch(setActualProduct(data))
          },
          dispatchAction: (action) => {
            dispatch(changeAction(action))
          }
        }
      }
    ],
    []
  )

  const gridOptions = useMemo(
    () => ({
      pagination: false,
      onGridReady: (params) => {
        // params.api.sizeColumnsToFit();
      },
      onGridSizeChanged: (params) => {
        // params.api.sizeColumnsToFit();
      },
      columnDefs,
      cacheQuickFilter: true,
      animateRows: true
    }),
    [columnDefs]
  )

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
    )
  }, [])

  return (
    <div>
      <div className='page-container'>
        <h1 className='page-title'>Productos</h1>
        <div className='elements-container'>
          <section className='task-bar-datatable'>
            <div className='input-container'>
              <Input
                id='filter-text-box'
                label='Buscar'
                type='text'
                style='botton-border'
                onChange={onFilterTextBoxChanged}
              />
            </div>
            <div className='button-container'>
              <Button
                label='Crear producto'
                type='login'
                system='accounting'
                onClick={() => {
                  setModalIsOpen(true)
                  dispatch(changeAction('create'))
                }}
              />
            </div>
          </section>
          <section className='table-section'>
            <Table
              gridRef={gridRef}
              gridOptions={gridOptions}
              rowData={products}
            />
          </section>
        </div>
      </div>

    </div>
  )
}

export default Product
