import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllOrders,
  setActualOrder,
  createOrder,
  deleteOrder,
  updateOrder
} from '../reducers/orders'
import { getAllClients } from '../reducers/clients'
import { getAllProducts } from '../reducers/products'
import * as toast from '../services/toastService'
import { changeAction, changeEntity } from '../reducers/crud'

export const useOrder = () => {
  const dispatch = useDispatch()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)

  const [orderNumber, setOrderNumber] = useState('')
  const [orderDeliveryDate, setOrderDeliveryDate] = useState('')
  const [orderClient, setOrderClient] = useState({
    _id: '75456325522',
    name: 'Jacobo',
    lastName: 'Covarrubias Zapata'
  })
  const [orderState, setOrderState] = useState('pending')
  const [orderTotalPrice, setOrderTotalPrice] = useState('')
  const [orderList, setOrderList] = useState([
    {
      _id: '69995447453',
      name: 'iPhone 12 Pro',
      type: 'pair',
      price: 1200,
      dozenPrice: 12000,
    },
    {
      _id: '69995447453',
      name: 'iPhone 12 Pro',
      type: 'pair',
      price: 1200,
      dozenPrice: 12000,
    },
    {
      _id: '69995447453',
      name: 'iPhone 12 Pro',
      type: 'pair',
      price: 1200,
      dozenPrice: 12000,
    }
  ])

  const [isSubmited, setIsSubmited] = useState(false)
  const action = useSelector((state) => state.crud.action)

  const clientsList = useSelector((state) => {
    return state.clients.data.filter((param) => param.isVisible === true)
  })
  const productsList = useSelector((state) => {
    return state.products.data.filter((param) => param.isVisible === true)
  })

  const actualOrder = useSelector((state) => state.orders.actualOrder)
  const ordersList = useSelector((state) => {
    return state.orders.data.filter((param) => param.isVisible === true)
  })

  useEffect(() => {
    dispatch(getAllOrders())
    dispatch(getAllClients())
    dispatch(getAllProducts())
    dispatch(changeEntity({ entity: 'order', entityName: 'pedido' }))
  }, [dispatch])

  const changeActionRedux = (action) => {
    dispatch(changeAction(action))
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const emptyFields = () => {
    setOrderNumber('')
    setOrderDeliveryDate('')
    setOrderClient({})
    setOrderState('')
    setOrderTotalPrice('')
    setOrderList([])
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
    dispatch(deleteOrder(actualOrder)).then((status) => {
      if (status) {
        toast.invetorySuccess('Pedido eliminado con éxito')
      } else {
        toast.inventoryError('Error al eliminar pedido')
      }
    })
  }

  const setActualOrderRedux = (data) => {
    dispatch(setActualOrder(data))
  }

  const onClickSave = (e) => {
    e.preventDefault()
    setIsSubmited(true)
    if (orderClient !== {} && orderTotalPrice !== '' && orderNumber !== '') {
      dispatch(
        createOrder({
          orderClient,
          orderNumber,
          orderDeliveryDate,
          orderState,
          orderTotalPrice,
          orderList: [...orderList]
        })
      ).then((status) => {
        if (status) {
          toast.invetorySuccess('Pedido creado con éxito')
        } else {
          toast.inventoryError('Error al crear pedido')
        }
      })
      closeModal()
    }
  }

  const onEditSave = (e) => {
    e.preventDefault()
    setIsSubmited(true)
    if (orderClient !== {} && orderTotalPrice !== '' && orderNumber !== '') {
      dispatch(
        updateOrder({
          ...actualOrder,
          orderClient,
          orderNumber,
          orderDeliveryDate,
          orderState,
          orderTotalPrice,
          orderList: [...orderList]
        })
      ).then((status) => {
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
    orderDeliveryDate,
    setOrderDeliveryDate,
    orderNumber,
    setOrderNumber,
    orderState,
    setOrderState,
    orderTotalPrice,
    setOrderTotalPrice,
    orderList,
    setOrderList,
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
