import React from 'react'

import Sidebar from '../../components/Sidebar/Sidebar'
// import SidebarM from '../../components/Sidebar/SidebarM'
import { Outlet } from 'react-router-dom'

import { Stack } from '@chakra-ui/react'

const MainPage = () => {
  return (
    <Stack direction={'row'} spacing={0} height={'100vh'} maxHeight={'100vh'}>
      <Sidebar />
      <Stack w={'100%'} maxW={'100%'} height={'100vh'}>
        <Outlet />
      </Stack>
    </Stack>
  )
}

export default MainPage
