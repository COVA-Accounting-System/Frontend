import React from 'react'
import SidebarAdmin from '../../components/Sidebar/SidebarAdmin'

import { Outlet } from 'react-router-dom'

import { Stack } from '@chakra-ui/react'

const MainPageAdmin = () => {
  return (
    <Stack direction={'row'} height={'100vh'} maxHeight={'100vh'}>
      <SidebarAdmin />
      <Stack w={'100%'}overflowX={'auto'}>
        <Outlet />
      </Stack>
    </Stack>
  )
}

export default MainPageAdmin
