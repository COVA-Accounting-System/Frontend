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
import DataTableActionsOrder from '../../../components/DataTableActions/DataTableActionsOrder'
import TextFormControl from '../../../components/Input/TextFormControl'
import DateFormControl from '../../../components/Input/DateFormControl'
import SelectEntityFormControl from '../../../components/Input/SelectEntityFormControl'
import PriceFormControl from '../../../components/Input/PriceFormControl'
import FeaturesFormControl from '../../../components/Input/FeaturesFormControl'
import InputWithSelectFormControl from '../../../components/Input/InputWithSelectFormControl'
import DeleteModal from '../../../components/DeleteModal/DeleteModal'
import Table from '../../../components/Table/Table'
import { Button } from '../../../components/Button/Button'
import StateTag from '../../../components/StateTags/StateTag'
import SearchByState from '../../../components/SearchInputs/SearchByState'
import OrderPaidTag from '../../../components/OrderPaidTag/OrderPaidTag'

import { orderState } from '../../../assets/orderState'

// HOOKS IMPORTS
import { useOrder } from '../../../hooks/useOrder'

// STYLES IMPORTS
import '../Template.styles.scss'

const Order = () => {
  const gridRef = useRef()
  const order = useOrder()
  //pass ref to custom hook
  // const orderState = useOrderState(gridRef.current)

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Estado',
        // field: 'orderState',
        resizable: true,
        sortable: true,
        width: 160,
        cellRenderer: StateTag,
        unSortIcon: true,
        valueGetter: data => {
          return orderState[data.data.orderStateNumber].stateSpanish
        },
      },
      {
        headerName: 'Nº de pedido',
        field: 'orderNumber',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        width: 160
        // minWidth: 120,
        // maxWidth: 250,
      },
      {
        headerName: 'Cliente',
        field: 'orderClient.uiName',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        // minWidth: 130,
        width: 250
        // maxWidth: 250,
      },
      {
        headerName: 'Producto',
        field: 'orderProduct.uiName',
        resizable: true,
        sortable: true,
        unSortIcon: true,
      },
      {
        headerName: 'Fecha de entrega',
        field: 'orderDeliveryDate',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        valueGetter: data => {
          return new Date(data.data.orderDeliveryDate).toLocaleDateString()
        },
        // minWidth: 60,
        // maxWidth: 160,
      },
      {
        headerName: 'Estado de pago',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        cellRenderer: OrderPaidTag
        // minWidth: 110,
        // maxWidth: 160,
      },
      {
        headerName: 'Precio total',
        field: 'orderPrice',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        valueGetter: data => {
          return `${data.data.orderPrice} Bs.`
        },
      },
      {
        headerName: 'Monto pagado',
        field: 'orderPayedPrice',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        valueGetter: data => {
          return `${data.data.orderPayedPrice} Bs.`
        },
      },
      {
        headerName: 'Saldo',
        field: 'orderBalance',
        resizable: true,
        sortable: true,
        unSortIcon: true,
        valueGetter: data => {
          return `${data.data.orderBalance} Bs.`
        },
      },
      {
        headerName: ' ',
        resizable: false,
        pinned: 'right',
        maxWidth: 160,
        cellRenderer: DataTableActionsOrder,
        colId: 'Actions',
        cellRendererParams: {
          onView: () => {},
          onEdit: data => {
            order.setOrderFeatures(data.orderFeatures)
            order.setOrderState(data.orderState)
            order.setOrderNumber(data.orderNumber)
            order.setOrderClient(data.orderClient)
            order.setOrderClientId(data.orderClient._id)
            order.setOrderProduct(data.orderProduct)
            order.setOrderProductId(data.orderProduct._id)
            order.setOrderDeliveryDate(data.orderDeliveryDate)
            order.setOrderPrice(data.orderPrice)
            order.setOrderProductAmountType(data.orderProductAmountType)
            order.setOrderProductAmount(data.orderProductAmount)

            // order.changeActionRedux('edit')
            order.setAction('edit')
            order.setActualOrder(data)
            order.openModal()
          },
          onDelete: data => {
            order.setDeleteModalIsOpen(true)
            order.setActualOrder(data)
            // order.deleteActualOrder(data)
          },
          onChangeStateBackward: data => {
            order.onMoveBackwardState(data)
          },
          onChangeStateForward: data => {
            order.onMoveForwardState(data)
          },
          onRegisterMaterial: data => {

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
          <section className='task-bar-datatable-production'>
            <div className='input-container-production'>
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
              <div className='search-by-state-container'>
                <SearchByState />
              </div>
            </div>

            <div className='button-container'>
              <Button
                label='Registrar pedido'
                type='login'
                system='accounting'
                onClick={() => {
                  order.openModal()
                  order.setAction('create')
                  // order.changeActionRedux('create')
                }}
              />
            </div>
          </section>
          <section className='table-section'>
            <Table
              gridRef={gridRef}
              gridOptions={gridOptions}
              rowData={
                order.ordersList
                  ? order.ordersList.filter(param => param.isVisible === true)
                  : []
              }
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
        <ModalContent userSelect='none' maxW='750px'>
          <ModalHeader
            color='acsys.titleColor'
            fontWeight='700'
            fontSize='25px'
          >
            {order.action === 'create' ? 'Registrar pedido' : 'Editar pedido'}
          </ModalHeader>
          <ModalCloseButton color={'acsys.titleColor'} />

          <ModalBody pb={0}>
            <form className='three-rows-grid'>
              <div className='two-column-grid'>
                <SelectEntityFormControl
                  labelName='Cliente'
                  paddingSpace={0}
                  value={order.orderClient}
                  width='330px'
                  onSelect={data => {
                    order.setOrderClient(data)
                    order.setOrderClientId(data._id)
                  }}
                  isSubmited={order.isSubmited}
                  entityList={order.clientsList}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
                <TextFormControl
                  labelName='Nº de pedido'
                  width='330px'
                  paddingSpace={0}
                  value={order.orderNumber}
                  onInput={data => order.setOrderNumber(data)}
                  isSubmited={order.isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
              </div>
              {/* <Divider mt={5} mb={-1} /> */}
              <div className='two-column-grid'>
                <div>
                  <SelectEntityFormControl
                    labelName='Producto'
                    paddingSpace={4}
                    value={order.orderProduct}
                    onSelect={data => {
                      order.setOrderProduct(data)
                      order.setOrderProductId(data._id)
                      order.setOrderProductAmountType(data.productType)
                    }}
                    isSubmited={order.isSubmited}
                    entityList={order.productsList}
                    isRequired={true}
                    isRequiredMessage='Este campo es obligatorio'
                  />
                  <InputWithSelectFormControl
                    labelName='Cantidad'
                    width='330px'
                    paddingSpace={4}
                    onChangeType={data => {
                      order.setOrderProductAmountType(data)
                    }}
                    type={order.orderProduct.productType}
                    valueType={order.orderProductAmountType}
                    valueAmount={order.orderProductAmount}
                    onInput={data => {
                      order.setOrderProductAmount(data)
                    }}
                    isRequired={true}
                    isRequiredMessage='Este campo es obligatorio'
                    isSubmited={order.isSubmited}
                  />
                  <PriceFormControl
                    labelName={`Precio total`}
                    width='330px'
                    value={order.orderPrice}
                    onInput={data => {
                      order.setOrderPrice(data)
                    }}
                    isRequired={true}
                    isRequiredMessage='Este campo es obligatorio'
                    isSubmited={order.isSubmited}
                  />
                  <DateFormControl
                    labelName='Fecha de entrega'
                    width='330px'
                    paddingSpace={4}
                    value={order.orderDeliveryDate}
                    onInput={data => order.setOrderDeliveryDate(data)}
                    isRequired={true}
                    isRequiredMessage='Este campo es obligatorio'
                    isSubmited={order.isSubmited}
                  />
                </div>
                <div>
                  <FeaturesFormControl
                    listOfFeatures={order.orderFeatures}
                    onAddFeature={data => {
                      order.setOrderFeatures(data)
                    }}
                    onRemoveFeature={data => {
                      order.setOrderFeatures(data)
                    }}
                    onEditFeature={data => { 
                      order.setOrderFeatures(data)
                    }}
                    marginTop={4}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end'
                  }}
                ></div>
              </div>
            </form>
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
        entityName='Pedido'
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
