import React from 'react'

import { Stack, Text } from '@chakra-ui/react'

import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <Stack
      direction={'row'}
      width={'100%'}
      h={'80px'}
      borderBottom={'1px'}
      borderColor={'white'}
      justifyContent={'space-between'}
      pr={9}
      pl={9}
      //   stick to top
      // position={'fixed'}
      // top={0}
      // zIndex={1}
    >
      <Stack alignItems={'center'} direction={'row'}>
        <NavLink to='/'>
          <Text fontSize={'30px'} color={'acsys.iconColor'} fontWeight={'bold'}>
            ACSYS
          </Text>
        </NavLink>
      </Stack>
    </Stack>
  )
}

export default Navbar
