import toast from 'react-hot-toast'

export const invetorySuccess = (message) => {
  toast.success(message, {
    style: {
      border: '1px solid #a3aab7',
      color: '#758399',
      fontSize: '15px',
      fontWeight: '500'
    },
    iconTheme: {
      primary: '#32B284'
    }
  })
}

export const inventoryError = (message) => {
  toast.error(message, {
    style: {
      border: '1px solid #a3aab7',
      color: '#758399',
      fontSize: '15px',
      fontWeight: '500'
    },
    iconTheme: {
      primary: '#EE6270'
    }
  })
}
