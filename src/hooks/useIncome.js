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

  const [page, setPage] = useState(0)
  const [incomeTypes, setIncomeTypes] = useState({
    Prepayment: false,
    Payment: false
  })
  // const [viewModalIsOpen, setViewModalIsOpen] = useState(false)

  const [client, setClient] = useState({})
  const [clientId, setClientId] = useState('')
  const [order, setOrder] = useState({})
  const [orderId, setOrderId] = useState('')
  const [typeOfIncome, setTypeOfIncome] = useState('')

  const [accountingSeat, setAccountingSeat] = useState('')
  const [date, setDate] = useState('')
  const [concept, setConcept] = useState('')
  const [amount, setAmount] = useState('')
  const [oldAmount, setOldAmount] = useState('')

  const [isSubmited, setIsSubmited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
    if (clientId !== '' && orderId !== '') {
      if (clientId !== order.orderClient._id) {
        setOrder({})
        setOrderId('')
      }
    }
  }, [clientId])

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
    setPage(0)
    setTypeOfIncome('')
    setIncomeTypes({
      Prepayment: false,
      Payment: false
    })
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

  const filterAtSelectClientPrepayment = order => {
    if (clientId !== '') {
      return order.orderClient._id === clientId && order.orderStateNumber !== 3
    }
  }

  const filterAtSelectClientPayment = order => {
    if (clientId !== '') {
      return order.orderClient._id === clientId && order.orderStateNumber === 3
    }
  }

  const deleteActualIncome = async () => {
    setIsLoading(true)
    await dispatch(deleteIncome(actualIncome)).then(status => {
      if (status) {
        toast.invetorySuccess('Ingreso eliminado con éxito')
        closeDeleteModal()
      } else {
        toast.inventoryError('Error al eliminar ingreso')
      }
      getAllOrders().then(element => {
        setOrdersList(element)
      })
      dispatch(getAllIncomes())
    })
    setIsLoading(false)
  }

  const setActualIncomeRedux = data => {
    dispatch(setActualIncome(data))
  }

  const onClickSave = async e => {
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
      setIsLoading(true)
      await dispatch(
        createIncome({
          accountingSeat,
          client: clientId,
          order: orderId,
          typeOfIncome,
          date,
          amount,
          concept
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Ingreso registrado con éxito')
          getAllOrders().then(element => {
            setOrdersList(element)
          })
          dispatch(getAllIncomes())
          closeModal()
        } else {
          toast.inventoryError('Error al registrar ingreso')
        }
      })
      setIsLoading(false)
    }
  }

  const onEditSave = async e => {
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
      setIsLoading(true)
      await dispatch(
        updateIncome({
          ...actualIncome,
          accountingSeat,
          typeOfIncome,
          client: clientId,
          order: orderId,
          date,
          amount,
          concept
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Ingreso editado con éxito')
          getAllOrders().then(element => {
            setOrdersList(element)
          })
          dispatch(getAllIncomes())
          closeModal()
        } else {
          toast.inventoryError('Error al editar ingreso')
        }
      })
      setIsLoading(false)
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

    // viewModalIsOpen,
    // setViewModalIsOpen,

    ordersList,
    clientsList,
    oldAmount,
    setOldAmount,

    page,
    setPage,

    filterAtSelectClientPayment,
    filterAtSelectClientPrepayment,

    isLoading,
    incomeTypes,
    setIncomeTypes,
    emptyFields,

    typeOfIncome,
    setTypeOfIncome
  }
}
