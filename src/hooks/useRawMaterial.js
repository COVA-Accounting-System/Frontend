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
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false)

  const [isSubmited, setIsSubmited] = useState(false)

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

  const deleteActualRawMaterial = () => {
    dispatch(deleteRawMaterial(actualRawMaterial)).then(status => {
      if (status) {
        toast.invetorySuccess('Material eliminado con éxito')
      } else {
        toast.inventoryError('Error al eliminar material')
      }
    })
  }

  const setActualRawMaterialRedux = data => {
    dispatch(setActualRawMaterial(data))
  }

  const onClickSave = e => {
    e.preventDefault()
    setIsSubmited(true)
    if (
      name !== '' &&
      unitMeasure !== {}
    ) {
      dispatch(
        createRawMaterial({
          name,
          features: [...features],
          unitMeasure
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Material creado con éxito')
        } else {
          toast.inventoryError('Error al registrar material')
        }
      })
      closeModal()
    }
  }

  const onEditSave = e => {
    e.preventDefault()
    setIsSubmited(true)
    if (
      name !== '' &&
      unitMeasure !== {}
    ) {
      dispatch(
        updatedRawMaterial({
          ...actualRawMaterial,
          name,
          features: [...features],
          unitMeasure
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Material editado con éxito')
        } else {
          toast.inventoryError('Error al editar material')
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

    viewModalIsOpen,
    setViewModalIsOpen
  }
}
