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
  const [isLoading, setIsLoading] = useState(false)

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

  const deleteActualProvider = async () => {
    setIsLoading(true)
    await dispatch(deleteProvider(actualProvider)).then((status) => {
      if (status) {
        toast.invetorySuccess('Proveedor eliminado con éxito')
        closeDeleteModal()
      } else {
        toast.inventoryError('Error al eliminar proveedor')
      }
    })
    setIsLoading(false)
  }

  const setActualProviderRedux = (data) => {
    dispatch(setActualProvider(data))
  }

  const onClickSave = async (e) => {
    e.preventDefault()
    setIsSubmited(true)
    if (storeName !== '') {
      setIsLoading(true)
      await dispatch(
        createProvider({
          ...actualProvider,
          storeName,
          uiName: storeName,
          nit,
          country,
          city,
          phoneCountryCode,
          phoneNumber,
          address
        })
      ).then((status) => {
        if (status) {
          toast.invetorySuccess('Proveedor registrado con éxito')
          closeModal()
        } else {
          toast.inventoryError('Error al registrar proveedor')
        }
      })
      setIsLoading(false)
    }
  }

  const onEditSave = async (e) => {
    e.preventDefault()
    setIsSubmited(true)
    if (storeName !== '') {
      setIsLoading(true)
      await dispatch(
        updateProvider({
          ...actualProvider,
          storeName,
          nit,
          country,
          uiName: storeName,
          city,
          phoneCountryCode,
          phoneNumber,
          address
        })
      ).then((status) => {
        if (status) {
          toast.invetorySuccess('Proveedor editado con éxito')
          closeModal()
        } else {
          toast.inventoryError('Error al editar proveedor')
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
    onEditSave,

    isLoading
  }
}
