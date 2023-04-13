import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllInventoryOutputs,
  setActualInventoryOutput,
  createInventoryOutput,
  deleteInventoryOutput,
  updateInventoryOutput
} from '../reducers/inventoryOutputs'

import { getConfig, addOneToInventoryOutputReducer } from '../reducers/config'
import { getAllOrders } from '../reducers/orders'
import { getAllEmployees } from '../reducers/employees'
import { getAllRawMaterials } from '../reducers/rawMaterials'

import * as toast from '../services/toastService'
import { changeAction, changeEntity } from '../reducers/crud'

export const useInventoryOutput = () => {
  const dispatch = useDispatch()

  const action = useSelector(state => state.crud.action)

  const actualInventoryOutput = useSelector(
    state => state.inventoryOutputs.actualInventoryOutput
  )

  const inventoryOutputsList = useSelector(state => {
    return state.inventoryOutputs.data.filter(param => param.isVisible === true)
  })

  const ordersList = useSelector(state => {
    return state.orders.data.filter(param => param.isVisible === true)
  })

  const employeesList = useSelector(state => {
    return state.employees.data.filter(param => param.isVisible === true)
  })

  const materialsList = useSelector(state => {
    return state.rawMaterials.data.filter(param => param.isVisible === true)
  })

  const config = useSelector(state => state.config.config)

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  // const [viewModalIsOpen, setViewModalIsOpen] = useState(false)

  const [order, setOrder] = useState({})
  const [orderId, setOrderId] = useState('')
  //   const [orderId, setOrderId] = useState('')

  const [rawMaterial, setRawMaterial] = useState({})

  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [unitMeasure, setUnitMeasure] = useState('')

  const [listOfMaterials, setListOfMaterials] = useState([])
  const [isMaterialListEditing, setIsMaterialListEditing] = useState(false)
  const [indexOfMaterialToEdit, setIndexOfMaterialToEdit] = useState(0)

  const [numberOfInput, setNumberOfInput] = useState(0)
  const [date, setDate] = useState('')
  const [estimatedPrice, setEstimatedPrice] = useState(0)

  const [isSubmited, setIsSubmited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllInventoryOutputs())
    if (employeesList.length === 0) {
      dispatch(getAllEmployees())
    }
    if (materialsList.length === 0) {
      dispatch(getAllRawMaterials())
    }
    if (ordersList.length === 0) {
      dispatch(getAllOrders())
    }
    if (config.inventoryOutputNumber === 0) {
      dispatch(getConfig())
    }
    dispatch(
      changeEntity({
        entity: 'inventoryOutput',
        entityName: 'Salida de inventario'
      })
    )
  }, [dispatch])

  const changeActionRedux = action => {
    dispatch(changeAction(action))
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const setNumberOfInputFromConfig = () => {
    setNumberOfInput(Number(config.inventoryOutputNumber) + 1)
  }

  const emptyFields = () => {
    setNumberOfInput(0)
    setDate('')
    setOrder({})
    setOrderId('')
    setListOfMaterials([])
    setEstimatedPrice(0)

    setRawMaterial({})
    setAmount('')
    setPrice('')
    setUnitMeasure('')
    setIsMaterialListEditing(false)
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

  const validateRequiredFields = () => {
    setIsSubmited(true)
    return numberOfInput !== '' && date !== '' && orderId !== ''
  }

  const onClickAddMaterial = e => {
    e.preventDefault()
    if (rawMaterial._id !== '' && amount !== '' && price !== '') {
      setListOfMaterials([
        ...listOfMaterials,
        {
          rawMaterial,
          amount,
          price,
          unitMeasure
        }
      ])
      setEstimatedPrice(prevTotal => prevTotal + Number(price))
      setAmount('')
      setPrice('')
      setRawMaterial({ uiName: '' })
      setUnitMeasure('')
    }
  }

  const onEditMaterial = () => {
    const material = listOfMaterials[indexOfMaterialToEdit]
    setListOfMaterials([
      ...listOfMaterials.filter((_, i) => i !== indexOfMaterialToEdit),
      {
        rawMaterial,
        amount,
        price,
        unitMeasure
      }
    ])
    setEstimatedPrice(
      prevTotal => prevTotal - Number(material.price) + Number(price)
    )
    setAmount('')
    setPrice('')
    setRawMaterial({ uiName: '' })
    setUnitMeasure('')
    setIsMaterialListEditing(false)
  }

  const onRemoveMaterial = index => {
    const material = listOfMaterials[index]
    setListOfMaterials(listOfMaterials.filter((_, i) => i !== index))
    setEstimatedPrice(prevTotal => prevTotal - Number(material.price))
  }

  const deleteActualInventoryOutput = async () => {
    setIsLoading(true)
    await dispatch(deleteInventoryOutput(actualInventoryOutput)).then(
      status => {
        if (status) {
          toast.invetorySuccess('Salida de inventario eliminada con éxito')
          closeDeleteModal()
        } else {
          toast.inventoryError('Error al eliminar salida de inventario')
        }
      }
    )
    setIsLoading(false)
  }

  const setActualInventoryOutputRedux = data => {
    dispatch(setActualInventoryOutput(data))
  }

  const onClickSave = async e => {
    e.preventDefault()
    setIsSubmited(true)
    if (orderId !== '' && date !== '' && numberOfInput !== '') {
      setIsLoading(true)
      await dispatch(
        createInventoryOutput({
          numberOfInput,
          order: orderId,
          date,
          estimatedPrice,
          listOfMaterials: listOfMaterials.map(material => {
            return {
              rawMaterial: material.rawMaterial._id,
              amount: material.amount,
              price: material.price,
              unitMeasure: material.unitMeasure
            }
          })
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Salida de inventario registrada con éxito')
          dispatch(addOneToInventoryOutputReducer())
          closeModal()
        } else {
          toast.inventoryError('Error al registrar salida de inventario')
        }
      })
      setIsLoading(false)
    }
  }

  const onEditSave = async e => {
    e.preventDefault()
    setIsSubmited(true)
    if (orderId !== '' && date !== '' && numberOfInput !== '') {
      setIsLoading(true)
      await dispatch(
        updateInventoryOutput({
          ...actualInventoryOutput,
          numberOfInput,
          order: orderId,
          date,
          estimatedPrice,
          listOfMaterials: listOfMaterials.map(material => {
            return {
              rawMaterial: material.rawMaterial._id,
              amount: material.amount,
              price: material.price,
              unitMeasure: material.unitMeasure
            }
          })
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Salida de inventario editada con éxito')
          closeModal()
        } else {
          toast.inventoryError('Error al editar salida de inventario')
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
    setActualInventoryOutputRedux,

    numberOfInput,
    setNumberOfInput,
    date,
    setDate,
    estimatedPrice,
    setEstimatedPrice,

    order,
    setOrder,
    setOrderId,
    orderId,
    listOfMaterials,
    setListOfMaterials,

    rawMaterial,
    setRawMaterial,
    unitMeasure,
    setUnitMeasure,
    amount,
    setAmount,
    price,
    setPrice,
    onClickAddMaterial,
    onRemoveMaterial,

    isSubmited,
    inventoryOutputsList,
    changeActionRedux,
    deleteActualInventoryOutput,
    onClickSave,
    onEditSave,

    // viewModalIsOpen,
    // setViewModalIsOpen,

    employeesList,
    ordersList,
    materialsList,
    emptyFields,
    validateRequiredFields,

    isLoading,
    onEditMaterial,
    isMaterialListEditing,
    setIsMaterialListEditing,
    indexOfMaterialToEdit,
    setIndexOfMaterialToEdit,

    setNumberOfInputFromConfig
  }
}
