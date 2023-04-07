// REACT IMPORTS
import React, { useMemo, useCallback, useRef } from 'react'

// CHAKRA UI IMPORTS
import {
  Input,
  Button
} from '@chakra-ui/react'

// COMPONENTS IMPORTS
import DataTableActions from '../../../components/DataTableActions/DataTableActions'
// import ClientPopover from '../../../components/Popover/ClientPopover'
// import OrderPopover from '../../../components/Popover/OrderPopover'

import IncomeModal from '../../../components/IncomeModal/IncomeModal'
import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import Table from '../../../components/Table/Table'

// HOOKS IMPORTS
import { useIncome } from '../../../hooks/useIncome'

// STYLES IMPORTS
import '../Template.styles.scss'

const Income = () => {
  const gridRef = useRef()
  const income = useIncome()

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
        headerName: 'Cliente',
        field: 'client.uiName',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        width: 300
        // cellRenderer: ClientPopover,
        // cellRendererParams: {
        //   getClientData: data => {
        //     return data.client
        //   }
        // }
        // maxWidth: 250,
      },
      {
        headerName: 'Pedido',
        field: 'order.uiName',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        width: 250
        // cellRenderer: OrderPopover,
        // cellRendererParams: {
        //   getOrderData: data => {
        //     return data.order
        //   }
        // }
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
        headerName: 'Tipo de pago',
        field: 'typeOfIncome',
        resizable: true,
        sortable: true,
        unSortIcon: true
        // minWidth: 140,
      },
      {
        headerName: 'Concepto',
        field: 'concept',
        resizable: true,
        sortable: true,
        unSortIcon: true
        // minWidth: 140,
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
        // minWidth: 140,
      },
      {
        headerName: ' ',
        resizable: false,
        pinned: 'right',
        maxWidth: 160,
        cellRenderer: DataTableActions,
        colId: 'Actions',
        cellRendererParams: {
          // onView: () => {},
          onEdit: data => {
            console.log(data.order)
            income.setAccountingSeat(data.accountingSeat)
            income.setClient(data.client)
            income.setClientId(data.client._id)
            income.setOrder(data.order)
            income.setOrderId(data.order._id)
            income.setTypeOfIncome(data.typeOfIncome)
            income.setDate(data.date)
            income.setAmount(data.amount)
            income.setOldAmount(data.amount)
            income.setConcept(data.concept)

            income.setPage(1)
            income.changeActionRedux('edit')
            income.setActualIncomeRedux(data)
            income.openModal()
          },
          onDelete: data => {
            income.setDeleteModalIsOpen(true)
            income.setActualIncomeRedux(data)
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
        <h1 className='page-title'>Ingresos</h1>
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
                  income.openModal()
                  income.changeActionRedux('create')
                }}
              >
                Registrar ingreso
              </Button>
            </div>
          </section>
          <section className='table-section'>
            <Table
              gridRef={gridRef}
              gridOptions={gridOptions}
              rowData={income.incomesList}
            />
          </section>
        </div>
      </div>
      <IncomeModal income={income}/>


      <DeleteModal
        isLoading={income.isLoading}
        modalIsOpen={income.deleteModalIsOpen}
        entityName='Ingreso'
        onClose={() => income.closeDeleteModal()}
        onDelete={() => {
          income.deleteActualIncome()
        }}
      />
    </div>
  )
}

export default Income
