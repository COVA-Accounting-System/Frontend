import React from 'react'

import { Stack, Text, Button } from '@chakra-ui/react'
import PasswordFormControl from '../../components/Input/PasswordFormControl'
import Navbar from '../../components/Navbar/Navbar'

import useRecoverPassword from '../../hooks/useRecoverPassword'
import SuccessPage from './SuccessPage'

const ChangePassword = () => {
  const recoverPassword = useRecoverPassword()

  const handleSubmit =e => {
    e.preventDefault()
    recoverPassword.handleClickChangePassword()
  }

  return (
    <>
      {recoverPassword.isPasswordChanged ? (
        <SuccessPage
          isFromChangedPassword={true}
        />
      ) : (
        <Stack spacing={'16'}>
          <Navbar />
          <Stack alignItems={'center'} spacing={4} px={8} pb={32}>
            <Text
              fontWeight={'bold'}
              fontSize={{
                base: '25px',
                sm: '2xl',
                md: '4xl',
                xl: '40px'}}
              color={'acsys.titleColor'}
            >
              Cambiar contraseña
            </Text>
            <form onSubmit={handleSubmit} noValidate>
            <Stack maxW={'280px'} direction={'column'} spacing={6}>
              <PasswordFormControl
                labelName={'Nueva contraseña'}
                value={recoverPassword.newPassword}
                onInput={e => {
                  recoverPassword.setNewPassword(e)
                  recoverPassword.validateNewPassword(e)
                }}
                isSubmited={recoverPassword.isSubmited}
                isPasswordRight={recoverPassword.isNewPasswordRight}
                isPasswordRightMessage='La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número'
                isRequired
              />
              <PasswordFormControl
                labelName={'Confirmar contraseña'}
                value={recoverPassword.confirmNewPassword}
                onInput={e => {
                  recoverPassword.setConfirmNewPassword(e)
                  recoverPassword.validateConfirmPassword(e)
                }}
                isSubmited={recoverPassword.isSubmited}
                isPasswordRight={recoverPassword.isConfirmPasswordRight}
                isPasswordRightMessage='La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número'
                isRequired
              />
              <Button
                isLoading={recoverPassword.isLoading}
                colorScheme='linkedin'
                bg={'acsys.primaryColor'}
                paddingLeft={9}
                paddingRight={9}
                fontWeight={'bold'}
              
                type='submit'
              >
                Cambiar contraseña
              </Button>
            </Stack>
            </form>
           
          </Stack>
        </Stack>
      )}
    </>
  )
}

export default ChangePassword
