import React, { useState } from 'react'
import { FaBoxOpen, FaMoneyBillAlt } from 'react-icons/fa'
import { RiArchiveDrawerFill } from 'react-icons/ri'
import { AiFillSignal } from 'react-icons/ai'
import { BsPersonFill } from 'react-icons/bs'
import { MdOutlineArrowRight } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import './Sidebar.scss'

import { logOut } from '../../auth/authentication'
import { useDispatch } from 'react-redux'
import { setLogged } from '../../reducers/authentication'

import { BiLogOut } from 'react-icons/bi'

import { Stack, Center, Tooltip, Text, IconButton } from '@chakra-ui/react'

const Sidebar = () => {
  const dispatch = useDispatch()

  const onLogOut = () => {
    const response = logOut()
    if (response) {
      dispatch(setLogged(false))
    }
  }

  const [subMenus, setSubMenus] = useState([
    { name: 'submenu-production', isOpen: false, subElements: 2 },
    { name: 'submenu-inventory', isOpen: false, subElements: 3 },
    { name: 'submenu-accounting', isOpen: false, subElements: 2 },
    { name: 'submenu-contact', isOpen: false, subElements: 3 }
  ])

  const rotateArrowStyle = {
    transform: 'rotate(90deg)',
    transition: 'all 0.5s ease'
  }

  const activeStyle = {
    borderRightWidth: '6px',
    borderRightStyle: 'solid',
    borderRightColor: '#109ac6',
    backgroundColor: '#F7FAFC',
    color: '#109ac6',
    transition: 'all 0.2s ease-in-out'
  }

  const activeSubMenuItemStyle = {
    color: '#109ac6',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      color: '#109ac6 !important',
      transition: 'all 0.2s ease-in-out !important'
    }
  }

  const changeIsActiveAndOpenSubmenu = name => {
    const subMenusChanged = subMenus.map(submenu => {
      if (submenu.name === name) {
        submenu.isOpen = !submenu.isOpen
      } else {
        submenu.isOpen = false
      }
      return submenu
    })

    setSubMenus(subMenusChanged)
  }

  return (
    <Stack
      height={'100%'}
      width={'245px'}
      borderRight={'1px'}
      borderColor={'gray.300'}
      direction={'column'}
      justifyContent={'space-between'}
      // padding={5}
      pt={5}
    >
      <Stack direction={'column'} spacing={5}>
        <Stack direction={'row'} justifyContent={'center'}>
          {' '}
          <Text
            color={'acsys.primaryColor'}
            fontWeight={'bold'}
            fontSize={'25px'}
          >
            ACSYS
          </Text>
        </Stack>
        <Stack>
          <ul>
            <li>
              <div
                className='element'
                id='accountingSubmenu'
                onClick={() =>
                  changeIsActiveAndOpenSubmenu('submenu-production')
                }
                style={subMenus[0].isOpen ? activeSubMenuItemStyle : {}}
              >
                <FaBoxOpen className='global-icon-class' />
                Producción
                <MdOutlineArrowRight
                  className='arrow-icon-class'
                  style={subMenus[0].isOpen ? rotateArrowStyle : {}}
                />
              </div>
              <ul
                id='submenu-production'
                className='ul-element-inside'
                style={
                  subMenus[0].isOpen
                    ? {
                        height: subMenus[0].subElements * 49,
                        borderBottom: '1px solid #e6e9f0'
                      }
                    : {}
                }
              >
                <li>
                  <NavLink
                    className='element-inside'
                    to='/ca/production/order'
                    style={({ isActive }) => (isActive ? activeStyle : {})}
                  >
                    Pedidos
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='element-inside'
                    to='/ca/production/product'
                    style={({ isActive }) => (isActive ? activeStyle : {})}
                  >
                    Productos
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <div
                className='element'
                id='inventorySubmenu'
                onClick={() =>
                  changeIsActiveAndOpenSubmenu('submenu-inventory')
                }
                style={subMenus[1].isOpen ? activeSubMenuItemStyle : {}}
              >
                <RiArchiveDrawerFill className='global-icon-class' />
                Inventario
                <MdOutlineArrowRight
                  className='arrow-icon-class'
                  style={subMenus[1].isOpen ? rotateArrowStyle : {}}
                />
              </div>
              <ul
                id='submenu-inventory'
                className='ul-element-inside'
                tabIndex='0'
                style={
                  subMenus[1].isOpen
                    ? {
                        height: subMenus[1].subElements * 49,
                        borderBottom: '1px solid #e6e9f0'
                      }
                    : {}
                }
              >
                <li>
                  <NavLink
                    className='element-inside'
                    to='/ca/inventory/raw-material'
                    style={({ isActive }) => (isActive ? activeStyle : {})}
                  >
                    Materia Prima
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='element-inside'
                    to='/ca/inventory/input'
                    style={({ isActive }) => (isActive ? activeStyle : {})}
                  >
                    Entradas
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='element-inside'
                    to='/ca/inventory/output'
                    style={({ isActive }) => (isActive ? activeStyle : {})}
                  >
                    Salidas
                  </NavLink>
                </li>
                {/* <li>
              <NavLink
                className='element-inside'
                to='/ca/inventory/stock'
                style={({ isActive }) => (isActive ? activeStyle : {})}
              >
                Stock
              </NavLink>
            </li> */}
              </ul>
            </li>
            <li>
              <div
                className='element'
                id='accountingSubmenu'
                onClick={() =>
                  changeIsActiveAndOpenSubmenu('submenu-accounting')
                }
                style={subMenus[2].isOpen ? activeSubMenuItemStyle : {}}
              >
                <FaMoneyBillAlt className='global-icon-class' />
                Contabilidad
                <MdOutlineArrowRight
                  className='arrow-icon-class'
                  style={subMenus[2].isOpen ? rotateArrowStyle : {}}
                />
              </div>
              <ul
                id='submenu-accounting'
                className='ul-element-inside'
                style={
                  subMenus[2].isOpen
                    ? {
                        height: subMenus[2].subElements * 49,
                        borderBottom: '1px solid #e6e9f0'
                      }
                    : {}
                }
              >
                <li>
                  <NavLink
                    className='element-inside'
                    to='/ca/accounting/income'
                    style={({ isActive }) => (isActive ? activeStyle : {})}
                  >
                    Ingresos
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='element-inside'
                    to='/ca/accounting/expense'
                    style={({ isActive }) => (isActive ? activeStyle : {})}
                  >
                    Gastos
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <div
                className='element'
                id='contactSubmenu'
                onClick={() => changeIsActiveAndOpenSubmenu('submenu-contact')}
                style={subMenus[3].isOpen ? activeSubMenuItemStyle : {}}
              >
                <BsPersonFill className='global-icon-class' />
                Contactos
                <MdOutlineArrowRight
                  className='arrow-icon-class'
                  style={subMenus[3].isOpen ? rotateArrowStyle : {}}
                />
              </div>
              <ul
                id='submenu-contact'
                className='ul-element-inside'
                style={
                  subMenus[3].isOpen
                    ? {
                        height: subMenus[3].subElements * 49,
                        borderBottom: '1px solid #e6e9f0'
                      }
                    : {}
                }
              >
                <li>
                  <NavLink
                    className='element-inside'
                    to='/ca/contact/client'
                    style={({ isActive }) => (isActive ? activeStyle : {})}
                  >
                    Clientes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='element-inside'
                    to='/ca/contact/employee'
                    style={({ isActive }) => (isActive ? activeStyle : {})}
                  >
                    Operadores
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='element-inside'
                    to='/ca/contact/provider'
                    style={({ isActive }) => (isActive ? activeStyle : {})}
                  >
                    Proveedores
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink
                className='element'
                to='/ca/report'
                id='reportButton'
                style={({ isActive }) => (isActive ? activeStyle : {})}
              >
                <AiFillSignal className='global-icon-class' />
                Reportes
              </NavLink>
            </li>
          </ul>
        </Stack>
      </Stack>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        maxWidth={'245px'}
        padding={5}
      >
        <Stack>
          <Center
            bgColor={'acsys.primaryColor'}
            height={'37px'}
            width={'35px'}
            borderRadius={3}
            fontWeight={'bold'}
          >
            J
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
              Jacobo Covarrubias. Z.
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
              jacovzapcovarrubias@gmail.com
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
    // <div className='sidebar-container'>

    // </div>
  )
}

export default Sidebar
