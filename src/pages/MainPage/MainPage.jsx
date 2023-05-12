import React from 'react'

import Sidebar from '../../components/Sidebar/Sidebar'
// import SidebarM from '../../components/Sidebar/SidebarM'
import { Outlet } from 'react-router-dom'

import { Stack, Flex } from '@chakra-ui/react'

const MainPage = () => {
  return (
    <Stack direction={'row'} h={'100vh'} w={'100vw'}>

        <Sidebar />
        <Outlet />
   
    </Stack>
  )
}

export default MainPage
