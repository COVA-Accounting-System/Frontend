import { useState } from 'react'
import axios from 'axios'
import Joi from 'joi'
import { invetorySuccess, inventoryError } from '../services/toastService'
import { useParams } from 'react-router-dom'

const forgotPasswordInstance = axios.create({
  baseURL: `${process.env.REACT_APP_AUTH_API}/password-reset`,
  timeout: 10000
})

const useRecoverPassword = () => {
  const { token } = useParams()

  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [isSubmited, setIsSubmited] = useState(false)
  const [isNewPasswordRight, setIsNewPasswordRight] = useState(false)
  const [isConfirmPasswordRight, setIsConfimPasswordRight] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isPasswordChanged, setIsPasswordChanged] = useState(false)

  const sendRecoverPasswordEmail = async () => {
    setIsSubmited(true)
    setIsLoading(true)
    if (email !== '') {
      try {
        const response = await forgotPasswordInstance.post('/forgot-password', {
          email
        })
        if (response.status === 200) {
          setIsEmailSent(true)
          emptyFields()
          setIsSubmited(false)
        }
      } catch (err) {
        if (err.response.data.message === 'User not found') {
          inventoryError('Usuario no encontrado')
        } else {
          inventoryError('Ha ocurrido un error')
        }
      }
    }

    setIsLoading(false)
  }

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
    return error
  }

  const validateNewPassword = data => {
    const error = validatePassword(data)
    if (!error) {
      setIsNewPasswordRight(true)
    } else {
      setIsNewPasswordRight(false)
    }
  }

  const validateConfirmPassword = data => {
    const error = validatePassword(data)
    if (!error) {
      setIsConfimPasswordRight(true)
    } else {
      setIsConfimPasswordRight(false)
    }
  }

  const emptyFields = () => {
    setEmail('')
    setNewPassword('')
    setConfirmNewPassword('')
  }

  const handleClickChangePassword = async () => {
    setIsSubmited(true)
    setIsLoading(true)
    if (isNewPasswordRight === true && isConfirmPasswordRight === true) {
      if (newPassword === confirmNewPassword) {
        try {
          const response = await forgotPasswordInstance.post(
            `/reset-password/${token}`,
            {
              email,
              password: newPassword
            }
          )
          if (response.status === 200) {
            setIsPasswordChanged(true)
            emptyFields()
            setIsSubmited(false)
          }
        } catch (err) {
          if (err.response.data.message === 'Invalid or expired token') {
            inventoryError('El link ha expirado, solicita uno nuevo')
          } else {
            inventoryError('Ha ocurrido un error')
          }
        }
      } else {
        inventoryError('Las contraseñas no coinciden')
      }
    }

    // setIsSubmited(false)
    setIsLoading(false)
  }

  return {
    email,
    setEmail,
    sendRecoverPasswordEmail,
    newPassword,
    setNewPassword,
    isSubmited,
    confirmNewPassword,
    setConfirmNewPassword,
    isNewPasswordRight,
    setIsNewPasswordRight,
    isConfirmPasswordRight,
    setIsConfimPasswordRight,
    validateNewPassword,
    validateConfirmPassword,
    handleClickChangePassword,
    isLoading,
    isEmailSent,
    isPasswordChanged
  }
}

export default useRecoverPassword
