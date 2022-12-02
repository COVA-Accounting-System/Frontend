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
