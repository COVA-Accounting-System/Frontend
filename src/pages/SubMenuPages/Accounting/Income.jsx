// REACT IMPORTS
import React, { useMemo, useCallback, useRef } from 'react'

// CHAKRA UI IMPORTS
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Stack,
  Text,
  Button
} from '@chakra-ui/react'

// COMPONENTS IMPORTS
import DataTableActions from '../../../components/DataTableActions/DataTableActions'
import TextFormControl from '../../../components/Input/TextFormControl'
import SelectEntityFormControl from '../../../components/Input/SelectEntityFormControl'
import PriceFormControl from '../../../components/Input/PriceFormControl'
import DateFormControl from '../../../components/Input/DateFormControl'
// import ClientPopover from '../../../components/Popover/ClientPopover'
// import OrderPopover from '../../../components/Popover/OrderPopover'

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
            income.setDate(data.date)
            income.setAmount(data.amount)
            income.setOldAmount(data.amount)
            income.setConcept(data.concept)

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
      <Modal
        size='sm'
        onClose={() => income.closeModal()}
        isOpen={income.modalIsOpen}
      >
        <ModalOverlay />

        <ModalContent userSelect='none' maxW='730px'>
          <form>
            <ModalHeader
              color='acsys.titleColor'
              fontWeight='700'
              fontSize='25px'
            >
              {income.action === 'create'
                ? 'Registrar ingreso'
                : 'Editar ingreso'}
            </ModalHeader>
            <ModalCloseButton color={'acsys.titleColor'} />

            <ModalBody pb={3}>
              <Stack direction={'column'} spacing={4}>
                <Stack direction={'row'} spacing={5}>
                  {' '}
                  <TextFormControl
                    labelName='N.º asiento'
                    // width='330px'
                    paddingSpace={0}
                    value={income.accountingSeat}
                    onInput={data => income.setAccountingSeat(data)}
                    isSubmited={income.isSubmited}
                    isRequired
                    isRequiredMessage='Este campo es obligatorio'
                  />
                  <DateFormControl
                    labelName='Fecha de ingreso'
                    // width='330px'
                    paddingSpace={0}
                    value={income.date}
                    onInput={data => income.setDate(data)}
                    isSubmited={income.isSubmited}
                    isRequired={true}
                    isRequiredMessage='Este campo es obligatorio'
                  />
                </Stack>
                <Stack direction={'row'} spacing={5}>
                  {' '}
                  <SelectEntityFormControl
                    labelName='Cliente'
                    value={income.client}
                    onSelect={data => {
                      income.setClient(data)
                      income.setClientId(data._id)
                    }}
                    isSubmited={income.isSubmited}
                    entityList={income.clientsList}
                    isRequired={true}
                    isRequiredMessage='Este campo es obligatorio'
                  />
                  <SelectEntityFormControl
                    labelName='Pedido'
                    paddingSpace={4}
                    value={income.order}
                    onSelect={data => {
                      income.setOrder(data)
                      income.setOrderId(data._id)
                    }}
                    isSubmited={income.isSubmited}
                    entityList={
                      income.ordersList
                        ? income.ordersList.filter(income.filterAtSelectClient)
                        : []
                    }
                    isRequired={true}
                    isRequiredMessage='Este campo es obligatorio'
                    isDisabled={income.clientId === '' ? true : false}
                  />
                </Stack>
                <Stack
                  direction={'row'}
                  spacing={5}
                  justifyContent={'space-between'}
                >
                  <Stack direction={'column'} width={'100%'}>
                    <PriceFormControl
                      mt='0'
                      labelName='Monto'
                      value={income.amount}
                      onInput={data => income.setAmount(data)}
                      isSubmited={income.isSubmited}
                      maxAllowed={
                        income.order.orderBalance >= 0
                          ? income.action === 'create'
                            ? income.order.orderBalance
                            : income.order.orderBalance + income.oldAmount
                          : Number.MAX_SAFE_INTEGER
                        // Number.MAX_SAFE_INTEGER
                      }
                      isRequired
                      isRequiredMessage='Este campo es obligatorio'
                    />
                    <Text fontSize={'xs'} color='acsys.iconColor'>
                      {income.order.orderBalance >= 0
                        ? income.action === 'create'
                          ? `Saldo actual: ${
                              income.order.orderBalance - income.amount
                            } Bs.`
                          : `Saldo actual: ${
                              income.order.orderBalance -
                              (income.amount - income.oldAmount)
                            } Bs.`
                        : ''}
                    </Text>
                  </Stack>
                  <Stack width={'100%'}>
                    <TextFormControl
                      labelName='Concepto'
                      value={income.concept}
                      onInput={data => income.setConcept(data)}
                      isSubmited={income.isSubmited}
                      isRequired
                      isRequiredMessage='Este campo es obligatorio'
                    />
                  </Stack>
                </Stack>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                backgroundColor={'acsys.primaryColor'}
                _hover={{ backgroundColor: '#098bb6' }}
                colorScheme='linkedin'
                isLoading={income.isLoading}
                onClick={
                  income.action === 'create'
                    ? income.onClickSave
                    : income.onEditSave
                }
              >
                Guardar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

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
