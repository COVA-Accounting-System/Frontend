import React from 'react'
import './DataTableIcons.scss'
import {
  Button,
  // ChevronDownIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem

} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'

const DataTableActions = (props) => {
  const { data, onView, onEdit, onDelete } = props

  // const onClickDelete = () => {
  //   dispatchAction("delete");
  //   setData(data);
  //   openModal();
  // };

  // const onClickEdit = () => {
  //   dispatchAction("edit");
  //   setData(data);
  //   openModal();
  // };

  return (
    <div className='submenu'>
      {/* <div className="icons-container">
        <div className="icon-container">
          <span
            className="material-symbols-outlined icon icon-edit"
            title="Editar"
            onClick={onClickEdit}
          >
            edit
          </span>
        </div>
        <div className="icon-container">
          <span
            id="delete"
            className="material-symbols-outlined icon icon-delete"
            title="Eliminar"
            onClick={onClickDelete}
          >
            delete
          </span>
        </div>
      </div> */}

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
          <MenuItem height='30px' fontWeight={500} onClick={onView}>Ver</MenuItem>
          <MenuItem height='30px' fontWeight={500} onClick={() => onEdit(data)}>Editar</MenuItem>
          <MenuItem height='30px' color='red.500' fontWeight={500} onClick={() => onDelete(data)}>Eliminar</MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}

export default DataTableActions
