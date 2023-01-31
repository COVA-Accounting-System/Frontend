import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllProducts,
  setActualProduct,
  createProduct,
  deleteProduct,
  updateProduct
} from '../reducers/products'
import * as toast from '../services/toastService'
import { changeAction, changeEntity } from '../reducers/crud'

export const useProduct = () => {
  const dispatch = useDispatch()
  const productTypeOptions = ['Unidad', 'Par']

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)

  const [productName, setProductName] = useState('')
  const [productFeatures, setProductFeatures] = useState([])
  const [productType, setProductType] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productDozenPrice, setProductDozenPrice] = useState('')

  const [isSubmited, setIsSubmited] = useState(false)

  const action = useSelector((state) => state.crud.action)

  const actualProduct = useSelector((state) => state.products.actualProduct)

  const productsList = useSelector((state) => {
    return state.products.data.filter((param) => param.isVisible === true)
  })

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(changeEntity({ entity: 'product', entityName: 'producto' }))
  }, [dispatch])

  const changeActionRedux = (action) => {
    dispatch(changeAction(action))
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const emptyFields = () => {
    setProductName('')
    setProductFeatures([])
    setProductType('')
    setProductPrice('')
    setProductDozenPrice('')
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

  const deleteActualProduct = () => {
    dispatch(deleteProduct(actualProduct)).then((status) => {
      if (status) {
        toast.invetorySuccess('Producto eliminado con éxito')
      } else {
        toast.inventoryError('Error al eliminar producto')
      }
    })
  }

  const setActualProductRedux = (data) => {
    dispatch(setActualProduct(data))
  }

  const onClickSave = (e) => {
    e.preventDefault()
    setIsSubmited(true)
    if (productName !== '' && productType !== '' && productPrice !== '' && productDozenPrice !== '') {
      dispatch(
        createProduct({
          productName,
          productFeatures: [...productFeatures],
          productType,
          productPrice,
          productDozenPrice
        })
      ).then((status) => {
        if (status) {
          toast.invetorySuccess('Producto creado con éxito')
        } else {
          toast.inventoryError('Error al crear producto')
        }
      })
      closeModal()
    }
  }

  const onEditSave = (e) => {
    e.preventDefault()
    setIsSubmited(true)
    if (productName !== '' && productType !== '' && productPrice !== '' && productDozenPrice !== '') {
      dispatch(
        updateProduct({
          ...actualProduct,
          productName,
          productFeatures: [...productFeatures],
          productType,
          productPrice,
          productDozenPrice
        })
      ).then((status) => {
        if (status) {
          toast.invetorySuccess('Producto editado con éxito')
        } else {
          toast.inventoryError('Error al editar producto')
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
    setActualProductRedux,
    productTypeOptions,
    productName,
    setProductName,
    productFeatures,
    setProductFeatures,
    productType,
    setProductType,
    productPrice,
    setProductPrice,
    productDozenPrice,
    setProductDozenPrice,
    isSubmited,
    productsList,
    changeActionRedux,
    deleteActualProduct,
    onClickSave,
    onEditSave
  }
}
