import React from 'react'
import Navbar from './Navbar'

import { NavLink } from 'react-router-dom'

import { Stack, Text, Button, Flex } from '@chakra-ui/react'

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Stack mt={'180px'}>
        <Stack spacing={5}>
          <Stack display={'column'} textAlign={'center'} lineHeight={'90px'}>
            <Text fontWeight={'800'} color={'acsys.gray1'} fontSize={'75px'}>
              Conoce la <span style={{ color: '#109AC6' }}>situación </span>
              <br />
              <span style={{ color: '#109AC6' }}>financiera</span> de tu empresa
            </Text>
          </Stack>
          <Stack
            direction={'row'}
            justifyContent={'center'}
            // pl={'300px'}
            // pr={40}
            textAlign={'center'}
          >
            <Text fontWeight={'400'} color={'acsys.gray2'} fontSize={'26px'}>
              Visualiza tus ganancias, pérdidas y el precio real de
              <br />
              tus productos de manera rápida y sencilla
            </Text>
          </Stack>
          <Flex justifyContent={'center'}>
            <NavLink to='/register'>
              <Button
                colorScheme='linkedin'
                bg={'acsys.primaryColor'}
                paddingLeft={9}
                paddingRight={9}
                fontWeight={'bold'}
              >
                Obtenlo gratis
              </Button>
            </NavLink>
          </Flex>
        </Stack>
        <Stack></Stack>
      </Stack>
      <Stack></Stack>
      <Stack></Stack>
    </>
    // <div>Homepage</div>
  )
}

export default Homepage
