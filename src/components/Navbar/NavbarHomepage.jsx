import React from 'react'

import { Stack, Button, Text } from '@chakra-ui/react'

import { NavLink } from 'react-router-dom'

const NavbarHomepage = () => {
  return (
    <Stack
      direction={'row'}
      width={'100%'}
      h={{ base: 20, sm: 20, md: 20, xl: 20 }}
      borderBottom={'1px'}
      borderColor={'#BDBDBD'}
      justifyContent={'space-between'}
      px={{ base: 4, sm: 4, md: 4, xl: 8 }}
      backgroundColor={'white'}
      //   stick to top
      position={'fixed'}
      top={0}
      zIndex={1}
    >
      <Stack alignItems={'center'} direction={'row'}>
        <Text fontSize={{
          base: 'md',
          sm: 'md',
          md: 'x-large',
          xl: 'x-large'
        }} color={'acsys.iconColor'} fontWeight={'bold'}>
          ACSYS
        </Text>
      </Stack>
      <Stack direction={'row'} spacing={{base: 0, sm: 0, md: 4, xl: 4}} alignItems={'center'}>
        <NavLink to='/login'>
          {' '}
          <Button
            color={'gray.600'}
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
            fontSize={'md'}
            w={'150px'}
            display={{ base: 'none', sm: 'none', md: 'block', xl: 'block' }}
          >
            Regístrate
          </Button>
        </NavLink>
      </Stack>
    </Stack>
  )
}

export default NavbarHomepage
