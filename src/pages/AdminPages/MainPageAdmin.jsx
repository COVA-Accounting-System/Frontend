import React from 'react'
import SidebarAdmin from '../../components/Sidebar/SidebarAdmin'

import { Outlet } from 'react-router-dom'

import { Stack } from '@chakra-ui/react'

const MainPageAdmin = () => {
  return (
    <Stack direction={'row'}>
        <SidebarAdmin />
        <Stack>
          <Outlet />
        </Stack>
    </Stack>
  )
}

export default MainPageAdmin