import React, { useEffect, useState } from 'react'

import { Stack, Text, Spinner } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const SuccessPage = ({ isFromChangedPassword }) => {
  const [counter, setCounter] = useState(10)
  const navigate = useNavigate()

  useEffect(() => {
    let interval
    if (isFromChangedPassword) {
      interval = setInterval(() => {
        setCounter(counter => {
          if (counter <= 1) {
            clearInterval(interval)
            navigate('/logIn') // Reemplaza '/ruta-deseada' con la ruta a la que deseas navegar
          }
          return counter - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isFromChangedPassword])

  return (
    <Stack
      w='100vw'
      h='100vh'
      bgColor={'gray.100'}
      alignItems={'center'}
      justifyContent={'center'}
      p={10}
    >
      <Stack textAlign={'center'} spacing={4} alignItems={'center'}>
        {isFromChangedPassword ? (
          <>
            {' '}
            <Text
              fontSize={'35px'}
              color={'acsys.titleColor'}
              fontWeight={'semibold'}
            >
              {' '}
              Contraseña cambiada con éxito, ahora puedes iniciar sesión 🎉
            </Text>
            <Spinner size={'lg'} color='acsys.titleColor' />
            <Text fontSize={'20px'} color={'acsys.iconColor'}>
              Se te redirigirá en {counter} segundos
            </Text>
          </>
        ) : (
          <>
            {' '}
            <Text
              fontSize={'35px'}
              color={'acsys.titleColor'}
              fontWeight={'semibold'}
            >
              {' '}
              Se envió un link de recuperación a tu correo electrónico ✉️
            </Text>
            <Text fontSize={'20px'} color={'acsys.iconColor'}>
              Si no lo encuentras revisa en la sección de spam
            </Text>
          </>
        )}
      </Stack>
    </Stack>
  )
}

export default SuccessPage
