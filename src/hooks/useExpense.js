import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  setActualExpense
} from '../reducers/expenses'

import { getAllProviders } from '../reducers/providers' 
import { getAllEmployees } from '../reducers/employees'


import * as toast from '../services/toastService'
import { changeAction, changeEntity } from '../reducers/crud'

export const useExpense = () => {
  const dispatch = useDispatch()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false)

  const [creditorEmployee, setCreditorEmployee] = useState({})
  const [creditorEmployeeId, setCreditorEmployeeId] = useState('')
  const [creditorProvider, setCreditorProvider] = useState({})
  const [creditorProviderId, setCreditorProviderId] = useState('')

  const [accountingSeat, setAccountingSeat] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [concept, setConcept] = useState('')
  const [amount, setAmount] = useState('')

  const [isSubmited, setIsSubmited] = useState(false)

  const action = useSelector(state => state.crud.action)

  const actualExpense = useSelector(state => state.expenses.actualExpense)

  const expensesList = useSelector(state => {
    return state.expenses.data.filter(param => param.isVisible === true)
  })

  const providersList = useSelector(state => {
    return state.providers.data.filter(param => param.isVisible === true)
  })

  const employeesList = useSelector(state => {
    return state.employees.data.filter(param => param.isVisible === true)
  })

  useEffect(() => {
    dispatch(getAllExpenses())
    if (providersList.length === 0) {
      dispatch(getAllProviders())
    }
    if (employeesList.length === 0) {
      dispatch(getAllEmployees())
    }
    dispatch(changeEntity({ entity: 'expense', entityName: 'gasto' }))
  }, [dispatch])

  // useEffect(() => {
  //   setOrder({})
  //   setOrderId('')
  // }, [clientId])

  const changeActionRedux = action => {
    dispatch(changeAction(action))
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const emptyFields = () => {

    setCreditorProvider({})
    setCreditorProviderId('')
    setCreditorEmployee({})
    setCreditorEmployeeId('')

    setAccountingSeat('')
    setCategory('')
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

  // const filterAtSelectClient = order => {
  //   if (clientId !== '') {
  //     return order.orderClient._id === clientId
  //   }
  // }

  const deleteActualExpense = () => {
    dispatch(deleteExpense(actualExpense)).then(status => {
      if (status) {
        toast.invetorySuccess('Gasto eliminado con éxito')
      } else {
        toast.inventoryError('Error al eliminar gasto')
      }
    })
  }

  const setActualExpenseRedux = data => {
    dispatch(setActualExpense(data))
  }

  const onClickSave = e => {
    e.preventDefault()
    setIsSubmited(true)
    // if (
    //   accountingSeat !== '' &&
    //   clientId !== '' &&
    //   orderId !== '' &&
    //   date !== '' &&
    //   amount !== '' &&
    //   concept !== ''
    // ) {
      dispatch(
        createExpense({
          accountingSeat,
          // client: clientId,
          // order: orderId,
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
    // }
  }

  const onEditSave = e => {
    e.preventDefault()
    setIsSubmited(true)
    // if (
    //   accountingSeat !== '' &&
    //   clientId !== '' &&
    //   orderId !== '' &&
    //   date !== '' &&
    //   amount !== '' &&
    //   concept !== ''
    // ) {
      dispatch(
        updateExpense({
          ...actualExpense,
          accountingSeat,
          // client: clientId,
          // order: orderId,
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
    // }
  }

  return {
    action,
    modalIsOpen,
    openModal,
    closeModal,
    closeDeleteModal,
    deleteModalIsOpen,
    setDeleteModalIsOpen,
    setActualExpenseRedux,

    creditorEmployee,
    setCreditorEmployee,
    creditorEmployeeId,
    setCreditorEmployeeId,

    creditorProvider,
    setCreditorProvider,
    creditorProviderId,
    setCreditorProviderId,

    accountingSeat,
    setAccountingSeat,
    category,
    setCategory,
    date,
    setDate,
    concept,
    setConcept,
    amount,
    setAmount,

    isSubmited,
    expensesList,
    changeActionRedux,
    deleteActualExpense,
    onClickSave,
    onEditSave,

    viewModalIsOpen,
    setViewModalIsOpen,
  }
}
