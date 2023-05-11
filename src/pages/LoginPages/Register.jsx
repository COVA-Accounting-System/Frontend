import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'

import { useSelector } from 'react-redux'

import { Stack, Text, Divider, Spinner, Box } from '@chakra-ui/react'

const Register = () => {
  const isLogged = useSelector(state => state.authentication.isLogged)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  return (
    <>
      {isLogged ? (
        <Navigate to='/ca' replace />
      ) : (
        <Stack direction={'column'} spacing={'16'}>
          <Navbar />

          <Stack direction={'column'} alignItems={'center'} spacing={6} px={8} pb={32}>
            <Stack
              spacing={1}
              direciton={'column'}
              alignItems={'center'}
              textAlign={'center'}
            >
              <Text
                fontWeight={'bold'}
                fontSize={{
                  base: '25px',
                  sm: '2xl',
                  md: '4xl',
                  xl: '40px'
                }}
                color={'acsys.titleColor'}
              >
                Regístrate
              </Text>
              <Text color={'acsys.gray2'} fontSize={'14px'}>
                Para obtener una cuenta ponte en contacto con Cetip Cuero
              </Text>
            </Stack>

            <Stack
              direction={{
                base: 'column',
                sm: 'column',
                md: 'row',
                xl: 'row'
              }}
              spacing={10}
              maxW={'500px'}
            >
              <Stack direction={'column'} spacing={9}>
                <Stack direction={'column'} spacing={0}>
                  <Text
                    color={'acsys.titleColor'}
                    fontWeight={'600'}
                    fontSize={'14px'}
                  >
                    TELÉFONO
                  </Text>
                  <Divider
                    w={'100%'}
                    borderColor={'acsys.iconColor'}

                    // border='1px'
                  ></Divider>
                  <Stack pt={2}>
                    <Text color={'acsys.titleColor'} fontSize={'13px'}>
                      4-4223561
                    </Text>
                  </Stack>
                </Stack>
                <Stack direction={'column'} spacing={0}>
                  <Text
                    color={'acsys.titleColor'}
                    fontWeight={'600'}
                    fontSize={'14px'}
                  >
                    CELULAR
                  </Text>
                  <Divider
                    w={'100%'}
                    borderColor={'acsys.iconColor'}
                    // border='1px'
                  ></Divider>
                  <Stack pt={2}>
                    <Text color={'acsys.titleColor'} fontSize={'13px'}>
                      71725928
                    </Text>
                  </Stack>
                </Stack>
                <Stack direction={'column'} spacing={0}>
                  <Text
                    color={'acsys.titleColor'}
                    fontWeight={'600'}
                    fontSize={'14px'}
                  >
                    DIRECCIÓN
                  </Text>
                  <Divider
                    w={'100%'}
                    borderColor={'acsys.iconColor'}
                    // border='1px'
                  ></Divider>
                  <Stack pt={2}>
                    <Text color={'acsys.titleColor'} fontSize={'13px'}>
                      Calle: Juan Mendoza s/n entre Av. Los Ángeles y calle
                      Mariano Guzmán, Zona Valle Hermoso – Villa Venezuela.
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
              <Stack>
                <Stack
                  border={'1px'}
                  borderRadius={'10px'}
                  borderColor={'#758399'}
                  height={'100%'}
                  position={'relative'}
                >
                  {!isMapLoaded && (
                    <Box
                      position={'absolute'}
                      top={'50%'}
                      left={'50%'}
                      transform={'translate(-50%, -50%)'}
                    >
                      <Spinner
                        thickness='2px'
                        speed='0.65s'
                        color='gray.500'
                        size='xl'
                      />
                    </Box>
                  )}
                  <iframe
                    title='map'
                    src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1693.7982301986183!2d-66.12447529518575!3d-17.43117545958221!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e3719e08e9b8b1%3A0x49767983e0d89b01!2sProductive%20Innovation%20Center%20Leather%20PROBOLIVIA!5e0!3m2!1sen!2sus!4v1681113373604!5m2!1sen!2sus'
                    // width={{
                    //   base: '100%',
                    //   sm: '100%',
                    //   md: '250px',
                    //   xl: '250px'
                    // }}
                    height='100%'
                    style={{
                      borderRadius: '10px',
                      marginTop: '0px'
                    }}
                    loading='lazy'
                    onLoad={() => setIsMapLoaded(true)}
                  ></iframe>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  )
}

export default Register
