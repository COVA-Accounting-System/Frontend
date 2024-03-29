import React, { useState } from 'react'
// import { Button } from '../../components/Button/Button'
import { authentication } from '../../auth/authentication'
// import Input from '../../components/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { setLogged } from '../../reducers/authentication'

import { Navigate, NavLink } from 'react-router-dom'
import { inventoryError } from '../../services/toastService'
import EmailFormControl from '../../components/Input/EmailFormControl'
import PasswordFormControl from '../../components/Input/PasswordFormControl'
import Navbar from '../../components/Navbar/Navbar'

import { Stack, Text, Button } from '@chakra-ui/react'

const Login = () => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmited, setIsSubmited] = useState(false)
  const isLogged = useSelector(state => state.authentication.isLogged)

  const onLogin = async () => {
    // event.preventDefault()
    if (email !== '' && password !== '') {
      setIsLoading(true)
      const { loginSuccess } = await authentication(email, password)
      if (loginSuccess) {
        dispatch(setLogged(loginSuccess))
        setEmail('')
        setPassword('')
        window.location.reload()
      } else {
        inventoryError('Usuario o contraseña incorrectos')
        dispatch(setLogged(loginSuccess))
      }
      setIsSubmited(false)
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLogged ? (
        <Navigate to='/ca' replace />
      ) : (
        <Stack direction={'column'} spacing={'16'} pb={32}>
          <Navbar />
          <Stack direction={'column'} alignItems={'center'} spacing={4} h={'100%'}>
            <Text
              fontWeight={'bold'}
              fontSize={{
                base: '25px',
                sm: '2xl',
                md: '4xl',
                xl: '40px'}}
              color={'acsys.titleColor'}
            >
              Iniciar sesión
            </Text>
            <form
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  document.getElementById('submit-btn').click()
                }
              }}
            >
              <Stack maxW={'280px'} direction={'column'} spacing={7}>
                <EmailFormControl
                  labelName='Correo electrónico'
                  value={email}
                  onInput={data => setEmail(data)}
                  isSubmited={isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
                <PasswordFormControl
                  labelName='Contraseña'
                  value={password}
                  onInput={data => setPassword(data)}
                  isSubmited={isSubmited}
                  isRequired
                  isRequiredMessage='Este campo es obligatorio'
                />
                <Button
                  colorScheme='linkedin'
                  id='submit-btn'
                  bgColor={'acsys.primaryColor'}
                  fontSize={'sm'}
                  fontWeight={'600'}
                  isLoading={isLoading}
                  onClick={() => {
                    onLogin()
                    setIsSubmited(true)
                  }}
                >
                  Iniciar sesión
                </Button>
              </Stack>
            </form>

            <Stack direction={'column'} alignItems={'center'}>
              <NavLink to='/recover'>
                <Text
                  color={'acsys.fontColor'}
                  fontSize={'13px'}
                  textDecoration={'underline'}
                  _hover={{ color: 'acsys.titleColor' }}
                >
                  ¿Olvidaste tu contraseña?
                </Text>
              </NavLink>
              <Text color={'acsys.fontColor'} fontSize={'13px'}>
                {`¿No tienes una cuenta? `}
                <Text
                  as='span'
                  textDecoration={'underline'}
                  _hover={{ color: 'acsys.titleColor' }}
                >
                  <NavLink to='/register'>Regístrate</NavLink>
                </Text>
              </Text>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  )
}

export default Login
