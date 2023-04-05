import React, { useMemo, useCallback, useRef } from 'react'

// CHAKRA UI IMPORTS
import { Input, Button } from '@chakra-ui/react'

// COMPONENTS IMPORTS
import DataTableActions from '../../../components/DataTableActions/DataTableActions'
import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import Table from '../../../components/Table/Table'
import ExpenseModal from '../../../components/ExpenseModal/ExpenseModal'
import MaterialsTooltip from '../../../components/Tooltip/MaterialsTooltip'
// import ProviderPopover from '../../../components/Popover/ProviderPopover'

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
        field: 'inventoryInput.numberOfInput',
        resizable: true,
        sortable: true,
        unSortIcon: true
        // width: 150
        // maxWidth: 300,
      },
      {
        headerName: 'Proveedor',
        field: 'creditorProvider.storeName',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        width: 250
        // cellRenderer: ProviderPopover,
        // cellRendererParams: {
        //   getProviderData: data => {
        //     return data.creditorProvider
        //   }
        // },
        // maxWidth: 160,
        
      },
      {
        headerName: 'Fecha de entrada',
        field: 'inventoryInput.date',
        valueGetter: data => {
          return new Date(data.data.inventoryInput.date).toLocaleDateString()
        },
        resizable: true,
        sortable: true,
        unSortIcon: true
        // maxWidth: 177,
      },
      {
        headerName: 'Materiales',
        field: '',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        autoHeight: true,
        cellRenderer: MaterialsTooltip,
        cellRendererParams: {
          getListOfMaterials: data => {
            return data.inventoryInput.listOfMaterials
          }
        },
        // valueGetter: data => {
        //   return `${data.data.inventoryInput.totalPrice} Bs.`
        // },

        // maxWidth: 180,
      },
      {
        headerName: 'Precio total',
        field: 'inventoryInput.totalPrice',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        valueGetter: data => {
          return `${data.data.inventoryInput.totalPrice} Bs.`
        },

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
          // onView: data => {
          //   product.setActualProductRedux(data)
          //   product.setViewModalIsOpen(true)
          // },
          onEdit: data => {
            expense.setAccountingSeat(data.accountingSeat)
            expense.setCategory(data.category)
            expense.setDate(data.date)
            expense.setAmount(data.amount)
            expense.setConcept(data.concept)

            inventoryInput.setDate(data.inventoryInput.date)
            inventoryInput.setProvider(data.creditorProvider)
            inventoryInput.setProviderId(data.creditorProvider._id)
            inventoryInput.setTotalPrice(data.inventoryInput.totalPrice)
            inventoryInput.setNumberOfInput(data.inventoryInput.numberOfInput)
            inventoryInput.setListOfMaterials(
              data.inventoryInput.listOfMaterials
            )
            inventoryInput.setActualInventoryInputRedux(data.inventoryInput)
            expense.setInventoryInput(data.inventoryInput)
            expense.setInventoryInputId(data.inventoryInput._id)
            expense.setCreditorProvider(data.creditorProvider)
            expense.setCreditorProviderId(data.creditorProvider._id)
            expense.setTypeOfExpense({
              rawMaterial: true,
              labour: false,
              indirectCosts: false
            })

            expense.setPage(1)
            expense.changeActionRedux('edit')
            expense.setActualExpenseRedux(data)
            expense.openModal()
          },
          onDelete: data => {
            expense.setDeleteModalIsOpen(true)
            expense.setActualExpenseRedux(data)
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
              rowData={expense.expensesListForInventoryInput}
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
        isLoading={expense.isLoading}
        modalIsOpen={expense.deleteModalIsOpen}
        entityName='Entrada'
        onClose={() => expense.closeDeleteModal()}
        onDelete={() => {
          expense.actualExpense.category === 'Materia prima'
            ? expense.deleteActualExpenseRawMaterial(
                inventoryInput.closeDeleteModal
              )
            : expense.deleteActualExpense()
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
