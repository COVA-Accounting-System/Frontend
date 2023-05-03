import React from 'react'

import Navbar from '../../components/Navbar/Navbar'
import { Stack, Text, Button } from '@chakra-ui/react'
import EmailFormControl from '../../components/Input/EmailFormControl'

const RecoverPassword = () => {
  return (
    <Stack direction={'column'} spacing={'16'}>
      <Navbar />
      <Stack alignItems={'center'} spacing='1'>
        <Text fontWeight={'bold'} fontSize={'40px'} color={'acsys.titleColor'}>
          Recuperar contraseña
        </Text>
        <Text color={'acsys.titleColor'} fontSize={'14px'}>
          Le enviaremos un email para que pueda
          recuperar su contraseña
        </Text>
        <Stack alignItems={'center'} width={'280px'} pt='20px' spacing='6'>
          <EmailFormControl labelName={'Correo electrónico'} />
          <Button width={'100%'} colorScheme='teal'>Enviar correo</Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default RecoverPassword
