import React from 'react'

import Navbar from '../../components/Navbar/Navbar'
import { Stack, Text, Button } from '@chakra-ui/react'
import EmailFormControl from '../../components/Input/EmailFormControl'

import useRecoverPassword from '../../hooks/useRecoverPassword'
import SuccessPage from './SuccessPage'

const RecoverPassword = () => {
  const recoverPassword = useRecoverPassword()

  const handleSubmit = e => {
    e.preventDefault()
    recoverPassword.sendRecoverPasswordEmail()
  }
  return (
    <>
      {recoverPassword.isEmailSent ? (
        <SuccessPage isFromChangedPassword={false} />
      ) : (
        <Stack direction={'column'} spacing={'16'}>
          <Navbar />
          <Stack alignItems={'center'} spacing='1'>
            <Text
              fontWeight={'bold'}
              fontSize={'40px'}
              color={'acsys.titleColor'}
            >
              Recuperar contraseña
            </Text>
            <Text color={'acsys.titleColor'} fontSize={'14px'}>
              Le enviaremos un email para que pueda recuperar su contraseña
            </Text>
            <form onSubmit={handleSubmit} noValidate>
              <Stack
                alignItems={'center'}
                width={'280px'}
                pt='20px'
                spacing='6'
              >
                <EmailFormControl
                  value={recoverPassword.email}
                  labelName={'Correo electrónico'}
                  onInput={e => recoverPassword.setEmail(e)}
                  isRequired={true}
                  isSubmited={recoverPassword.isSubmited}
                  isRequiredMessage={'El correo electrónico es requerido'}
                />
                <Button
                  width={'100%'}
                  colorScheme='linkedin'
                  bg={'acsys.primaryColor'}
                  paddingLeft={9}
                  paddingRight={9}
                  fontWeight={'bold'}
                  // onClick={() => recoverPassword.sendRecoverPasswordEmail()}
                  isLoading={recoverPassword.isLoading}
                  type='submit'
                >
                  Enviar correo
                </Button>
              </Stack>
            </form>
          </Stack>
        </Stack>
      )}
    </>
  )
}

export default RecoverPassword
