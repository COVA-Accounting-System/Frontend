import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  changeStateBackward,
  changeStateForward
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

  const [changeStateModalIsOpen, setChangeStateModalIsOpen] = useState(false)
  const [actualStateNumber, setActualStateNumber] = useState(0)

  const [ordersList, setOrdersList] = useState([])
  const [actualOrder, setActualOrder] = useState({})
  const [action, setAction] = useState('')

  const [orderClient, setOrderClient] = useState({})
  const [orderClientId, setOrderClientId] = useState('')
  const [orderProduct, setOrderProduct] = useState({})
  const [orderProductId, setOrderProductId] = useState('')

  const [inventoryOutput, setInventoryOutput] = useState({})
  // const [inventoryOutputId, setInventoryOutputId] = useState('')

  const [orderNumber, setOrderNumber] = useState('')
  const [orderProductAmount, setOrderProductAmount] = useState('')
  const [orderProductAmountType, setOrderProductAmountType] = useState('')
  const [orderPrice, setOrderPrice] = useState('')

  const [orderDeliveryDate, setOrderDeliveryDate] = useState('')

  const [orderState, setOrderState] = useState('')
  const [orderStateNumber, setOrderStateNumber] = useState(0)

  const [filterByState, setFilterByState] = useState({
    pending: true,
    inProgress: true,
    ready: true,
    delivered: true
  })

  const [orderFeatures, setOrderFeatures] = useState([])

  const [isSubmited, setIsSubmited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  // useEffect(() => {
  // console.log(filterByState)
  // },[filterByState])

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

  useEffect(() => {
    console.log(actualStateNumber)
  }, [actualStateNumber])

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

  const deleteActualOrder = async () => {
    setIsLoading(true)
    try {
      const deletedOrder = await deleteOrder(actualOrder)

      const newList = ordersList.map(order => {
        if (order._id === deletedOrder.data._id) {
          return { ...deletedOrder.data }
        }
        return order
      })
      setOrdersList(newList)
      closeDeleteModal()
      toast.invetorySuccess('Pedido eliminado con éxito')
    } catch {
      toast.inventoryError('Error al eliminar pedido')
    }
    setIsLoading(false)
  }

  const onMoveBackwardState = async data => {
    try {
      const updatedOrder = await changeStateBackward(data)
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
    } catch {
      toast.inventoryError(
        `Error al mover a "${orderAsset[data.orderStateNumber].stateSpanish}"`
      )
    }
  }

  const onMoveForwardState = async data => {
    try {
      const updatedOrder = await changeStateForward(data)
      toast.invetorySuccess(
        `Pedido movido a "${
          orderAsset[updatedOrder.data.orderStateNumber - 1].stateSpanish
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
    } catch {
      toast.inventoryError(
        `Error al mover a "${
          orderAsset[data.orderStateNumber + 1].stateSpanish
        }"`
      )
    }
  }

  const onClickSave = async e => {
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
      setIsLoading(true)
      try {
        const newOrder = await createOrder({
          orderClient: orderClientId,
          orderProduct: orderProductId,
          orderNumber,
          orderProductAmount,
          orderProductAmountType,
          orderPrice,
          orderState: 'On hold',
          orderStateNumber: 0,
          orderPaidState: 'Not paid',
          orderPaidStateNumber: 0,
          orderPrePayedPrice: 0,
          orderPayedPrice: 0,
          orderBalance: orderPrice,
          orderMaterialCosts: 0,
          orderCreationDate: new Date(),
          orderDeliveryDate,
          uiName: `Pedido #${orderNumber} - ${orderProduct.uiName}`,
          orderFeatures: [...orderFeatures]
        })

        setOrdersList([...ordersList, newOrder.data])
        closeModal()
        toast.invetorySuccess('Pedido registrado con éxito')
      } catch {
        toast.inventoryError('Error al registrar pedido')
      }
      setIsLoading(false)
    }
  }

  const onEditState = async () => {
    setIsLoading(true)
    try {
      const updatedOrder = await updateOrder({
        ...actualOrder,
        orderStateNumber: actualStateNumber,
        orderState: orderAsset[actualStateNumber].state,
      })

      const newList = ordersList.map(order => {
        if (order._id === updatedOrder.data._id) {
          return { ...updatedOrder.data }
        }
        return order
      })
      setOrdersList(newList)
      setChangeStateModalIsOpen(false)
      toast.invetorySuccess('Estado editado con éxito')
    } catch {
      toast.inventoryError('Error al editar estado')
    }
    setIsLoading(false)
  }

  const onEditSave = async e => {
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
      setIsLoading(true)
      try {
        const updatedOrder = await updateOrder({
          ...actualOrder,
          orderClient: orderClientId,
          orderProduct: orderProductId,
          orderNumber,
          orderStateNumber,
          orderState: orderAsset[orderStateNumber].state,
          orderProductAmount,
          orderProductAmountType,
          orderPrice,
          orderDeliveryDate,
          uiName: `Pedido #${orderNumber} - ${orderProduct.uiName}`,
          orderFeatures: [...orderFeatures]
        })

        const newList = ordersList.map(order => {
          if (order._id === updatedOrder.data._id) {
            return { ...updatedOrder.data }
          }
          return order
        })
        setOrdersList(newList)
        closeModal()
        toast.invetorySuccess('Pedido editado con éxito')
      } catch {
        toast.inventoryError('Error al editar pedido')
      }
      setIsLoading(false)
    }
  }

  return {
    action,
    setAction,
    ordersList,
    actualOrder,
    setActualOrder,
    modalIsOpen,
    openModal,
    closeModal,
    closeDeleteModal,
    deleteModalIsOpen,
    setDeleteModalIsOpen,
    isLoading,
    setIsLoading,

    orderClient,
    setOrderClient,
    orderClientId,
    setOrderClientId,
    orderProduct,
    setOrderProduct,
    orderProductId,
    setOrderProductId,
    inventoryOutput,
    setInventoryOutput,

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
    onEditSave,
    filterByState,
    setFilterByState,

    actualStateNumber,
    setActualStateNumber,
    changeStateModalIsOpen,
    setChangeStateModalIsOpen,

    orderStateNumber,
    setOrderStateNumber,
    onEditState
  }
}
