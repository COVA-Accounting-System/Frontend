import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllClients,
  setActualClient,
  createClient,
  deleteClient,
  updateClient
} from '../reducers/clients'

import * as toast from '../services/toastService'
import { changeAction, changeEntity } from '../reducers/crud'

export const useClient = () => {
  const dispatch = useDispatch()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false)

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneCountryCode, setPhoneCountryCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [isSubmited, setIsSubmited] = useState(false)

  const action = useSelector(state => state.crud.action)

  const actualClient = useSelector(state => state.clients.actualClient)

  const clientsList = useSelector(state =>
    state.clients.data.filter(param => param.isVisible === true)
  )

  useEffect(() => {
    dispatch(getAllClients())
    dispatch(changeEntity({ entity: 'client', entityName: 'cliente' }))
  }, [dispatch])

  const changeActionRedux = action => {
    dispatch(changeAction(action))
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const emptyFields = () => {
    setName('')
    setLastName('')
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

  const deleteActualClient = () => {
    dispatch(deleteClient(actualClient)).then(status => {
      if (status) {
        toast.invetorySuccess('Cliente eliminado con éxito')
        closeDeleteModal()
      } else {
        toast.inventoryError('Error al eliminar cliente')
      }
    })
  }

  const setActualClientRedux = data => {
    dispatch(setActualClient(data))
  }

  const onClickSave = e => {
    e.preventDefault()
    setIsSubmited(true)
    if (name !== '' && lastName !== '') {
      dispatch(
        createClient({
          name,
          lastName,
          phoneCountryCode,
          phoneNumber,
          address,
          uiName: `${name} ${lastName}`
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Cliente registrado con éxito')
          closeModal()
        } else {
          toast.inventoryError('Error al registrar cliente')
        }
      })
  
    }
  }

  const onEditSave = e => {
    e.preventDefault()
    setIsSubmited(true)
    if (name !== '' && lastName !== '') {
      dispatch(
        updateClient({
          ...actualClient,
          name,
          lastName,
          phoneCountryCode,
          phoneNumber,
          address,
          uiName: `${name} ${lastName}`
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Cliente editado con éxito')
          closeModal()
        } else {
          toast.inventoryError('Error al editar cliente')
        }
      })
 
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
    setActualClientRedux,
    name,
    setName,
    lastName,
    setLastName,
    phoneCountryCode,
    setPhoneCountryCode,
    phoneNumber,
    setPhoneNumber,
    address,
    setAddress,
    isSubmited,
    clientsList,

    viewModalIsOpen,
    setViewModalIsOpen,
    changeActionRedux,
    deleteActualClient,
    onClickSave,
    onEditSave
  }
}
