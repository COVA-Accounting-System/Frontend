// REACT IMPORTS
import React, { useMemo, useCallback, useRef } from 'react'

// COMPONENTS IMPORTS
import DataTableActions from '../../../components/DataTableActions/DataTableActions'
import ExpenseModal from '../../../components/ExpenseModal/ExpenseModal'

import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import Table from '../../../components/Table/Table'

// CHAKRA UI IMPORTS
import { Input, Button } from '@chakra-ui/react'

// HOOKS IMPORTS
import { useExpense } from '../../../hooks/useExpense'
import { useInventoryInput } from '../../../hooks/useInventoryInput'

// STYLES IMPORTS
import '../Template.styles.scss'

const Expense = () => {
  const gridRef = useRef()
  const expense = useExpense()
  const inventoryInput = useInventoryInput()

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'N.º asiento',
        field: 'accountingSeat',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        width: 150
        // minWidth: 120,
        // maxWidth: 250,
      },
      {
        headerName: 'Categoría',
        field: 'category',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        width: 250
        // maxWidth: 250,
      },
      {
        headerName: 'Acreedor',
        field: '',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        width: 250
        // minWidth: 60,
        // maxWidth: 160,
      },
      {
        headerName: 'Fecha',
        field: 'date',
        valueGetter: data => {
          return new Date(data.data.date).toLocaleDateString()
        },
        resizable: true,
        sortable: true,
        unSortIcon: true
      },
      {
        headerName: 'Concepto',
        field: 'concept',
        resizable: true,
        sortable: true,
        unSortIcon: true
      },
      {
        headerName: 'Monto',
        field: 'amount',
        valueGetter: data => {
          return `${data.data.amount} Bs.`
        },
        resizable: true,
        sortable: true,
        unSortIcon: true
      },
      {
        headerName: ' ',
        resizable: false,
        pinned: 'right',
        maxWidth: 160,
        cellRenderer: DataTableActions,
        colId: 'Actions',
        cellRendererParams: {
          onView: () => {},
          onEdit: data => {
            expense.setAccountingSeat(data.accountingSeat)
            expense.setCategory(data.category)
            expense.setDate(data.date)
            expense.setAmount(data.amount)
            expense.setConcept(data.concept)

            expense.setCreditorEmployee(data.creditorEmployee)
            expense.setCreditorEmployeeId(data.creditorEmployee._id)
            expense.setCreditorProvider(data.setCreditorProvider)
            expense.setCreditorProviderId(data.setCreditorProvider._id)

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
        <h1 className='page-title'>Gastos</h1>
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
                }}
              >
                Registrar gasto
              </Button>
            </div>
          </section>
          <section className='table-section'>
            <Table
              gridRef={gridRef}
              gridOptions={gridOptions}
              rowData={expense.expensesList}
            />
          </section>
        </div>
      </div>
      <ExpenseModal expenseHook={expense} inventoryInputHook={inventoryInput} />

      <DeleteModal
        isLoading={expense.isLoading}
        modalIsOpen={expense.deleteModalIsOpen}
        entityName='Gasto'
        onClose={() => expense.closeDeleteModal()}
        onDelete={() => {
          expense.deleteActualExpense()
        }}
      />
    </div>
  )
}

export default Expense
