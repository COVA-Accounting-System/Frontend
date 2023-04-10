import React from 'react'

import { Stack, Center, Tooltip, Text, IconButton } from '@chakra-ui/react'
import { BiLogOut } from 'react-icons/bi'

import { NavLink } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setAdminLogged } from '../../reducers/authentication'
import { AdminLogOut } from '../../auth/authentication'

import { FaList, FaAddressBook } from 'react-icons/fa'
import { BsFillGearFill } from 'react-icons/bs'

const SidebarAdmin = () => {
  const dispatch = useDispatch()

  const onLogOut = () => {
    const response = AdminLogOut()
    if (response) {
      dispatch(setAdminLogged(false))
    }
  }

  return (
    <Stack
      width={'245px'}
      height={'100vh'}
      borderRight={'1px'}
      borderColor={'#E2E8F0'}
      direction={'column'}
      justifyContent={'space-between'}
      p={5}
    >
      <Stack pt={10}>
      <NavLink to='/admin/management/listOfUsers'>
          <Stack
            spacing={3}
            alignItems={'center'}
            borderRadius={4}
            p={4}
            _hover={{ backgroundColor: '#f1f5f9', cursor: 'pointer' }}
            direction={'row'}
          >
            <FaAddressBook color={'#5D6A7E'} />
            <Text
              fontWeight={'500'}
              fontSize={'15px'}
              color={'acsys.titleColor'}
            >
              Lista de usuarios
            </Text>{' '}
          </Stack>
        </NavLink>
        <NavLink  to='/admin/management/createUser'>
          <Stack
            spacing={3}
            borderRadius={4}
            p={4}
            _hover={{ backgroundColor: '#f1f5f9', cursor: 'pointer' }}
            direction={'row'}
            alignItems={'center'}
          >
            <FaList color={'#5D6A7E'} />
            <Text
              fontWeight={'500'}
              fontSize={'15px'}
              color={'acsys.titleColor'}
            >
              Registrar usuario
            </Text>
          </Stack>
        </NavLink>
      </Stack>
      <Stack>
        <NavLink to='/admin/management/configuration'>
          <Stack
            spacing={3}
            borderRadius={4}
            p={4}
            _hover={{ backgroundColor: '#f1f5f9', cursor: 'pointer' }}
            alignItems={'center'}
            direction={'row'}
          >
            <BsFillGearFill color={'#5D6A7E'} />
            <Text
              fontWeight={'500'}
              fontSize={'15px'}
              color={'acsys.titleColor'}
            >
              Configuración
            </Text>{' '}
          </Stack>
        </NavLink>

        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          maxWidth={'245px'}
          //   padding={5}
        >
          <Stack>
            <Center
              bgColor={'teal.500'}
              height={'37px'}
              width={'35px'}
              borderRadius={3}
              fontWeight={'bold'}
            >
              A
            </Center>
          </Stack>
          <Stack direction={'column'} spacing={1} maxW={'120px'}>
            <Tooltip label={'Jacobo Covarrubias Zapata'}>
              <Text
                color={'acsys.titleColor'}
                fontWeight={'bold'}
                fontSize={'13px'}
                textOverflow={'ellipsis'}
                overflow={'hidden'}
                whiteSpace={'nowrap'}
              >
                Admin
              </Text>
            </Tooltip>
            <Tooltip label={'jacovzapcovarrubias@gmail.com'}>
              <Text
                color={'acsys.fontColor'}
                fontSize={'10px'}
                fontWeight={'medium'}
                textOverflow={'ellipsis'}
                overflow={'hidden'}
                whiteSpace={'nowrap'}
              >
                admin@gmail.com
              </Text>
            </Tooltip>
          </Stack>
          <Stack minW={'20px'}>
            <Tooltip label={'Cerrar sesion'}>
              <IconButton
                color={'acsys.iconColor'}
                size={'sm'}
                icon={<BiLogOut />}
                onClick={onLogOut}
              />
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default SidebarAdmin
