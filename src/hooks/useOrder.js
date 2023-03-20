import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  changeStateBackward,
  changeStateForward,
  getOneOrder
} from '../services/orderService'
import { getAllClients } from '../reducers/clients'
import { getAllProducts } from '../reducers/products'
import * as toast from '../services/toastService'
import { changeEntity } from '../reducers/crud'

import { orderState as orderAsset } from '../assets/orderState'

export const useOrder = () => {
  const dispatch = useDispatch()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [ordersList, setOrdersList] = useState([])
  const [actualOrder, setActualOrder] = useState({})
  const [action, setAction] = useState('')

  const [orderClient, setOrderClient] = useState({})
  const [orderClientId, setOrderClientId] = useState('')
  const [orderProduct, setOrderProduct] = useState({})
  const [orderProductId, setOrderProductId] = useState('')

  const [orderNumber, setOrderNumber] = useState('')
  const [orderProductAmount, setOrderProductAmount] = useState('')
  const [orderProductAmountType, setOrderProductAmountType] = useState('')
  const [orderPrice, setOrderPrice] = useState('')

  const [orderDeliveryDate, setOrderDeliveryDate] = useState('')

  const [orderState, setOrderState] = useState('pending')
  const [orderFeatures, setOrderFeatures] = useState([])

  const [isSubmited, setIsSubmited] = useState(false)

  const clientsList = useSelector(state => {
    return state.clients.data.filter(param => param.isVisible === true)
  })
  const productsList = useSelector(state => {
    return state.products.data.filter(param => param.isVisible === true)
  })

  // const actualOrder = useSelector(state => state.orders.actualOrder)

  // const ordersList = useSelector(state => {
  //   return state.orders.data.filter(param => param.isVisible === true)
  // })

  // useEffect(() => {
  //   dispatch(getAllOrders())
  //   dispatch(getAllClients())
  //   dispatch(getAllProducts())
  //   dispatch(changeEntity({ entity: 'order', entityName: 'pedido' }))
  // }, [dispatch])

  useEffect(() => {
    if (clientsList.length === 0) {
      dispatch(getAllClients())
    }
    if (productsList.length === 0) {
      dispatch(getAllProducts())
    }

    dispatch(changeEntity({ entity: 'order', entityName: 'pedido' }))

    getAllOrders().then(element => {
      setOrdersList(element)
      console.log(element)
    })
  }, [])

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

  const openModal = () => {
    setModalIsOpen(true)
  }

  const emptyFields = () => {
    setOrderClient({})
    setOrderClientId('')
    setOrderProduct({})
    setOrderProductId('')

    setOrderNumber('')
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
    deleteOrder(actualOrder).then(deletedOrder => {
      if (deletedOrder.status === 200) {
        toast.invetorySuccess('Pedido eliminado con éxito')
        const newList = ordersList.map(order => {
          if (order._id === deletedOrder.data._id) {
            return { ...deletedOrder.data }
          }
          return order
        })
        setOrdersList(newList)
      } else {
        toast.inventoryError('Error al eliminar pedido')
      }
    })
  }

  const onMoveBackwardState = async data => {
    const updatedOrder = await changeStateBackward(data)
    if (updatedOrder.status === 200) {
      toast.invetorySuccess(
        `Pedido movido a "${
          orderAsset[updatedOrder.data.orderStateNumber].stateSpanish
        }"`
      )
      setOrdersList(prevList => {
        return prevList.map(order => {
          if (order._id === updatedOrder.data._id) {
            return { ...updatedOrder.data }
          }
          return order
        })
      })
    } else {
      toast.inventoryError(
        `Error al mover a "${
          orderAsset[updatedOrder.data.orderStateNumber].stateSpanish
        }"`
      )
    }
  }

  const onMoveForwardState = async data => {
    const updatedOrder = await changeStateForward(data)
    if (updatedOrder.status === 200) {
      toast.invetorySuccess(
        `Pedido movido a "${
          orderAsset[updatedOrder.data.orderStateNumber].stateSpanish
        }"`
      )
      setOrdersList(prevList => {
        return prevList.map(order => {
          if (order._id === updatedOrder.data._id) {
            return { ...updatedOrder.data }
          }
          return order
        })
      })
    } else {
      toast.inventoryError(
        `Error al mover a "${
          orderAsset[updatedOrder.data.orderStateNumber].stateSpanish
        }"`
      )
    }
  }

  const onClickSave = e => {
    e.preventDefault()
    setIsSubmited(true)
    if (
      orderClientId !== '' &&
      orderNumber !== '' &&
      orderProductId !== '' &&
      orderPrice !== '' &&
      orderProductAmount !== '' &&
      orderDeliveryDate !== ''
    ) {
      createOrder({
        orderClient: orderClientId,
        orderProduct: orderProductId,
        orderNumber,
        orderProductAmount,
        orderProductAmountType,
        orderPrice,
        orderCreationDate: new Date(),
        orderDeliveryDate,
        orderState,
        uiName: `Pedido #${orderNumber}`,
        orderFeatures: [...orderFeatures]
      }).then(newOrder => {
        if (newOrder.status === 200) {
          toast.invetorySuccess('Pedido creado con éxito')
          setOrdersList([...ordersList, newOrder.data])
        } else {
          toast.inventoryError('Error al registrar pedido')
        }
      })
      closeModal()
    }
  }

  const onEditSave = e => {
    e.preventDefault()
    setIsSubmited(true)
    if (
      orderClientId !== '' &&
      orderNumber !== '' &&
      orderProductId !== '' &&
      orderPrice !== '' &&
      orderProductAmount !== '' &&
      orderDeliveryDate !== ''
    ) {
      updateOrder({
        ...actualOrder,
        orderClient: orderClientId,
        orderProduct: orderProductId,
        orderNumber,
        orderProductAmount,
        orderProductAmountType,
        orderPrice,
        orderDeliveryDate,
        uiName: `Pedido #${orderNumber} - ${orderProduct.uiName}`,
        orderFeatures: [...orderFeatures]
      }).then(updatedOrder => {
        if (updatedOrder.status === 200) {
          toast.invetorySuccess('Pedido editado con éxito')
          const newList = ordersList.map(order => {
            if (order._id === updatedOrder.data._id) {
              return { ...updatedOrder.data }
            }
            return order
          })
          setOrdersList(newList)
        } else {
          toast.inventoryError('Error al editar pedido')
        }
      })
      closeModal()
    }
  }

  return {
    action,
    setAction,
    ordersList,
    setActualOrder,
    modalIsOpen,
    openModal,
    closeModal,
    closeDeleteModal,
    deleteModalIsOpen,
    setDeleteModalIsOpen,

    orderClient,
    setOrderClient,
    orderClientId,
    setOrderClientId,
    orderProduct,
    setOrderProduct,
    orderProductId,
    setOrderProductId,

    orderNumber,
    setOrderNumber,
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
    // ordersList,

    clientsList,
    productsList,
    deleteActualOrder,
    onClickSave,
    onEditSave
  }
}
