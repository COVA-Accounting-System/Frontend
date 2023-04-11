import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllEmployees,
  setActualEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee
} from '../reducers/employees'
import * as toast from '../services/toastService'
import { changeAction, changeEntity } from '../reducers/crud'

export const useEmployee = () => {
  const dispatch = useDispatch()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  // const [viewModalIsOpen, setViewModalIsOpen] = useState(false)

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [ci, setCi] = useState('')
  const [nationality, setNationality] = useState('')
  const [birthday, setBirthday] = useState('')
  const [phoneCountryCode, setPhoneCountryCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [startDate, setStartDate] = useState('')

  const [isSubmited, setIsSubmited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const action = useSelector(state => state.crud.action)

  const actualEmployee = useSelector(state => state.employees.actualEmployee)

  const employeesList = useSelector(state => {
    return state.employees.data.filter(param => param.isVisible === true)
  })

  useEffect(() => {
    dispatch(getAllEmployees())
    dispatch(changeEntity({ entity: 'employee', entityName: 'operador' }))
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

    setCi('')
    setNationality('')
    setBirthday('')

    setStartDate('')
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

  const deleteActualEmployee = async () => {
    setIsLoading(true)
    await dispatch(deleteEmployee(actualEmployee)).then(status => {
      if (status) {
        toast.invetorySuccess('Operador eliminado con éxito')
        closeDeleteModal()
      } else {
        toast.inventoryError('Error al eliminar operador')
      }
    })
    setIsLoading(false)
  }

  const setActualEmployeeRedux = data => {
    dispatch(setActualEmployee(data))
  }

  const onClickSave = async e => {
    e.preventDefault()
    setIsSubmited(true)
    if (name !== '' && lastName !== '' && ci !== '') {
      setIsLoading(true)
      await dispatch(
        createEmployee({
          name,
          lastName,
          uiName: `${name} ${lastName}`,
          ci,
          nationality,
          birthday,
          //   phone,
          phoneCountryCode,
          phoneNumber,
          startDate
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Operador registrado con éxito')
          closeModal()
        } else {
          toast.inventoryError('Error al registrar operador')
        }
      })
      setIsLoading(false)
    }
  }

  const onEditSave = async e => {
    e.preventDefault()
    setIsSubmited(true)
    if (name !== '' && lastName !== '' && ci !== '') {
      setIsLoading(true)
      await dispatch(
        updateEmployee({
          ...actualEmployee,
          name,
          lastName,
          ci,
          nationality,
          birthday,
          phoneCountryCode,
          phoneNumber,
          startDate
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Operador editado con éxito')
          closeModal()
        } else {
          toast.inventoryError('Error al editar operador')
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
    setActualEmployeeRedux,
    name,
    setName,
    lastName,
    setLastName,
    phoneCountryCode,
    setPhoneCountryCode,
    phoneNumber,
    setPhoneNumber,
    ci,
    setCi,
    nationality,
    setNationality,
    birthday,
    setBirthday,
    startDate,
    setStartDate,
    isSubmited,
    employeesList,
    changeActionRedux,
    deleteActualEmployee,
    onClickSave,
    onEditSave,

    isLoading
    // viewModalIsOpen,
    // setViewModalIsOpen
  }
}
