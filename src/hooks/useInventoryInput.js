import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllInventoryInputs,
  setActualInventoryInput,
  createInventoryInput,
  deleteInventoryInput,
  updateInventoryInput
} from '../reducers/inventoryInputs'

import { getAllProviders } from '../reducers/providers'
import { getAllRawMaterials } from '../reducers/rawMaterials'

import * as toast from '../services/toastService'
import { changeAction, changeEntity } from '../reducers/crud'

export const useInventoryInput = () => {
  const dispatch = useDispatch()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false)

  const [provider, setProvider] = useState({})
  const [providerId, setProviderId] = useState('')

  const [rawMaterial, setRawMaterial] = useState({})
  const [amount, setAmount] = useState('')
  const [unitPrice, setUnitPrice] = useState('')
  const [unitMeasure, setUnitMeasure] = useState('')

  const [listOfMaterials, setListOfMaterials] = useState([])

  const [numberOfInput, setNumberOfInput] = useState('')
  const [date, setDate] = useState('')
  const [totalPrice, setTotalPrice] = useState(0)

  const [isSubmited, setIsSubmited] = useState(false)

  const action = useSelector(state => state.crud.action)

  const actualInventoryInput = useSelector(
    state => state.inventoryInputs.actualInventoryInput
  )

  const inventoryInputsList = useSelector(state => {
    return state.inventoryInputs.data.filter(param => param.isVisible === true)
  })

  const providersList = useSelector(state => {
    return state.providers.data.filter(param => param.isVisible === true)
  })

  const materialsList = useSelector(state => {
    return state.rawMaterials.data.filter(param => param.isVisible === true)
  })

  useEffect(() => {
    dispatch(getAllInventoryInputs())
    if (providersList.length === 0) {
      dispatch(getAllProviders())
    }
    if (materialsList.length === 0) {
      dispatch(getAllRawMaterials())
    }
    dispatch(
      changeEntity({
        entity: 'inventoryInput',
        entityName: 'Entrada de inventario'
      })
    )
  }, [dispatch])

  const changeActionRedux = action => {
    dispatch(changeAction(action))
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const emptyFields = () => {
    setNumberOfInput('')
    setDate('')
    setProvider({})
    setProviderId('')
    setListOfMaterials([])
    setTotalPrice(0)

    setRawMaterial({})
    setAmount('')
    setUnitPrice('')
    setUnitMeasure('')
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

  const deleteActualInventoryInput = () => {
    dispatch(deleteInventoryInput(actualInventoryInput)).then(status => {
      if (status) {
        toast.invetorySuccess('Entrada eliminada con éxito')
      } else {
        toast.inventoryError('Error al eliminar entrada')
      }
    })
  }

  const setActualInventoryInputRedux = data => {
    dispatch(setActualInventoryInput(data))
  }

  const onClickSave = e => {
    e.preventDefault()
    setIsSubmited(true)
    if (providerId !== '' && date !== '' && totalPrice !== 0) {
      dispatch(
        createInventoryInput({
          numberOfInput,
          provider: providerId,
          date,
          totalPrice,
          listOfMaterials
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Entrada creada con éxito')
        } else {
          toast.inventoryError('Error al registrar entrada')
        }
      })
      closeModal()
    }
  }

  const onEditSave = e => {
    e.preventDefault()
    setIsSubmited(true)
    if (providerId !== '' && date !== '' && totalPrice !== 0) {
      dispatch(
        updateInventoryInput({
          ...actualInventoryInput,
          numberOfInput,
          provider: providerId,
          date,
          totalPrice,
          listOfMaterials
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Entrada editada con éxito')
        } else {
          toast.inventoryError('Error al editar entrada')
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
    setActualInventoryInputRedux,

    numberOfInput,
    setNumberOfInput,
    date,
    setDate,
    totalPrice,
    setTotalPrice,

    provider,
    setProvider,
    providerId,
    setProviderId,
    listOfMaterials,
    setListOfMaterials,

    rawMaterial,
    setRawMaterial,
    unitMeasure,
    setUnitMeasure,
    amount,
    setAmount,
    unitPrice,
    setUnitPrice,


    isSubmited,
    inventoryInputsList,
    changeActionRedux,
    deleteActualInventoryInput,
    onClickSave,
    onEditSave,

    viewModalIsOpen,
    setViewModalIsOpen,

    providersList,
    materialsList
  }
}
