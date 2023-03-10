import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllOrders,
  setActualOrder,
  createOrder,
  deleteOrder,
  updateOrder,
  changeStateForward,
  changeStateBackward
} from '../reducers/orders'
import { getAllClients } from '../reducers/clients'
import { getAllProducts } from '../reducers/products'
import * as toast from '../services/toastService'
import { changeAction, changeEntity } from '../reducers/crud'

import { orderState as orderAsset } from '../assets/orderState'

export const useOrder = () => {
  const dispatch = useDispatch()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)

  const [orderClient, setOrderClient] = useState({})
  const [orderNumber, setOrderNumber] = useState('')
  const [orderProduct, setOrderProduct] = useState({})
  const [orderProductAmount, setOrderProductAmount] = useState('')
  const [orderProductAmountType, setOrderProductAmountType] = useState('')
  const [orderPrice, setOrderPrice] = useState('')

  const [orderDeliveryDate, setOrderDeliveryDate] = useState('')

  const [orderState, setOrderState] = useState('pending')
  const [orderFeatures, setOrderFeatures] = useState([])

  const [isSubmited, setIsSubmited] = useState(false)
  const action = useSelector(state => state.crud.action)

  const clientsList = useSelector(state => {
    return state.clients.data.filter(param => param.isVisible === true)
  })
  const productsList = useSelector(state => {
    return state.products.data.filter(param => param.isVisible === true)
  })

  const actualOrder = useSelector(state => state.orders.actualOrder)
  const ordersList = useSelector(state => {
    return state.orders.data.filter(param => param.isVisible === true)
  })

  useEffect(() => {
    dispatch(getAllOrders())
    dispatch(getAllClients())
    dispatch(getAllProducts())
    dispatch(changeEntity({ entity: 'order', entityName: 'pedido' }))
  }, [dispatch])

  // useEffect(() => {

  //     if (orderProductAmountType === 'Unidad') {
  //       if (orderProductAmount !== '' && orderProduct.productPrice !== '') {
  //         setOrderPrice(() => orderProductAmount * orderProduct.productPrice)
  //       }
  //     }

  //     if (orderProductAmountType === 'Par') {
  //       if (orderProductAmount !== '' && orderProduct.productPrice !== '') {
  //         setOrderPrice(() => orderProductAmount * orderProduct.productPrice)
  //       }
  //     }

  //     if (orderProductAmountType === 'Docena') {
  //       if (
  //         orderProductAmount !== '' &&
  //         orderProduct.productDozenPrice !== ''
  //       ) {
  //         setOrderPrice(
  //           () => orderProductAmount * orderProduct.productDozenPrice
  //         )
  //       }
  //     }

  // }, [orderProductAmount, orderProduct, orderProductAmountType])

  const changeActionRedux = action => {
    dispatch(changeAction(action))
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const emptyFields = () => {
    setOrderClient({})
    setOrderNumber('')
    setOrderProduct({})
    setOrderProductAmount('')
    setOrderPrice('')
    setOrderDeliveryDate('')
    setOrderProductAmountType('')

    setOrderState('')
    setOrderFeatures([])
  }

  const closeModal = () => {
    setModalIsOpen(false)
    emptyFields()
    setIsSubmited(false)
  }

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false)
    emptyFields()
    setIsSubmited(false)
  }

  const deleteActualOrder = () => {
    dispatch(deleteOrder(actualOrder)).then(status => {
      if (status) {
        toast.invetorySuccess('Pedido eliminado con éxito')
      } else {
        toast.inventoryError('Error al eliminar pedido')
      }
    })
  }

  const setActualOrderRedux = data => {
    dispatch(setActualOrder(data))
  }

  const onMoveForwardState = data => {
    dispatch(changeStateForward(data)).then(resp => {
      const { status, orderStateNumber } = resp
      if (status) {
        toast.invetorySuccess(
          `Pedido movido a "${orderAsset[orderStateNumber].stateSpanish}"`
        )
      } else {
        toast.inventoryError(
          `Error al mover a "${orderAsset[orderStateNumber].stateSpanish}"`
        )
      }
    })
  }

  const onMoveBackwardState = data => {
    dispatch(changeStateBackward(data)).then(resp => {
      const { status, orderStateNumber } = resp
      if (status) {
        toast.invetorySuccess(
          `Pedido movido a "${orderAsset[orderStateNumber].stateSpanish}"`
        )
      } else {
        toast.inventoryError(
          `Error al mover a "${orderAsset[orderStateNumber].stateSpanish}"`
        )
      }
    })
  }

  const onClickSave = e => {
    e.preventDefault()
    setIsSubmited(true)
    if (
      orderClient !== {} &&
      orderNumber !== '' &&
      orderProduct !== {} &&
      orderPrice !== ''
    ) {
      dispatch(
        createOrder({
          orderClient: {
            _id: orderClient._id,
            uiName: orderClient.uiName
          },
          orderProduct: {
            _id: orderProduct._id,
            uiName: orderProduct.uiName,
            productType: orderProduct.productType
            // productPrice: orderProduct.productPrice,
            // productDozenPrice: orderProduct.productDozenPrice
          },
          orderNumber,
          orderProductAmount,
          orderProductAmountType,
          orderPrice,
          orderCreationDate: new Date(),
          orderDeliveryDate,
          orderState,
          orderFeatures: [...orderFeatures]
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Pedido creado con éxito')
        } else {
          toast.inventoryError('Error al crear pedido')
        }
      })
      closeModal()
    }
  }

  const onEditSave = e => {
    e.preventDefault()
    setIsSubmited(true)
    if (
      orderClient !== {} &&
      orderNumber !== '' &&
      orderProduct !== {} &&
      orderPrice !== ''
    ) {
      dispatch(
        updateOrder({
          ...actualOrder,
          orderClient: {
            uiName: orderClient.uiName,
            _id: orderClient._id
          },
          orderProduct: {
            _id: orderProduct._id,
            uiName: orderProduct.uiName,
            productType: orderProduct.productType
            // productPrice: orderProduct.productPrice,
            // productDozenPrice: orderProduct.productDozenPrice
          },
          orderNumber,
          orderProductAmount,
          orderProductAmountType,
          orderPrice,
          orderDeliveryDate,
          orderFeatures: [...orderFeatures]
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Pedido editado con éxito')
        } else {
          toast.inventoryError('Error al editar pedido')
        }
      })
      closeModal()
    }
  }

  return {
    action,
    modalIsOpen,
    openModal,
    closeModal,
    closeDeleteModal,
    deleteModalIsOpen,
    setDeleteModalIsOpen,
    setActualOrderRedux,

    orderClient,
    setOrderClient,
    orderNumber,
    setOrderNumber,
    orderProduct,
    setOrderProduct,
    orderProductAmount,
    setOrderProductAmount,
    orderProductAmountType,
    setOrderProductAmountType,
    orderPrice,
    setOrderPrice,
    orderDeliveryDate,
    setOrderDeliveryDate,
    orderState,
    setOrderState,
    orderFeatures,
    setOrderFeatures,

    onMoveBackwardState,
    onMoveForwardState,
    isSubmited,
    ordersList,
    clientsList,
    productsList,
    changeActionRedux,
    deleteActualOrder,
    onClickSave,
    onEditSave
  }
}
