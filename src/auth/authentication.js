import axios from 'axios'

export const authentication = async (email, password) => {
  const URL = process.env.REACT_APP_AUTH_API
  try {
    const response = await axios.post(`${URL}/auth/logIn`, {
      email,
      password
    })
    window.localStorage.setItem('token', response.data.token)
    window.localStorage.setItem('email', response.data.email)
    window.localStorage.setItem('fullName', `${response.data.name} ${response.data.lastName}`)
    return {
      loginSuccess: true
    }
  } catch (err) {
    console.log(`Error al iniciar sesión: ${err.message}`)
    return { loginSuccess: false, token: undefined }
  }
}

export const adminAuthentication = async (email, password) => {
  const URL = process.env.REACT_APP_AUTH_API
  try {
    const response = await axios.post(`${URL}/adminAuth/logInAdmin`, {
      email,
      password
    })
    window.localStorage.setItem('tokenAdmin', response.data.token)
    window.localStorage.setItem('email', response.data.email)
    window.localStorage.setItem('fullName', `${response.data.name}`)
    return { loginSuccess: true, token: response.data.token }
  } catch (err) {
    console.log(`Error al iniciar sesión: ${err.message}`)
    return { loginSuccess: false, token: undefined }
  }
}

export const logOut = () => {
  try {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('email')
    window.localStorage.removeItem('fullName')
    return true
  } catch (err) {
    console.log(`Error al cerrar sesión: ${err.message}`)
    return false
  }
}

export const AdminLogOut = () => {
  try {
    window.localStorage.removeItem('tokenAdmin')
    window.localStorage.removeItem('email')
    window.localStorage.removeItem('fullName')
    return true
  } catch (err) {
    console.log(`Error al cerrar sesión: ${err.message}`)
    return false
  }
}
