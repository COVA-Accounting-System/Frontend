import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'

import React from 'react'

export const ToasterR = () => {
  return (
    <Toaster
      toastOptions={{
        success: {
          iconTheme: { primary: '#32B284' }
        },
        error: {
          iconTheme: { primary: '#EE6270' }
        },
        style: {
          maxWidth: '400px',
          border: '1px solid #a3aab7',
          // backgroundColor: '#F7FAFC',
          color: '#758399',
          fontSize: '15px',
          fontWeight: '500',
          boxShadow: '0 0 0px rgba(0, 0, 0, 0.1)'
        }
      }}
    />
  )
}

export const invetorySuccess = message => {
  toast.success(message)
}

export const inventoryError = message => {
  toast.error(message)
}

export const promiseToast = (promise, successMessage, errorMessage) => {
  toast.promise(promise, {
    loading: 'Cargando...',
    success: successMessage,
    error: errorMessage
  })
}
