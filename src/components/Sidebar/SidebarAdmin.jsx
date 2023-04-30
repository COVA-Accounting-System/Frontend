import React, {useEffect, useState} from 'react'

import { Stack, Center, Tooltip, Text, IconButton } from '@chakra-ui/react'
import { BiLogOut } from 'react-icons/bi'

import { NavLink, useLocation } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setAdminLogged } from '../../reducers/authentication'
import { AdminLogOut } from '../../auth/authentication'

import { FaList, FaAddressBook } from 'react-icons/fa'
import { BsFillGearFill } from 'react-icons/bs'

const SidebarAdmin = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const [isActive, setIsActive] = useState([false, false, false])
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')

  useEffect(() => {

    setEmail(window.localStorage.getItem('email'))
    setFullName(window.localStorage.getItem('fullName'))
    if (location.pathname === '/admin/management/listOfUsers') {
      setIsActive([true, false, false])
    } else if (location.pathname === '/admin/management/createUser') {
      setIsActive([false, true, false])
    } else if (location.pathname === '/admin/management/settings') {
      setIsActive([false, false, true])
    }
  }, [])

  const onLogOut = () => {
    const response = AdminLogOut()
    if (response) {
      dispatch(setAdminLogged(false))
    }
  }

  return (
    <Stack
      minWidth={'245px'}
      height={'100vh'}
      borderRight={'1px'}
      borderColor={'#E2E8F0'}
      direction={'column'}
      justifyContent={'space-between'}
      p={5}
    >
      <Stack pt={10}>
        <NavLink
          to='/admin/management/listOfUsers'
        >
          <Stack
            spacing={3}
            alignItems={'center'}
            borderRadius={5}
            p={4}
            bgColor={ isActive[0] ? '#f1f5f9' : 'white'}
            _hover={ !isActive[0] ? { backgroundColor: '#f1f5f9', cursor: 'pointer' }: {}}
            direction={'row'}
            onClick={() => setIsActive([true, false, false])}
          >
            <FaAddressBook color={!isActive[0] ? '#5D6A7E' : '#319795'} />
            <Text
              fontWeight={'500'}
              fontSize={'15px'}
              color={!isActive[0] ? 'acsys.titleColor' : 'teal.500'}
            >
              Lista de usuarios
            </Text>{' '}
          </Stack>
        </NavLink>
        <NavLink to='/admin/management/createUser'>
          <Stack
            spacing={3}
            borderRadius={5}
            p={4}
            _hover={ !isActive[1] ? { backgroundColor: '#f1f5f9', cursor: 'pointer' }: {}}
            direction={'row'}
            alignItems={'center'}
            bgColor={ isActive[1] ? '#f1f5f9' : 'white'}
            onClick={() => setIsActive([false, true, false])}
          >
            <FaList color={!isActive[1] ? '#5D6A7E' : '#319795'}/>
            <Text
              fontWeight={'500'}
              fontSize={'15px'}
              color={!isActive[1] ? 'acsys.titleColor' : 'teal.500'}
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
                 alignItems={'center'}
                 borderRadius={5}
                 p={4}
                 bgColor={ isActive[2] ? '#f1f5f9' : 'white'}
                 _hover={ !isActive[2] ? { backgroundColor: '#f1f5f9', cursor: 'pointer' }: {}}
                 direction={'row'}
                 onClick={() => setIsActive([false, false, true])}
          >
            <BsFillGearFill color={!isActive[2] ? '#5D6A7E' : '#319795'} />
            <Text
              fontWeight={'500'}
              fontSize={'15px'}
              color={!isActive[2] ? 'acsys.titleColor' : 'teal.500'}
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
              color={'white'}
            >
                {fullName.charAt(0).toUpperCase()}
            </Center>
          </Stack>
          <Stack direction={'column'} spacing={1} maxW={'120px'}>
            <Tooltip label={fullName}>
              <Text
                color={'acsys.titleColor'}
                fontWeight={'bold'}
                fontSize={'13px'}
                textOverflow={'ellipsis'}
                overflow={'hidden'}
                whiteSpace={'nowrap'}
              >
                {fullName}
              </Text>
            </Tooltip>
            <Tooltip label={email}>
              <Text
                color={'acsys.fontColor'}
                fontSize={'10px'}
                fontWeight={'medium'}
                textOverflow={'ellipsis'}
                overflow={'hidden'}
                whiteSpace={'nowrap'}
              >
                {email}
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
