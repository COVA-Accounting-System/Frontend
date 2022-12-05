import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllProviders,
  setActualProvider,
  createProvider,
  deleteProvider,
  updateProvider
} from '../reducers/providers'
import * as toast from '../services/toastService'
import { changeAction, changeEntity } from '../reducers/crud'

export const useProvider = () => {
  const dispatch = useDispatch()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)

  const [storeName, setStoreName] = useState('')
  const [nit, setNit] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [phoneCountryCode, setPhoneCountryCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')

  const [isSubmited, setIsSubmited] = useState(false)

  const action = useSelector((state) => state.crud.action)

  const actualProvider = useSelector((state) => state.providers.actualProvider)

  const providersList = useSelector((state) => {
    return state.providers.data.filter((param) => param.isVisible === true)
  })

  useEffect(() => {
    dispatch(getAllProviders())
    dispatch(changeEntity({ entity: 'provider', entityName: 'proveedor' }))
  }, [dispatch])

  const changeActionRedux = (action) => {
    dispatch(changeAction(action))
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const emptyFields = () => {
    setStoreName('')
    setNit('')
    setCountry('')
    setCity('')
    setPhoneCountryCode('')
    setPhoneNumber('')
    setAddress('')
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

  const deleteActualProvider = () => {
    dispatch(deleteProvider(actualProvider)).then((status) => {
      if (status) {
        toast.invetorySuccess('Empleado eliminado con éxito')
      } else {
        toast.inventoryError('Error al eliminar empleado')
      }
    })
  }

  const setActualProviderRedux = (data) => {
    dispatch(setActualProvider(data))
  }

  const onClickSave = (e) => {
    e.preventDefault()
    setIsSubmited(true)
    if (storeName !== '') {
      dispatch(
        createProvider({
          ...actualProvider,
          storeName,
          nit,
          country,
          city,
          phoneCountryCode,
          phoneNumber,
          address
        })
      ).then((status) => {
        if (status) {
          toast.invetorySuccess('Proveedor creado con éxito')
        } else {
          toast.inventoryError('Error al crear proveedor')
        }
      })
      closeModal()
    }
  }

  const onEditSave = (e) => {
    e.preventDefault()
    setIsSubmited(true)
    if (storeName !== '') {
      dispatch(
        updateProvider({
          ...actualProvider,
          storeName,
          nit,
          country,
          city,
          phoneCountryCode,
          phoneNumber,
          address
        })
      ).then((status) => {
        if (status) {
          toast.invetorySuccess('Proveedor editado con éxito')
        } else {
          toast.inventoryError('Error al editar proveedor')
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
    setActualProviderRedux,
    storeName,
    setStoreName,
    nit,
    setNit,
    phoneCountryCode,
    setPhoneCountryCode,
    phoneNumber,
    setPhoneNumber,
    country,
    setCountry,
    city,
    setCity,
    address,
    setAddress,
    isSubmited,
    providersList,
    changeActionRedux,
    deleteActualProvider,
    onClickSave,
    onEditSave
  }
}
