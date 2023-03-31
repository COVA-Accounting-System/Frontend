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
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false)

  const [productName, setProductName] = useState('')
  const [productFeatures, setProductFeatures] = useState([])
  const [productType, setProductType] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productDozenPrice, setProductDozenPrice] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmited, setIsSubmited] = useState(false)

  const action = useSelector(state => state.crud.action)

  const actualProduct = useSelector(state => state.products.actualProduct)

  const productsList = useSelector(state => {
    return state.products.data.filter(param => param.isVisible === true)
  })

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(changeEntity({ entity: 'product', entityName: 'producto' }))
  }, [dispatch])

  useEffect(() => {
      // console.log(isSubmited)
      console.log('isLoading')
  }, [ isLoading])

  useEffect(() => {
    // console.log(isSubmited)
    console.log('is submited')
}, [ isSubmited])

  const changeActionRedux = action => {
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

  const deleteActualProduct = async () => {
    setIsLoading(true)
    await dispatch(deleteProduct(actualProduct)).then(status => {
      if (status) {
        closeDeleteModal()
        toast.invetorySuccess('Producto eliminado con éxito')
      } else {
        toast.inventoryError('Error al eliminar producto')
      }
      setIsLoading(false)
    })
  }

  const setActualProductRedux = data => {
    dispatch(setActualProduct(data))
  }

  const setLoading = async (boolean) => {
    console.log('aaaa')
    setIsLoading(boolean)
  }

  const onClickSave = async e => {
    e.preventDefault()
     setIsSubmited(true)
    if (
      productName !== '' &&
      productType !== '' &&
      productPrice !== '' &&
      productDozenPrice !== ''
    ) {
       setLoading(true)
      await dispatch(
        createProduct({
          productName,
          productFeatures: [...productFeatures],
          productType,
          productPrice,
          productDozenPrice,
          uiName: `${productName}`
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Producto registrado con éxito')
          closeModal()
        } else {
          toast.inventoryError('Error al registrar producto')
        }
      })
      setIsLoading(false)
    }
  }

  const onEditSave = async e => {
    
    e.preventDefault()
    setIsSubmited(true)
    if (
      productName !== '' &&
      productType !== '' &&
      productPrice !== '' &&
      productDozenPrice !== ''
    ) {
       setLoading(true)
     await dispatch(
        updateProduct({
          ...actualProduct,
          productName,
          productFeatures: [...productFeatures],
          productType,
          productPrice,
          productDozenPrice,
          uiName: `${productName}`
        })
      ).then(status => {
        if (status) {
          toast.invetorySuccess('Producto editado con éxito')
          closeModal()
        } else {
          toast.inventoryError('Error al editar producto')
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
    onEditSave,

    viewModalIsOpen,
    setViewModalIsOpen,
    isLoading,
    setIsLoading
  }
}
