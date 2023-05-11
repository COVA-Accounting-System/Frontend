import React from 'react'
import NavbarHomepage from '../../components/Navbar/NavbarHomepage'

import { NavLink } from 'react-router-dom'

import { Stack, Text, Button, Flex } from '@chakra-ui/react'

const Homepage = () => {
  return (
    <>
      <NavbarHomepage />
      <Stack mt={{
        base: '110px',
        sm: '120px',
        md: '145px',
        xl: '180px'}}>
        <Stack spacing={5}>
          <Stack
            display={'column'}
            textAlign={'center'}
            lineHeight={{ base: '40px', sm: '50px', md: '70px', xl: '90px' }}
            px={{ base: '30px', sm: '30px', md: '30px', xl: '50px' }}
          >
            <Text
              fontWeight={'800'}
              color={'acsys.gray1'}
              fontSize={{ base: '30px', sm: '40px', md: '55px', xl: '75px' }}
            >
              Conoce la <span style={{ color: '#109AC6' }}>situación </span>
              <br />
              <span style={{ color: '#109AC6' }}>financiera</span> de tu empresa
            </Text>
          </Stack>
          <Stack
            direction={'row'}
            justifyContent={'center'}
            textAlign={'center'}
          >
            <Text
              fontWeight={'400'}
              color={'acsys.gray2'}
              fontSize={{ base: 12, sm: 14, md: 22, xl: 26 }}
            >
              Visualiza tus ganancias, pérdidas y el precio real de
              <br />
              tus productos de manera rápida y sencilla
            </Text>
          </Stack>
          <Flex justifyContent={'center'}>
            <NavLink to='/register'>
              <Button
              size={{
                base: 'sm',
                sm: 'sm',
                md: 'md',
                xl: 'md'
              }}
              w={'150px'}
                colorScheme='linkedin'
                bg={'acsys.primaryColor'}
                px={9}
                fontWeight={'bold'}
                fontSize={{ base: 12, sm: 14, md: 16, xl: 16 }}
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
  )
}

export default Homepage
