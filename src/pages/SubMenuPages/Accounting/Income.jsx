// REACT IMPORTS
import React, { useMemo, useCallback, useRef } from 'react'

// CHAKRA UI IMPORTS
import { Input, Button, Stack, Text } from '@chakra-ui/react'

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
        headerName: 'N.º Ingreso',
        field: 'accountingSeat',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
        width: 150,
        sort: 'desc', defaultSort: true
      },
      {
        headerName: 'Cliente',
        field: 'client.uiName',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true
      },
      {
        headerName: 'Pedido',
        valueGetter: data => {
          return `Pedido #${data.data.order.orderNumber} - ${data.data.order.orderProduct.uiName}`
        },
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
        width: 300
      },
      {
        headerName: 'Fecha',
        field: 'date',
        valueGetter: data => {
          return new Date(data.data.date).toLocaleDateString()
        },
        resizable: true,
        sortable: true,
        suppressMovable: true,
        unSortIcon: true
      },
      {
        headerName: 'Tipo de pago',
        field: 'typeOfIncome',
        resizable: true,
        sortable: true,
        suppressMovable: true,
        unSortIcon: true
      },
      {
        headerName: 'Concepto',
        field: 'concept',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
        width: 270
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
        cellStyle: { overflow: 'visible' },
        cellRenderer: DataTableActions,
        colId: 'Actions',
        suppressMovable: true,
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
    <Stack h='100%' p={'8'} minW={'850px'}>
      <Text fontSize={'27px'} fontWeight={'bold'} color={'acsys.titleColor'}>
        Ingresos
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
          onClick={() => {
            income.openModal()
            income.changeActionRedux('create')
          }}
        >
          Registrar ingreso
        </Button>
      </Stack>
      <Stack height={'100%'}>
        <Table
          gridRef={gridRef}
          gridOptions={gridOptions}
          rowData={income.incomesList}
        />
      </Stack>
      <IncomeModal income={income} />

      <DeleteModal
        isLoading={income.isLoading}
        modalIsOpen={income.deleteModalIsOpen}
        entityName='Ingreso'
        onClose={() => income.closeDeleteModal()}
        onDelete={() => {
          income.deleteActualIncome()
        }}
      />
    </Stack>
  )
}

export default Income
