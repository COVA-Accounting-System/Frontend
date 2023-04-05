import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllInventoryInputs,
  setActualInventoryInput,
  deleteInventoryInput
} from '../reducers/inventoryInputs'

import { getAllProviders } from '../reducers/providers'
import { getAllRawMaterials } from '../reducers/rawMaterials'

import * as toast from '../services/toastService'
import { changeAction, changeEntity } from '../reducers/crud'

export const useInventoryInput = () => {
  const dispatch = useDispatch()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  // const [viewModalIsOpen, setViewModalIsOpen] = useState(false)

  const [provider, setProvider] = useState({})
  const [providerId, setProviderId] = useState('')

  const [rawMaterial, setRawMaterial] = useState({})

  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [unitMeasure, setUnitMeasure] = useState('')

  const [listOfMaterials, setListOfMaterials] = useState([])
  const [isMaterialListEditing, setIsMaterialListEditing] = useState(false)
  const [indexOfMaterialToEdit, setIndexOfMaterialToEdit] = useState(0)

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
    setPrice('')
    setUnitMeasure('')
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
    return numberOfInput !== '' && date !== '' && providerId !== ''
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
      setTotalPrice(prevTotal => prevTotal + Number(price))
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
    setTotalPrice(prevTotal => prevTotal - Number(material.price) + Number(price))
    setAmount('')
    setPrice('')
    setRawMaterial({ uiName: '' })
    setUnitMeasure('')
    setIsMaterialListEditing(false)
  }

  const onRemoveMaterial = index => {
    const material = listOfMaterials[index]
    setListOfMaterials(listOfMaterials.filter((_, i) => i !== index))
    setTotalPrice(prevTotal => prevTotal - Number(material.price))
  }

  const deleteActualInventoryInput = () => {
    dispatch(deleteInventoryInput(actualInventoryInput)).then(status => {
      if (status) {
        toast.invetorySuccess('Entrada eliminada con éxito')
        closeDeleteModal()
      } else {
        toast.inventoryError('Error al eliminar entrada')
      }
    })
  }

  const setActualInventoryInputRedux = data => {
    dispatch(setActualInventoryInput(data))
  }

  const onClickSave = async () => {
    // e.preventDefault()
    setIsSubmited(true)
    if (providerId !== '' && date !== '' && numberOfInput !== '') {
      return {
        numberOfInput,
        provider: providerId,
        date,
        totalPrice,
        listOfMaterials: listOfMaterials.map(material => {
          return {
            rawMaterial: material.rawMaterial._id,
            name: material.name,
            amount: material.amount,
            price: material.price,
            unitMeasure: material.unitMeasure
          }
        })
      }
      // const response =  dispatch(
      //   createInventoryInput({
      //     numberOfInput,
      //     provider: providerId,
      //     date,
      //     totalPrice,
      //     listOfMaterials: listOfMaterials.map(material => {
      //       return {
      //         rawMaterial: material.rawMaterial._id,
      //         amount: material.amount,
      //         price: material.price,
      //         unitMeasure: material.unitMeasure
      //       }
      //     })
      //   })
      // )
    }
    return null
  }

  const onEditSave = async () => {
    setIsSubmited(true)
    if (providerId !== '' && date !== '' && numberOfInput !== '') {
      return {
        ...actualInventoryInput,
        numberOfInput,
        provider: providerId,
        date,
        totalPrice,
        listOfMaterials: listOfMaterials.map(material => {
          return {
            rawMaterial: material.rawMaterial._id,
            name: material.name,
            amount: material.amount,
            price: material.price,
            unitMeasure: material.unitMeasure
          }
        })
      }
    }
    return null
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
    price,
    setPrice,
    onClickAddMaterial,
    onRemoveMaterial,

    isSubmited,
    inventoryInputsList,
    changeActionRedux,
    deleteActualInventoryInput,
    onClickSave,
    onEditSave,

    // viewModalIsOpen,
    // setViewModalIsOpen,

    providersList,
    materialsList,
    emptyFields,
    validateRequiredFields,
    isMaterialListEditing,
    setIsMaterialListEditing,
    indexOfMaterialToEdit,
    setIndexOfMaterialToEdit,

    onEditMaterial
  }
}
