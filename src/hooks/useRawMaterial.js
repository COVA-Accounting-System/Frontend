import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getAllRawMaterials,
  setActualRawMaterial,
  createRawMaterial,
  deleteRawMaterial,
  updatedRawMaterial
} from '../reducers/rawMaterials'

import * as toast from '../services/toastService'
import { changeAction, changeEntity } from '../reducers/crud'

export const useRawMaterial = () => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [features, setFeatures] = useState([])
  const [unitMeasure, setUnitMeasure] = useState({})

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  // const [viewModalIsOpen, setViewModalIsOpen] = useState(false)

  const [isSubmited, setIsSubmited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const action = useSelector(state => state.crud.action)

  const actualRawMaterial = useSelector(
    state => state.rawMaterials.actualRawMaterial
  )

  const rawMaterialsList = useSelector(state => {
    return state.rawMaterials.data.filter(param => param.isVisible === true)
  })

  useEffect(() => {
    dispatch(getAllRawMaterials())
    dispatch(changeEntity({ entity: 'rawMaterial', entityName: 'Material' }))
  }, [dispatch])

  const changeActionRedux = action => {
    dispatch(changeAction(action))
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const emptyFields = () => {
    setName('')
    setFeatures([])
    setUnitMeasure({})
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

  const deleteActualRawMaterial = async () => {
    setIsLoading(true)
    await dispatch(deleteRawMaterial(actualRawMaterial)).then(status => {
      if (status) {
        toast.invetorySuccess('Material eliminado con éxito')
        closeDeleteModal()
      } else {
        toast.inventoryError('Error al eliminar material')
      }
    })
    setIsLoading(false)
  }

  const setActualRawMaterialRedux = data => {
    dispatch(setActualRawMaterial(data))
  }

  const onClickSave = async e => {
    e.preventDefault()
    setIsSubmited(true)
    if (
      name !== '' &&
      unitMeasure !== {}
    ) {
      setIsLoading(true)
      await dispatch(
        createRawMaterial({
          name,
          uiName: name,
          features: [...features],
          unitMeasure
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Material registrado con éxito')
          closeModal()
        } else {
          toast.inventoryError('Error al registrar material')
        }
      })
      setIsLoading(false)
    }
  }

  const onEditSave = async e => {
    e.preventDefault()
    setIsSubmited(true)
    if (
      name !== '' &&
      unitMeasure !== {}
    ) {
      setIsLoading(true)
      await dispatch(
        updatedRawMaterial({
          ...actualRawMaterial,
          name,
          uiName: name,
          features: [...features],
          unitMeasure
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Material editado con éxito')
          closeModal()
        } else {
          toast.inventoryError('Error al editar material')
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
    setActualRawMaterialRedux,

    name,
    setName,
    features,
    setFeatures,
    unitMeasure,
    setUnitMeasure,

    isSubmited,
    rawMaterialsList,
    changeActionRedux,
    deleteActualRawMaterial,
    onClickSave,
    onEditSave,

    // viewModalIsOpen,
    // setViewModalIsOpen,
    isLoading
  }
}
