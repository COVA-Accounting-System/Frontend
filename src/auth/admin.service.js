
import axios from 'axios'


export const createUserAccount = async data => {
    const URL = process.env.REACT_APP_AUTH_API
    try {
      const response = await axios.post(`${URL}/user/createAccount`, data, { 
        headers: { 'x-access-token': window.localStorage.getItem('tokenAdmin') }
      })
      return response
    } catch (err) {
      console.log(`Error al crear cuenta: ${err.message}`)
      return false
    }
  }
  
  export const getAllUsers = async () => {
    const URL = process.env.REACT_APP_AUTH_API
    try {
      const response = await axios.get(`${URL}/user/getUsers`, { 
        headers: { 'x-access-token': window.localStorage.getItem('tokenAdmin') }
      })
      return response.data
    } catch (err) {
      console.log(`Error al obtener usuarios: ${err.message}`)
      return false
    }
  }
  
  export const deleteUser = async data => {
    const URL = process.env.REACT_APP_AUTH_API
    try {
      const response = await axios.put(`${URL}/user/deleteUser`, data, { 
        headers: { 'x-access-token': window.localStorage.getItem('tokenAdmin') }
      })
      return response
    } catch (err) {
      console.log(`Error al eliminar usuario: ${err.message}`)
      return false
    }
  }

  export const updateUser = async data => {
    const URL = process.env.REACT_APP_AUTH_API
    try {
      const response = await axios.put(`${URL}/user/editUser`, data, { 
        headers: { 'x-access-token': window.localStorage.getItem('tokenAdmin') }
      })
      return response
    } catch (err) {
      console.log(`Error al actualizar usuario: ${err.message}`)
      return false
    }
  }
