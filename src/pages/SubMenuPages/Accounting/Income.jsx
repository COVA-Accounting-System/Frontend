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
  Input
} from '@chakra-ui/react'

// COMPONENTS IMPORTS
import DataTableActions from '../../../components/DataTableActions/DataTableActions'
import TextFormControl from '../../../components/Input/TextFormControl'
import SelectEntityFormControl from '../../../components/Input/SelectEntityFormControl'
import PriceFormControl from '../../../components/Input/PriceFormControl'
import DateFormControl from '../../../components/Input/DateFormControl'

import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import Table from '../../../components/Table/Table'
import { Button } from '../../../components/Button/Button'

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
        resizable: false,
        sortable: true,
        width: 160
        // minWidth: 120,
        // maxWidth: 250,
      },
      {
        headerName: 'Cliente',
        field: 'client',
        resizable: false,
        sortable: true,
        // minWidth: 130,
        width: 210
        // maxWidth: 250,
      },
      {
        headerName: 'Pedido',
        field: 'order',
        resizable: false,
        sortable: false,
        width: 130
        // minWidth: 60,
        // maxWidth: 160,
      },
      {
        headerName: 'Fecha',
        field: 'date',
        cellRenderer: data => {
          return new Date(data.data.date).toLocaleDateString()
        },
        resizable: false,
        sortable: true,
        width: 150
      },
      {
        headerName: 'Concepto',
        field: 'concept',
        resizable: false,
        sortable: true,
        width: 150
        // minWidth: 140,
      },
      {
        headerName: 'Monto',
        field: 'amount',
        cellRenderer: data => {
          return `${data.data.amount} Bs.`
        },
        resizable: false,
        sortable: true,
        width: 150
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
          onView: () => {},
          onEdit: data => {
            income.setAccountingSeat(data.accountingSeat)
            income.setClient(data.client)
            income.setOrder(data.order)
            income.setDate(data.date)
            income.setAmount(data.amount)
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
                label='Crear ingreso'
                type='login'
                system='accounting'
                onClick={() => {
                  income.openModal()
                  income.changeActionRedux('create')
                }}
              />
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
          <ModalHeader
            color='acsys.titleColor'
            fontWeight='700'
            fontSize='25px'
          >
            Crear ingreso
          </ModalHeader>
          <ModalCloseButton color={'acsys.titleColor'} />

          <ModalBody pb={3}>
            <form className='three-rows-grid'>
              <div className='two-column-grid'>
                <TextFormControl
                  labelName='N.º asiento'
                  width='330px'
                  paddingSpace={0}
                  value={income.accountingSeat}
                  onInput={data => income.setAccountingSeat(data)}
                  isSubmited={income.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
                <DateFormControl
                  labelName='Fecha de ingreso'
                  widht='330px'
                  paddingSpace={0}
                  value={income.date}
                  onInput={data => income.setDate(data)}
                  isSubmited={income.isSubmited}
                  isRequired={true}
                  isRequiredMessage='Este campo es obligatorio'
                />
              </div>

              <div className='two-column-grid'>
                <SelectEntityFormControl
                  labelName='Cliente'
                  paddingSpace={4}
                  value={income.client}
                  onSelect={data => {
                    income.setClient(data._id)
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
                    income.setOrder(data._id)
                  }}
                  isSubmited={income.isSubmited}
                  entityList={income.ordersList.filter(order => {
                    if (income.client !== '') {
                      return order.orderClient._id === income.client
                    }
                    return order
                  })}
                  isRequired={true}
                  isRequiredMessage='Este campo es obligatorio'
                  isDisabled={income.client === '' ? true : false}
                />
              </div>
              <div className='two-column-grid'>
                <TextFormControl
                  labelName='Concepto'
                  width='330px'
                  paddingSpace={4}
                  value={income.concept}
                  onInput={data => income.setConcept(data)}
                  isSubmited={income.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
                <PriceFormControl
                  labelName='Monto'
                  value={income.amount}
                  onInput={data => income.setAmount(data)}
                  isSubmited={income.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
              </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              label='Guardar'
              type='confirm'
              onClick={
                income.action === 'create'
                  ? income.onClickSave
                  : income.onEditSave
              }
            />
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DeleteModal
        modalIsOpen={income.deleteModalIsOpen}
        entityName='Ingreso'
        onClose={() => income.closeDeleteModal()}
        onDelete={() => {
          income.deleteActualIncome()
          income.closeDeleteModal()
        }}
      />
    </div>
  )
}

export default Income
