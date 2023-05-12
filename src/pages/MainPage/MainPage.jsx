import React from 'react'

import Sidebar from '../../components/Sidebar/Sidebar'
// import SidebarM from '../../components/Sidebar/SidebarM'
import { Outlet } from 'react-router-dom'

import { Stack } from '@chakra-ui/react'

const MainPage = () => {
  return (
    <Stack direction={'row'} spacing={0} height={'100vh'} maxHeight={'100vh'}>
      <Sidebar />
      <Stack height={'100vh'} width={'100%'} overflowX={'auto'}>
        <Outlet />
      </Stack>
    </Stack>
  )
}

export default MainPage
