import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState
} from 'react'
import Table from '../../../components/Table/Table'
import {
  getAllProviders,
  setActualProvider
} from '../../../reducers/providers'
import { changeAction, changeEntity } from '../../../reducers/crud'
import { Button } from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'
import DataTableActions from '../../../components/DataTableActions/DataTableActions'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/Template.styles.scss'
// import ModalContainer from "../../../components/DialogModal/ModalContainer";

const RawProvider = () => {
  const dispatch = useDispatch()
  const gridRef = useRef()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const providers = useSelector((state) =>
    state.providers.data.filter((param) => param.isVisible === true)
  )

  useEffect(() => {
    dispatch(getAllProviders())
    dispatch(changeEntity({ entity: 'provider', entityName: 'proveedor' }))
  }, [dispatch])

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Tienda',
        field: 'storeName',
        resizable: false,
        sortable: true,
        // minWidth: 110,
        width: 220
        // maxWidth: 300,
      },
      {
        headerName: 'NIT',
        field: 'nit',
        resizable: false,
        sortable: true,
        // minWidth: 100,
        width: 130
        // maxWidth: 160,
      },
      {
        headerName: 'Teléfono',
        field: 'phone',
        resizable: false,
        // minWidth: 120,
        width: 147
        // maxWidth: 177,
      },
      {
        headerName: 'Ciudad',
        field: 'city',
        resizable: false,
        sortable: true,
        // minWidth: 120,
        width: 150
        // maxWidth: 180,
      },
      {
        headerName: 'Pais',
        field: 'country',
        resizable: false,
        sortable: true,
        width: 150
        // minWidth: 100,
        // maxWidth: 180,
      },
      {
        headerName: 'Direccion',
        field: 'address',
        resizable: false,
        sortable: true,
        // minWidth: 130,
        width: 240
        // maxWidth: 320,
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
            dispatch(setActualProvider(data))
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
        // params.columnApi.autoSizeAllColumns();
      },
      onGridSizeChanged: (params) => {
        // params.columnApi.autoSizeAllColumns();
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
        <h1 className='page-title'>Proveedores</h1>
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
                label='Crear proveedor'
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
              rowData={providers}
            />
          </section>
        </div>
      </div>

    </div>
  )
}

export default RawProvider
