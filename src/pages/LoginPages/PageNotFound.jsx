import React from 'react'

import { Stack, Text } from '@chakra-ui/react'

const PageNotFound = () => {
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
        {' '}
        <Text
          fontSize={'35px'}
          color={'acsys.titleColor'}
          fontWeight={'semibold'}
        >
          {' '}
          Oops! Esta página no existe 🐑
        </Text>
      </Stack>
    </Stack>
  )
}

export default PageNotFound
