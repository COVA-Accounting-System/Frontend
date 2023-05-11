import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  setActualExpense,
  createExpenseAndInventoryInput,
  editExpenseAndInventoryInput,
  deleteExpenseAndInventoryInput
} from '../reducers/expenses'

import {
  getConfig,
  addOneToExpenseReducer,
  addOneToInventoryInputReducer
} from '../reducers/config'
import { getAllProviders } from '../reducers/providers'
import { getAllEmployees } from '../reducers/employees'
import { getAllOrders } from '../services/orderService'

import * as toast from '../services/toastService'
import { changeAction, changeEntity } from '../reducers/crud'

export const useExpense = () => {
  const dispatch = useDispatch()

  const action = useSelector(state => state.crud.action)

  const actualExpense = useSelector(state => state.expenses.actualExpense)

  const expensesList = useSelector(state => {
    return state.expenses.data.filter(param => param.isVisible === true)
  })

  const expensesListForInventoryInput = useSelector(state => {
    return state.expenses.data.filter(
      param => param.isVisible === true && param.category === 'Materia prima'
    )
  })

  const providersList = useSelector(state => {
    return state.providers.data.filter(param => param.isVisible === true)
  })

  const employeesList = useSelector(state => {
    return state.employees.data.filter(param => param.isVisible === true)
  })

  const config = useSelector(state => state.config.config)

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [deleteRawMaterialModalIsOpen, setDeleteRawMaterialModalIsOpen] =
    useState(false)
  // const [viewModalIsOpen, setViewModalIsOpen] = useState(false)

  const [typeOfExpense, setTypeOfExpense] = useState({
    rawMaterial: false,
    labour: false,
    indirectCosts: false
  })

  const [creditorEmployee, setCreditorEmployee] = useState({})
  const [creditorEmployeeId, setCreditorEmployeeId] = useState('')
  const [creditorProvider, setCreditorProvider] = useState({})
  const [creditorProviderId, setCreditorProviderId] = useState('')
  const [creditorEntity, setCreditorEntity] = useState('')
  const [order, setOrder] = useState({})
  const [orderId, setOrderId] = useState('')

  const [inventoryInput, setInventoryInput] = useState({})
  const [inventoryInputId, setInventoryInputId] = useState('')

  const [accountingSeat, setAccountingSeat] = useState(0)
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [concept, setConcept] = useState('')
  const [amount, setAmount] = useState('')

  const [page, setPage] = useState(0)

  const [isSubmited, setIsSubmited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [ordersList, setOrdersList] = useState([])
  const [orderList, setOrderList] = useState([])

  useEffect(() => {
    dispatch(getAllExpenses())
    if (providersList.length === 0) {
      dispatch(getAllProviders())
    }
    if (employeesList.length === 0) {
      dispatch(getAllEmployees())
    }
    if (ordersList.length === 0) {
      getAllOrders().then(element => {
        setOrdersList(element)
        console.log(element)
      })
    }
    if (config.expenseNumber === 0) {
      dispatch(getConfig())
    }
 
    dispatch(changeEntity({ entity: 'expense', entityName: 'gasto' }))
  }, [dispatch])

  const changeActionRedux = action => {
    dispatch(changeAction(action))
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const setAccountingNumberFromConfig = () => {
    setAccountingSeat(Number(config.expenseNumber) + 1)
  }

  const emptyFields = () => {
    setCreditorProvider({})
    setCreditorProviderId('')
    setCreditorEmployee({})
    setCreditorEmployeeId('')
    setTypeOfExpense({
      rawMaterial: false,
      labour: false,
      indirectCosts: false
    })
    setPage(0)
    setAccountingSeat(0)
    setCategory('')
    setDate('')
    setConcept('')
    setAmount('')
    setCreditorEntity('')
    setOrder({})
    setOrderId('')
    setOrderList([])
    setIsSubmited(false)
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

  const closeDeleteRawMaterialModal = () => {
    setDeleteRawMaterialModalIsOpen(false)
    emptyFields()
    setIsSubmited(false)
  }

  const deleteActualExpenseRawMaterial = async closeInventoryModal => {
    setIsLoading(true)
    await dispatch(
      deleteExpenseAndInventoryInput(
        actualExpense,
        actualExpense.inventoryInput
      )
    ).then(status => {
      if (status) {
        toast.invetorySuccess('Gasto eliminado con éxito')
        toast.invetorySuccess('Entrada de inventario eliminada con éxito')
        closeDeleteRawMaterialModal()
        closeInventoryModal()
      } else {
        toast.inventoryError('Error al eliminar gasto')
        toast.invetorySuccess('Error al eliminar entrada de inventario')
      }
    })
    setIsLoading(false)
  }

  const deleteActualExpense = async () => {
    setIsLoading(true)
    await dispatch(deleteExpense(actualExpense)).then(status => {
      if (status) {
        toast.invetorySuccess('Gasto eliminado con éxito')
        closeDeleteModal()
      } else {
        toast.inventoryError('Error al eliminar gasto')
      }
    })
    setIsLoading(false)
  }

  const setActualExpenseRedux = data => {
    dispatch(setActualExpense(data))
  }

  const onClickSaveRawMaterial = async (inventoryData, closeModalInventory) => {
    setIsSubmited(true)
    if (
      accountingSeat !== '' &&
      creditorProviderId !== '' &&
      date !== '' &&
      amount !== '' &&
      concept !== ''
    ) {
      setIsLoading(true)

      const expenseData = {
        accountingSeat,
        category: 'Materia prima',
        creditorProvider: creditorProviderId,
        date,
        amount,
        concept
      }
      await dispatch(
        createExpenseAndInventoryInput(expenseData, inventoryData)
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Gasto registrado con éxito')
          toast.invetorySuccess('Entrada de inventario registrada con éxito')
          dispatch(addOneToExpenseReducer())
          dispatch(addOneToInventoryInputReducer())
          closeModal()
          closeModalInventory()
        } else {
          toast.inventoryError('Error al registrar gasto')
          toast.invetorySuccess('Error al registrar entrada de inventario')
        }
      })
      setIsLoading(false)
    }
  }

  const onClickSaveLabour = async e => {
    e.preventDefault()
    setIsSubmited(true)
    if (
      accountingSeat !== '' &&
      creditorEmployeeId !== '' &&
      date !== '' &&
      amount !== '' &&
      concept !== '' &&
      orderId !== ''
    ) {
      setIsLoading(true)
      await dispatch(
        createExpense({
          accountingSeat,
          category: 'Mano de obra directa',
          creditorEmployee: creditorEmployeeId,
          date,
          amount,
          concept,
          singleOrder: orderId
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Gasto registrado con éxito')
          dispatch(addOneToExpenseReducer())
          closeModal()
        } else {
          toast.inventoryError('Error al registrar gasto')
        }
      })
      setIsLoading(false)
    }
  }

  const onClickSaveIndirectCosts = async e => {
    e.preventDefault()
    setIsSubmited(true)
    if (
      accountingSeat !== '' &&
      creditorEntity !== '' &&
      date !== '' &&
      amount !== '' &&
      concept !== '' && 
      orderList.length > 0
    ) {
      setIsLoading(true)
      await dispatch(
        createExpense({
          accountingSeat,
          category: 'Costos indirectos de fabricación',
          creditorEntity,
          date,
          amount,
          concept,
          orderList
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Gasto registrado con éxito')
          dispatch(addOneToExpenseReducer())
          closeModal()
        } else {
          toast.inventoryError('Error al registrar gasto')
        }
      })
      setIsLoading(false)
    }
  }

  const onClickEditRawMaterial = async (inventoryData, closeModalInventory) => {
    setIsSubmited(true)
    if (
      accountingSeat !== '' &&
      creditorProviderId !== '' &&
      inventoryInputId !== '' &&
      date !== '' &&
      amount !== '' &&
      concept !== ''
    ) {
      const expenseData = {
        ...actualExpense,
        accountingSeat,
        creditorProvider: creditorProviderId,
        inventoryInput: inventoryInputId,
        date,
        amount,
        concept
      }
      setIsLoading(true)
      await dispatch(
        editExpenseAndInventoryInput(expenseData, inventoryData)
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Gasto editado con éxito')
          closeModal()
          closeModalInventory()
        } else {
          toast.inventoryError('Error al editar gasto')
        }
      })
      setIsLoading(false)
    }
  }

  const onClickEditLabour = async e => {
    e.preventDefault()
    setIsSubmited(true)
    if (
      accountingSeat !== '' &&
      creditorEmployeeId !== '' &&
      date !== '' &&
      amount !== '' &&
      concept !== '' && 
      orderId !== ''
    ) {
      setIsLoading(true)
      await dispatch(
        updateExpense({
          ...actualExpense,
          accountingSeat,
          creditorEmployee: creditorEmployeeId,
          date,
          amount,
          concept,
          singleOrder: orderId
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Gasto editado con éxito')
          closeModal()
        } else {
          toast.inventoryError('Error al editar gasto')
        }
      })
      setIsLoading(false)
    }
  }

  const onClickEditIndirectCosts = async e => {
    e.preventDefault()
    setIsSubmited(true)
    if (
      accountingSeat !== '' &&
      creditorEntity !== '' &&
      date !== '' &&
      amount !== '' &&
      concept !== '' &&
      orderList.length > 0
    ) {
      setIsLoading(true)
      await dispatch(
        updateExpense({
          ...actualExpense,
          accountingSeat,
          creditorEntity,
          date,
          amount,
          concept,
          orderList
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Gasto editado con éxito')
          closeModal()
        } else {
          toast.inventoryError('Error al editar gasto')
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
    deleteRawMaterialModalIsOpen,
    setDeleteRawMaterialModalIsOpen,
    closeDeleteRawMaterialModal,
    setActualExpenseRedux,

    providersList,
    employeesList,
    typeOfExpense,
    setTypeOfExpense,

    creditorEmployee,
    setCreditorEmployee,
    creditorEmployeeId,
    setCreditorEmployeeId,
    creditorProvider,
    setCreditorProvider,
    creditorProviderId,
    setCreditorProviderId,
    inventoryInput,
    setInventoryInput,
    inventoryInputId,
    setInventoryInputId,
    creditorEntity,
    setCreditorEntity,

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

    onClickSaveRawMaterial,
    onClickSaveLabour,
    onClickSaveIndirectCosts,
    onClickEditRawMaterial,
    onClickEditLabour,
    onClickEditIndirectCosts,

    actualExpense,
    // viewModalIsOpen,
    // setViewModalIsOpen,
    deleteActualExpenseRawMaterial,

    page,
    setPage,
    emptyFields,
    isLoading,
    expensesListForInventoryInput,
    setAccountingNumberFromConfig,
    ordersList,
    setOrdersList,  
    orderList,
    setOrderList,
    order,
    setOrder,
    orderId,
    setOrderId
  }
}
