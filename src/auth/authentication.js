import axios from 'axios'

export const authentication = async (email, password) => {
  const URL = process.env.REACT_APP_AUTH_API
  try {
    const response = await axios.post(`${URL}/auth/logIn`, {
      email,
      password
    })
    window.localStorage.setItem('token', response.data.token)
    return { loginSuccess: true, token: response.data.token }
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
    return { loginSuccess: true, token: response.data.token }
  } catch (err) {
    console.log(`Error al iniciar sesión: ${err.message}`)
    return { loginSuccess: false, token: undefined }
  }
}

export const logOut = () => {
  // const URL = process.env.REACT_APP_AUTH_API
  try {
    // await axios.post(`${URL}/auth/logOut`)
    window.localStorage.removeItem('token')
    return true
  } catch (err) {
    console.log(`Error al cerrar sesión: ${err.message}`)
    return false
  }
}

export const AdminLogOut = () => {
  // const URL = process.env.REACT_APP_AUTH_API
  try {
    // await axios.post(`${URL}/auth/logOut`)
    window.localStorage.removeItem('tokenAdmin')
    return true
  } catch (err) {
    console.log(`Error al cerrar sesión: ${err.message}`)
    return false
  }
}