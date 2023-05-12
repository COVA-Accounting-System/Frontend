// REACT IMPORTS
import React, { useMemo, useCallback, useRef } from 'react'

// COMPONENTS IMPORTS
import DataTableActions from '../../../components/DataTableActions/DataTableActions'
import ExpenseModal from '../../../components/ExpenseModal/ExpenseModal'
import ExpenseCategoryTag from '../../../components/ExpenseCategoryTag/ExpenseCategoryTag'

// import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import DeleteExpenseAndInventoryInput from '../../../components/DeleteModal/DeleteExpenseAndInventoryInput'
import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import Table from '../../../components/Table/Table'

// CHAKRA UI IMPORTS
import { Input, Button, Stack, Text } from '@chakra-ui/react'

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
        headerName: 'N.º Gasto',
        field: 'accountingSeat',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
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
        suppressMovable: true,
        // autoHeight: true,
        width: 250,
        cellRenderer: ExpenseCategoryTag
        // cellRendererParams:
        // maxWidth: 250,
      },
      {
        headerName: 'Acreedor',
        field: '',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
        width: 250,
        valueGetter: data => {
          return data.data.category === 'Materia prima'
            ? data.data.creditorProvider.uiName
            : data.data.category === 'Mano de obra directa'
            ? data.data.creditorEmployee.uiName
            : data.data.category === 'Costos indirectos de fabricación'
            ? data.data.creditorEntity
            : ''
        }
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
        suppressMovable: true,
        sortable: true,
        unSortIcon: true
      },
      {
        headerName: 'Concepto',
        field: 'concept',
        resizable: true,
        sortable: true,
        suppressMovable: true,
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
        suppressMovable: true,
        unSortIcon: true
      },
      {
        headerName: ' ',
        resizable: false,
        pinned: 'right',
        maxWidth: 160,
        suppressMovable: true,
        cellRenderer: DataTableActions,
        colId: 'Actions',
        cellRendererParams: {
          // onView: () => {},
          onEdit: data => {
            expense.setAccountingSeat(data.accountingSeat)
            expense.setCategory(data.category)
            expense.setDate(data.date)
            expense.setAmount(data.amount)
            expense.setConcept(data.concept)

            if (data.category === 'Materia prima') {
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
            }
            if (data.category === 'Mano de obra directa') {
              expense.setCreditorEmployee(data.creditorEmployee)
              expense.setCreditorEmployeeId(data.creditorEmployee._id)
              expense.setTypeOfExpense({
                rawMaterial: false,
                labour: true,
                indirectCosts: false
              })
              expense.setOrder(data.singleOrder)
              expense.setOrderId(data.singleOrder._id)
            }
            if (data.category === 'Costos indirectos de fabricación') {
              expense.setCreditorEntity(data.creditorEntity)
              expense.setTypeOfExpense({
                rawMaterial: false,
                labour: false,
                indirectCosts: true
              })

              expense.setOrderList(data.orderList)
            }
            expense.setPage(1)
            expense.changeActionRedux('edit')
            expense.setActualExpenseRedux(data)
            expense.openModal()
          },
          onDelete: data => {
            expense.setInventoryInput(data.inventoryInput)
            expense.setAccountingSeat(data.accountingSeat)
            if (data.category === 'Materia prima') {
              expense.setDeleteRawMaterialModalIsOpen(true)
            } else {
              expense.setDeleteModalIsOpen(true)
            }
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
    <Stack h='100%' p={'8'} minW={'850px'}>
      <Text fontSize={'27px'} fontWeight={'bold'} color={'acsys.titleColor'}>
        Gastos
      </Text>
      <Stack direction={'row'} justifyContent={'space-between'}>
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
      </Stack>
      <Stack height={'100%'}>
        <Table
          gridRef={gridRef}
          gridOptions={gridOptions}
          rowData={expense.expensesList.reverse()}
        />
      </Stack>
      <ExpenseModal
        expenseHook={expense}
        inventoryInputHook={inventoryInput}
        isFromExpense={true}
        isEditMode={expense.action === 'edit' ? true : false}
      />

      <DeleteModal
        modalIsOpen={expense.deleteModalIsOpen}
        onClose={() => {
          expense.closeDeleteModal()
        }}
        entityName={'Gasto'}
        onDelete={expense.deleteActualExpense}
        isLoading={expense.isLoading}
      />

      <DeleteExpenseAndInventoryInput
        isLoading={expense.isLoading}
        modalIsOpen={expense.deleteRawMaterialModalIsOpen}
        onClose={() => {
          expense.closeDeleteRawMaterialModal()
        }}
        expenseName={expense.accountingSeat}
        inventoryInputName={expense.inventoryInput}
        onDelete={() =>
          expense.deleteActualExpenseRawMaterial(
            inventoryInput.closeDeleteModal
          )
        }
      />
    </Stack>
  )
}

export default Expense
