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
  Divider,
  Input
} from '@chakra-ui/react'

// COMPONENTS IMPORTS
import DataTableActions from '../../components/DataTableActions/DataTableActions'
import TextFormControl from '../../components/Input/TextFormControl'
import DateFormControl from '../../components/Input/DateFormControl'
import SelectEntityFormControl from '../../components/Input/SelectEntityFormControl'
import PriceFormControl from '../../components/Input/PriceFormControl'
import InputWithSelectFormControl from '../../components/Input/InputWithSelectFormControl'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import Table from '../../components/Table/Table'
import { Button } from '../../components/Button/Button'

// HOOKS IMPORTS
import { useOrder } from '../../hooks/useOrder'

// STYLES IMPORTS
import './Template.styles.scss'

const Order = () => {
  const gridRef = useRef()
  const order = useOrder()

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Estado',
        field: 'orderState',
        resizable: false,
        sortable: true,
        width: 160
        // minWidth: 120,
        // maxWidth: 250,
      },
      {
        headerName: 'Nº de pedido',
        field: 'orderNumber',
        resizable: false,
        sortable: true,
        width: 160
        // minWidth: 120,
        // maxWidth: 250,
      },
      {
        headerName: 'Cliente',
        field: 'orderClient',
        resizable: false,
        sortable: true,
        // minWidth: 130,
        width: 210
        // maxWidth: 250,
      },
      {
        headerName: 'Fecha de entrega',
        field: 'orderDeliveryDate',
        resizable: false,
        sortable: false,
        width: 130
        // minWidth: 60,
        // maxWidth: 160,
      },
      {
        headerName: 'Estado de pago',
        // field: 'phoneNumber',
        // cellRenderer: (data) => {
        //   return `${data.data.phoneCountryCode} ${data.data.phoneNumber}`
        // },
        resizable: false,
        width: 140
        // minWidth: 110,
        // maxWidth: 160,
      },
      {
        headerName: 'Precio total',
        field: 'orderTotalPrice',
        resizable: false,
        sortable: true,
        width: 150
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
            order.setOrderState(data.orderState)
            order.setOrderNumber(data.orderNumber)
            order.setOrderClient(data.orderClient)
            order.setOrderDeliveryDate(data.orderDeliveryDate)
            // order.setOrderPaymentState(data.orderPaymentState)
            order.setOrderTotalPrice(data.orderTotalPrice)
            order.setOrderList(data.orderList)
            order.changeActionRedux('edit')
            order.setActualOrderRedux(data)
            order.openModal()
          },
          onDelete: data => {
            order.setDeleteModalIsOpen(true)
            order.setActualOrderRedux(data)
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
        <h1 className='page-title'>Pedidos</h1>
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
              />
            </div>
            <div className='button-container'>
              <Button
                label='Crear pedido'
                type='login'
                system='accounting'
                onClick={() => {
                  order.openModal()
                  order.changeActionRedux('create')
                }}
              />
            </div>
          </section>
          <section className='table-section'>
            <Table
              gridRef={gridRef}
              gridOptions={gridOptions}
              rowData={order.ordersList}
            />
          </section>
        </div>
      </div>
      <Modal
        size='sm'
        onClose={() => order.closeModal()}
        isOpen={order.modalIsOpen}
      >
        <ModalOverlay />
        <ModalContent userSelect='none' maxW='760px'>
          <ModalHeader
            color='acsys.titleColor'
            fontWeight='700'
            fontSize='25px'
          >
            Crear pedido
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={3}>
            <form className='providerFormGrid'>
              <div className='formGrid'>
                <SelectEntityFormControl
                  labelName='Cliente'
                  paddingSpace={0}
                  value={order.orderClient}
                  onSelect={data => order.setOrderClient(data)}
                  isSubmited={order.isSubmited}
                  entityList={order.clientsList}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
                <TextFormControl
                  labelName='Nº de pedido'
                  width='170px'
                  paddingSpace={0}
                  value={order.orderNumber}
                  onInput={data => order.setOrderNumber(data)}
                  isSubmited={order.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
                <DateFormControl
                  labelName='Fecha de entrega'
                  widht='170px'
                  paddingSpace={0}
                  value={order.orderDeliveryDate}
                  onInput={data => order.setOrderDeliveryDate(data)}
                  isRequired={false}
                />
              </div>
              <Divider mt={5} mb={-1} />
              <div className='formGrid'>
                <SelectEntityFormControl
                  labelName='Modelo'
                  paddingSpace={4}
                  // value={order.orderList}
                  // onSelect={data => order.setOrderClient(data)}
                  // isSubmited={order.isSubmited}
                  entityList={order.productsList}
                  isRequired={false}
                  // isRequiredMessage='Este campo es obligatorio'
                />
                <InputWithSelectFormControl
                  labelName='Cantidad'
                  width='170px'
                  paddingSpace={4}
                  // value={}
                  // onInput={}
                />
                <PriceFormControl
                  labelName='Precio'
                  width='170px'
                  // value={}
                  // onInput={}
                  isRequired={false}
                />
              </div>
            </form>
            <div className='order-list-container'>

            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              label='Guardar'
              type='confirm'
              onClick={
                order.action === 'create' ? order.onClickSave : order.onEditSave
              }
            />
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DeleteModal
        modalIsOpen={order.deleteModalIsOpen}
        entityName='Empleado'
        onClose={() => order.closeDeleteModal()}
        onDelete={() => {
          order.deleteActualOrder()
          order.closeDeleteModal()
        }}
      />
    </div>
  )
}

export default Order
