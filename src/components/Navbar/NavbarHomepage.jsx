import React from 'react'

import { Stack, Button, Text } from '@chakra-ui/react'

import { NavLink } from 'react-router-dom'

const NavbarHomepage = () => {
  return (
    <Stack
      direction={'row'}
      width={'100%'}
      h={'80px'}
      borderBottom={'1px'}
      borderColor={'#BDBDBD'}
      justifyContent={'space-between'}
      pr={9}
      pl={9}
      //   stick to top
      position={'fixed'}
      top={0}
      zIndex={1}
    >
      <Stack alignItems={'center'} direction={'row'}>
        <Text fontSize={'30px'} color={'acsys.iconColor'} fontWeight={'bold'}>
          ACSYS
        </Text>
      </Stack>
      <Stack direction={'row'} spacing={4} alignItems={'center'}>
        <NavLink to='/login'>
          {' '}
          <Button
            color={'acsys.iconColor'}
            fontWeight={'bold'}
            colorScheme='gray'
            fontSize={'sm'}
            w={'150px'}
          >
            Iniciar sesión
          </Button>
        </NavLink>
        <NavLink to='/register'>
          {' '}
          <Button
            bgColor={'acsys.primaryColor'}
            fontWeight={'bold'}
            colorScheme='linkedin'
            fontSize={'sm'}
            w={'150px'}
          >
            Regístrate
          </Button>
        </NavLink>
      </Stack>
    </Stack>
  )
}

export default NavbarHomepage
