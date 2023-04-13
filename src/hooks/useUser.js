import { useState, useEffect } from 'react'
import Joi from 'joi'

import { inventoryError, invetorySuccess } from '../services/toastService'
import { getAllUsers, deleteUser } from '../auth/admin.service'

import { createUserAccount, updateUser } from '../auth/admin.service'

export const useUser = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [field, setField] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [actualUser, setActualUser] = useState({})
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const [isPasswordRight, setIsPasswordRight] = useState(false)
  const [isEmailRight, setIsEmailRight] = useState(false)
  const [isSubmited, setIsSubmited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [users, setUsers] = useState([])

  const fields = ['Calzados', 'Marroquinería', 'Artesanía']

  useEffect(() => {
    getAllUsers().then(response => {
      setUsers(response)
    })
  }, [])

  const validatePassword = data => {
    const schema = Joi.object({
      //password must have at least 8 characters 1 uppercase, 1 lowercase, and 1 number
      password: Joi.string()
        .pattern(
          new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,50}$')
        )
        .required()
    })
    const { error } = schema.validate({ password: data })
    if (!error) {
      setIsPasswordRight(true)
    } else {
      setIsPasswordRight(false)
    }
  }

  const validateEmail = data => {
    const schema = Joi.object({
      email: Joi.string()
        .regex(/^\S+@\S+\.\S+$/)
        .required()
    })

    const { error } = schema.validate({ email: data })
    if (!error) {
      setIsEmailRight(true)
    } else {
      setIsEmailRight(false)
    }
  }

  const loadFields = userData => {
    setActualUser(userData)
    setName(userData.name)
    setLastName(userData.lastName)
    setPhone(userData.phone)
    setField(userData.field)
    setEmail(userData.email)
    setIsEmailRight(true)
  }

  const emptyFields = () => {
    setActualUser({})
    setName('')
    setLastName('')
    setPhone('')
    setField('')
    setEmail('')
    setPassword('')
    setIsPasswordRight(false)
    setIsEmailRight(false)
    setIsSubmited(false)
  }

  const handleRegister = async e => {
    e.preventDefault()
    setIsSubmited(true)
    if (
      name !== '' &&
      lastName !== '' &&
      phone !== '' &&
      field !== '' &&
      email !== '' &&
      password !== '' &&
      isPasswordRight &&
      isEmailRight
    ) {
      setIsLoading(true)
      try {
        const response = await createUserAccount({
          name,
          lastName,
          phone,
          field,
          email,
          password
        })

        if (response) {
          invetorySuccess('Usuario registrado con éxito')
          emptyFields()
        } else {
          inventoryError('Error al registrar usuario')
        }
      } catch (error) {
        console.log(error)
        // inventoryError('Error al registrar usuario')
      }
      setIsSubmited(false)
      setIsLoading(false)
    }
  }

  const handleDelete = () => {
    setIsLoading(true)
    deleteUser({ _id: actualUser._id }).then(response => {
      if (response) {
        setIsDeleteModalOpen(false)
        invetorySuccess('Usuario eliminado correctamente')
        getAllUsers().then(response => {
          setUsers(response)
        })
      } else {
        inventoryError('No se pudo eliminar el usuario')
      }
    })
    setIsLoading(false)
  }

  const handleEdit = async e => {
    e.preventDefault()
    setIsSubmited(true)
    if (
      name !== '' &&
      lastName !== '' &&
      phone !== '' &&
      field !== '' &&
      email !== '' &&
      isEmailRight
    ) {
      setIsLoading(true)
      try {
        const response = await updateUser({
          _id: actualUser._id,
          name,
          lastName,
          phone,
          field,
          email,
          password: actualUser.password
        })

        if (response) {
          invetorySuccess('Usuario editado con éxito')
          getAllUsers().then(response => {
            setUsers(response)
          })
          setIsEditModalOpen(false)
          emptyFields()
        } else {
          inventoryError('Error al editar usuario')
        }
      } catch (error) {
        console.log(error)
        // inventoryError('Error al registrar usuario')
      }
      setIsLoading(false)
    }
  }

  return {
    name,
    setName,
    lastName,
    setLastName,
    phone,
    setPhone,
    field,
    setField,
    email,
    setEmail,
    password,
    setPassword,
    isPasswordRight,
    isEmailRight,
    isSubmited,
    isLoading,
    fields,
    validatePassword,
    validateEmail,
    handleRegister,
    loadFields,
    emptyFields,
    actualUser,
    setActualUser,

    setIsLoading,
    handleEdit,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    handleDelete,
    users

  }
}
