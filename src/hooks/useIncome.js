import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllIncomes,
  setActualIncome,
  createIncome,
  deleteIncome,
  updateIncome
} from '../reducers/incomes'
import { getAllClients } from '../reducers/clients'
import { getAllOrders } from '../services/orderService'
import * as toast from '../services/toastService'
import { changeAction, changeEntity } from '../reducers/crud'

export const useIncome = () => {
  const dispatch = useDispatch()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false)

  const [client, setClient] = useState({})
  const [clientId, setClientId] = useState('')
  const [order, setOrder] = useState({})
  const [orderId, setOrderId] = useState('')

  const [accountingSeat, setAccountingSeat] = useState('')
  const [date, setDate] = useState('')
  const [concept, setConcept] = useState('')
  const [amount, setAmount] = useState('')

  const [isSubmited, setIsSubmited] = useState(false)

  const [ordersList, setOrdersList] = useState([])

  const action = useSelector(state => state.crud.action)

  const actualIncome = useSelector(state => state.incomes.actualIncome)

  const incomesList = useSelector(state => {
    return state.incomes.data.filter(param => param.isVisible === true)
  })

  const clientsList = useSelector(state => {
    return state.clients.data.filter(param => param.isVisible === true)
  })

  useEffect(() => {
    dispatch(getAllIncomes())
    if (clientsList.length === 0) {
      dispatch(getAllClients())
    }
    if (ordersList.length === 0) {
      getAllOrders().then(element => {
        setOrdersList(element)
      })
    }
    dispatch(changeEntity({ entity: 'income', entityName: 'ingreso' }))
  }, [dispatch])


  useEffect(() => {
    setOrder({})
    setOrderId('')
  },[clientId])

  const changeActionRedux = action => {
    dispatch(changeAction(action))
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const emptyFields = () => {
    setAccountingSeat('')
    setClient({})
    setClientId('')
    setOrder({})
    setOrderId('')
    setDate('')
    setConcept('')
    setAmount('')
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

  const filterAtSelectClient = order => {
    if (clientId !== '') {
      return order.orderClient._id === clientId
    }
  }

  const deleteActualIncome = () => {
    dispatch(deleteIncome(actualIncome)).then(status => {
      if (status) {
        toast.invetorySuccess('Ingreso eliminado con éxito')
      } else {
        toast.inventoryError('Error al eliminar ingreso')
      }
    })
  }

  const setActualIncomeRedux = data => {
    dispatch(setActualIncome(data))
  }

  const onClickSave = e => {
    e.preventDefault()
    setIsSubmited(true)
    if (
      accountingSeat !== '' &&
      clientId !== '' &&
      orderId !== '' &&
      date !== '' &&
      amount !== '' &&
      concept !== ''
    ) {
      dispatch(
        createIncome({
          accountingSeat,
          client: clientId,
          order: orderId,
          date,
          amount,
          concept
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Ingreso creado con éxito')
        } else {
          toast.inventoryError('Error al registrar ingreso')
        }
      })
      closeModal()
    }
  }

  const onEditSave = e => {
    e.preventDefault()
    setIsSubmited(true)
    if (
      accountingSeat !== '' &&
      clientId !== '' &&
      orderId !== '' &&
      date !== '' &&
      amount !== '' &&
      concept !== ''
    ) {
      dispatch(
        updateIncome({
          ...actualIncome,
          accountingSeat,
          client: clientId,
          order: orderId,
          date,
          amount,
          concept
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Ingreso editado con éxito')
        } else {
          toast.inventoryError('Error al editar ingreso')
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
    setActualIncomeRedux,

    client,
    setClient,
    clientId,
    setClientId,
    order,
    setOrder,
    orderId,
    setOrderId,

    accountingSeat,
    setAccountingSeat,
    date,
    setDate,
    concept,
    setConcept,
    amount,
    setAmount,

    isSubmited,
    incomesList,
    changeActionRedux,
    deleteActualIncome,
    onClickSave,
    onEditSave,

    viewModalIsOpen,
    setViewModalIsOpen,

    ordersList,
    clientsList,

    filterAtSelectClient
  }
}
