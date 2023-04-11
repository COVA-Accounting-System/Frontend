import React, { useState } from 'react'
// import { Button } from '../../components/Button/Button'
import { adminAuthentication } from '../../auth/authentication'
// import Input from '../../components/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { setAdminLogged } from '../../reducers/authentication'
import { Navigate, NavLink } from 'react-router-dom'
import { inventoryError } from '../../services/toastService'
import EmailFormControl from '../../components/Input/EmailFormControl'
import PasswordFormControl from '../../components/Input/PasswordFormControl'

import { Stack, Text, Button } from '@chakra-ui/react'

const LoginAdmin = () => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmited, setIsSubmited] = useState(false)
  const isAdminLogged = useSelector(state => state.authentication.isAdminLogged)

  const onLogin = async () => {
    // event.preventDefault()
    if (email !== '' && password !== '') {
      setIsLoading(true)
      const { loginSuccess, token } = await adminAuthentication(email, password)
      if (loginSuccess) {
        dispatch(setAdminLogged(loginSuccess))
        setEmail('')
        setPassword('')
      } else {
        inventoryError('Usuario o contraseña incorrectos')
        dispatch(setAdminLogged(loginSuccess))
      }
      setIsSubmited(false)
      setIsLoading(false)
    }
  }

  return (
    <>
      {isAdminLogged ? (
        <Navigate to='/admin/management' replace />
      ) : (
        <Stack direction={'column'} spacing={'24'}>
          <Stack alignItems={'center'} direction={'row'} mt={4} ml={9}>
            <Text
              fontSize={'30px'}
              color={'acsys.iconColor'}
              fontWeight={'bold'}
            >
              ACSYS
            </Text>
          </Stack>

          <Stack direction={'column'} alignItems={'center'} spacing={4}>
            <Text
              fontWeight={'bold'}
              fontSize={'40px'}
              color={'acsys.titleColor'}
              textAlign={'center'}
            >
              Iniciar sesión <br />(ADMIN)
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
                  colorScheme='teal'
                  id='submit-btn'
                //   bgColor={'acsys.primaryColor'}
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
              <Text
                color={'acsys.fontColor'}
                fontSize={'13px'}
                textDecoration={'underline'}
                _hover={{ color: 'acsys.titleColor' }}
              >
                ¿Olvidaste tu contraseña?
              </Text>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  )
}

export default LoginAdmin
