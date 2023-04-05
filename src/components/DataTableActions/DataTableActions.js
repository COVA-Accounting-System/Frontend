import React from 'react'
import './DataTableActions.scss'
import {
  Button,
  // ChevronDownIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'

const DataTableActions = props => {
  const {
    data,
    // onView,
    onEdit,
    onDelete
  } = props

  return (
    <div className='submenu'>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          fontWeight={500}
          fontSize='13px'
          color='acsys.titleColor'
          height='35px'
        >
          Acciones
        </MenuButton>
        <MenuList
          size='lg'
          zIndex={1}
          fontSize='14px'
          // width="10px"
          minWidth='150px'
          color='acsys.titleColor'

          // height={1}
        >
          {/* <MenuItem height='30px' fontWeight={500} onClick={() => onView(data)}>
            Ver
          </MenuItem> */}
          <MenuItem height='30px' fontWeight={500} onClick={() => onEdit(data)}>
            Editar
          </MenuItem>
          <MenuItem
            height='30px'
            color='red.500'
            fontWeight={500}
            onClick={() => onDelete(data)}
          >
            Eliminar
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}

export default DataTableActions
