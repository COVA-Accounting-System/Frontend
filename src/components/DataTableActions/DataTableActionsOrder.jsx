import React from 'react'

import {
  orderState,
  minOrderState,
  maxOrderState
} from '../../assets/orderState'
import './DataTableActions.scss'
import {
  Button,
  // ChevronDownIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'

const DataTableActionsOrder = props => {
  const { data, onView, onEdit, onDelete, onChangeStateForward, onChangeStateBackward } = props

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
          minWidth='150px'
          color='acsys.titleColor'
          paddingTop={0}
          pb={0}
        >
          <MenuItem
            height='30px'
            fontWeight={500}
            onClick={onView}
            borderTopLeftRadius={'5px'}
            borderTopRightRadius={'5px'}
          >
            Ver
          </MenuItem>
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
          <MenuDivider margin={0} />
          <MenuItem height='30px' fontWeight={500} onClick={() => {}}>
            Pagos realizados
          </MenuItem>
          <MenuDivider margin={0} />
          <MenuItem height='30px' fontWeight={500} onClick={() => {}}>
            Material utilizado
          </MenuItem>
          <MenuDivider margin={0} />
          {data.orderStateNumber !== minOrderState ? (
            <MenuItem
              height='30px'
              fontWeight={500}
              onClick={() => onChangeStateBackward(data)}
              borderBottomLeftRadius={
                data.orderStateNumber === maxOrderState ? '5px' : '0px'
              }
              borderBottomRightRadius={
                data.orderStateNumber === maxOrderState ? '5px' : '0px'
              }
            >
              {`Mover a: `}
              <Text
                as='span'
                color={orderState[data.orderStateNumber - 1].color}
              >
                &nbsp;{orderState[data.orderStateNumber - 1].stateSpanish}
              </Text>
            </MenuItem>
          ) : null}
          {data.orderStateNumber !== maxOrderState ? (
            <MenuItem
              height='30px'
              fontWeight={500}
              onClick={() => onChangeStateForward(data)}
              borderBottomLeftRadius={'5px'}
              borderBottomRightRadius={'5px'}
            >
              {`Mover a:`}
              <Text
                as='span'
                color={orderState[data.orderStateNumber + 1].color}
              >
                &nbsp;{orderState[data.orderStateNumber + 1].stateSpanish}
              </Text>
            </MenuItem>
          ) : null}
        </MenuList>
      </Menu>
    </div>
  )
}

export default DataTableActionsOrder
