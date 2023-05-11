import React from 'react'

import { Stack, Text } from '@chakra-ui/react'

import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <Stack
      direction={'row'}
      width={'100%'}
      h={{ base: 12, sm: 12, md: 16, xl: 20 }}
      borderBottom={'1px'}
      borderColor={'white'}
      justifyContent={'space-between'}
      px={{ base: 4, sm: 4, md: 4, xl: 8 }}
      //   stick to top
      // position={'fixed'}
      // top={0}
      // zIndex={1}
    >
      <Stack alignItems={'center'} direction={'row'}>
        <NavLink to='/'>
          <Text color={'acsys.iconColor'} fontWeight={'bold'} fontSize={{
          base: 'md',
          sm: 'md',
          md: 'x-large',
          xl: 'x-large'
        }} >
            ACSYS
          </Text>
        </NavLink>
      </Stack>
    </Stack>
  )
}

export default Navbar
