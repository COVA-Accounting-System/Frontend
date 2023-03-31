import React, { useMemo, useCallback, useRef } from 'react'

// CHAKRA UI IMPORTS
import { Input, Button } from '@chakra-ui/react'

// COMPONENTS IMPORTS
import DataTableActions from '../../../components/DataTableActions/DataTableActions'
import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import Table from '../../../components/Table/Table'
import ExpenseModal from '../../../components/ExpenseModal/ExpenseModal'

// HOOKS IMPORTS
import { useInventoryInput } from '../../../hooks/useInventoryInput'
import { useExpense } from '../../../hooks/useExpense'

// STYLES IMPORTS
import '../Template.styles.scss'

const InventoryInput = () => {
  const gridRef = useRef()
  const inventoryInput = useInventoryInput()
  const expense = useExpense()

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Nº de entrada',
        field: 'numberOfInput',
        resizable: true,
        sortable: true,
        unSortIcon: true
        // width: 150
        // maxWidth: 300,
      },
      {
        headerName: 'Proveedor',
        field: 'provider.storeName',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        // maxWidth: 160,
        width: 250
      },
      {
        headerName: 'Fecha de entrada',
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
        headerName: 'Precio total',
        field: 'totalPrice',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        valueGetter: data => {
          return `${data.data.totalPrice} Bs.`
        },
        flex: 1
        // maxWidth: 180,
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
            inventoryInput.setNumberOfInput(data.numberOfInput)
            inventoryInput.setDate(data.date)
            inventoryInput.setTotalPrice(data.totalPrice)

            inventoryInput.setProvider(data.provider)
            inventoryInput.setProviderId(data.provider._id)
            inventoryInput.setListOfMaterials(data.setListOfMaterials)

            inventoryInput.changeActionRedux('edit')
            inventoryInput.setActualInventoryInputRedux(data)
            inventoryInput.openModal()
          },
          onDelete: data => {
            inventoryInput.setDeleteModalIsOpen(true)
            inventoryInput.setActualInventoryInputRedux(data)
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
        <h1 className='page-title'>Entradas de inventario</h1>
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
                  expense.openModal()
                  expense.changeActionRedux('create')
                  expense.setPage(1)
                  expense.setTypeOfExpense({
                    rawMaterial: true,
                    labour: false,
                    indirectCosts: false
                  })
                }}
              >
                Registrar entrada
              </Button>
            </div>
          </section>
          <section className='table-section'>
            <Table
              gridRef={gridRef}
              gridOptions={gridOptions}
              rowData={inventoryInput.inventoryInputsList}
            />
          </section>
        </div>
      </div>
      <ExpenseModal
        expenseHook={expense}
        inventoryInputHook={inventoryInput}
        isFromExpense={false}
      />
      <DeleteModal
        modalIsOpen={inventoryInput.deleteModalIsOpen}
        entityName='Entrada'
        onClose={() => inventoryInput.closeDeleteModal()}
        onDelete={() => {
          inventoryInput.deleteActualInventoryInput()
        }}
      />
      {/* <ViewProduct
        onClose={() => product.setViewModalIsOpen(false)}
        isOpen={product.viewModalIsOpen}
      /> */}
    </div>
  )
}

export default InventoryInput
