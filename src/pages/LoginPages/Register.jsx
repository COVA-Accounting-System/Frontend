import React, { useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'

import { useSelector } from 'react-redux'

import './Login.scss'
import { Stack, Text, Divider } from '@chakra-ui/react'

const Register = () => {
  const isLogged = useSelector(state => state.authentication.isLogged)

  return (
    <>
      {isLogged ? (
        <Navigate to='/ca' replace />
      ) : (
        <Stack direction={'column'} spacing={'24'}>
          <Stack alignItems={'center'} direction={'row'} mt={4} ml={9}>
            <Text
              fontSize={'30px'}
              color={'acsys.iconColor'}
              fontWeight={'bold'}
            >
              ACSYS
            </Text>
          </Stack>

          <Stack direction={'column'} alignItems={'center'} spacing={6}>
            <Stack spacing={1} direciton={'column'} alignItems={'center'}>
              <Text
                fontWeight={'bold'}
                fontSize={'40px'}
                color={'acsys.titleColor'}
              >
                Regístrate
              </Text>
              <Text color={'acsys.gray2'} fontSize={'14px'}>
                Para obtener una cuenta ponte en contacto con Cetip Cuero
              </Text>
            </Stack>

            <Stack direction={'row'} spacing={10} maxW={'500px'}>
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
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1693.7982301986183!2d-66.12447529518575!3d-17.43117545958221!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e3719e08e9b8b1%3A0x49767983e0d89b01!2sProductive%20Innovation%20Center%20Leather%20PROBOLIVIA!5e0!3m2!1sen!2sus!4v1681113373604!5m2!1sen!2sus'
                  width='250px'
                  height='100%'
                  style={{ border: '1px solid #758399', borderRadius: '10px' }}
                  //   style='border:0;'
                    // allowfullscreen='true'
                  loading='lazy'
                  referrerpolicy='no-referrer-when-downgrade'
                ></iframe>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  )
}

export default Register
