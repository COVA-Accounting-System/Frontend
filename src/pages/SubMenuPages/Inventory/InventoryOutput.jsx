import React, { useMemo, useCallback, useRef } from 'react'

// CHAKRA UI IMPORTS
import { Input, Button } from '@chakra-ui/react'

// COMPONENTS IMPORTS
import DataTableActions from '../../../components/DataTableActions/DataTableActions'
import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import Table from '../../../components/Table/Table'
import RegisterInventoryOutput from '../../../components/InventoryOutputModal/RegisterInventoryOutput'

// HOOKS IMPORTS
import { useInventoryOutput } from '../../../hooks/useInventoryOutput'

// STYLES IMPORTS
import '../Template.styles.scss'

const InventoryOutput = () => {
  const gridRef = useRef()
  const inventoryOutput = useInventoryOutput()

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Nº de salida',
        field: 'numberOfInput',
        resizable: true,
        sortable: true,
        unSortIcon: true
        // maxWidth: 300,
      },
      {
        headerName: 'Pedido',
        field: 'order.uiName',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        width: 270
        // maxWidth: 160,
      },
      {
        headerName: 'Fecha de salida',
        field: 'date',
        valueGetter: data => {
          return new Date(data.data.date).toLocaleDateString()
        },
        resizable: true,
        sortable: true,
        unSortIcon: true
        // maxWidth: 177,
      },
      {
        headerName: 'Precio estimado',
        field: 'estimatedPrice',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        valueGetter: data => {
          return `${data.data.estimatedPrice} Bs.`
        },
        // maxWidth: 180,
        flex: 1
      },
      {
        headerName: ' ',
        resizable: false,
        pinned: 'right',
        maxWidth: 160,
        cellRenderer: DataTableActions,
        colId: 'Actions',
        cellRendererParams: {
          onView: data => {
            // product.setActualProductRedux(data)
            // product.setViewModalIsOpen(true)
          },
          onEdit: data => {
            inventoryOutput.setNumberOfInput(data.numberOfInput)
            inventoryOutput.setDate(data.date)
            inventoryOutput.setEstimatedPrice(data.estimatedPrice)

            inventoryOutput.setOrder(data.order)
            inventoryOutput.setOrderId(data.order._id)
            inventoryOutput.setListOfMaterials(data.listOfMaterials)

            inventoryOutput.changeActionRedux('edit')
            inventoryOutput.setActualInventoryOutputRedux(data)
            inventoryOutput.openModal()
          },
          onDelete: data => {
            inventoryOutput.setDeleteModalIsOpen(true)
            inventoryOutput.setActualInventoryOutputRedux(data)
          }
        }
      }
    ],
    []
  )

  const gridOptions = useMemo(
    () => ({
      pagination: false,
      onGridReady: params => {
        // params.api.sizeColumnsToFit();
      },
      onGridSizeChanged: params => {
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
        <h1 className='page-title'>Salidas de inventario</h1>
        <div className='elements-container'>
          <section className='task-bar-datatable'>
            <div className='input-container'>
              <Input
                focusBorderColor='acsys.primaryColor'
                placeholder='Buscar...'
                size='sm'
                width={350}
                onChange={onFilterTextBoxChanged}
                color='acsys.iconColor'
                id='filter-text-box'
                spellCheck='false'
                borderRadius='5px'
                height='35px'
                fontSize='15px'
                autoComplete='off'
                borderColor={'gray.200'}
              />
            </div>

            <div className='button-container'>
              <Button
                backgroundColor={'acsys.primaryColor'}
                _hover={{ backgroundColor: '#098bb6' }}
                colorScheme='linkedin'
                // color='white'
                onClick={() => {
                  inventoryOutput.openModal()
                  inventoryOutput.changeActionRedux('create')
                }}
              >
                Registrar salida
              </Button>
            </div>
          </section>
          <section className='table-section'>
            <Table
              gridRef={gridRef}
              gridOptions={gridOptions}
              rowData={inventoryOutput.inventoryOutputsList}
            />
          </section>
        </div>
      </div>
      <RegisterInventoryOutput inventoryOutputHook={inventoryOutput} />
      <DeleteModal
        isLoading={inventoryOutput.isLoading}
        modalIsOpen={inventoryOutput.deleteModalIsOpen}
        entityName='Entrada'
        onClose={() => inventoryOutput.closeDeleteModal()}
        onDelete={() => {
          inventoryOutput.deleteActualInventoryOutput()
        }}
      />
      {/* <ViewProduct
        onClose={() => product.setViewModalIsOpen(false)}
        isOpen={product.viewModalIsOpen}
      /> */}
    </div>
  )
}

export default InventoryOutput
