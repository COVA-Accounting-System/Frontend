import React, { useState } from 'react'
import { FaBoxOpen, FaMoneyBillAlt } from 'react-icons/fa'
import { RiArchiveDrawerFill } from 'react-icons/ri'
import { AiFillSignal } from 'react-icons/ai'
import { BsPersonFill } from 'react-icons/bs'
import { MdOutlineArrowRight } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import './Sidebar.scss'

const Sidebar = () => {
  const [subMenus, setSubMenus] = useState([
    { name: 'submenu-production', isOpen: false, subElements: 2 },
    { name: 'submenu-inventory', isOpen: false, subElements: 4 },
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
    backgroundColor: '#e6e9f0',
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

  const changeIsActiveAndOpenSubmenu = (name) => {
    const subMenusChanged = subMenus.map((submenu) => {
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
    <div className='sidebar-container'>
      <h1 className='sidebar-title'>ACSYS</h1>
      <ul>
        <li>
          <div
            className='element'
            id='accountingSubmenu'
            onClick={() => changeIsActiveAndOpenSubmenu('submenu-production')}
            style={(subMenus[0].isOpen) ? activeSubMenuItemStyle : {}}
          >
            <FaBoxOpen className='global-icon-class' />
            Producción
            <MdOutlineArrowRight
              className='arrow-icon-class'
              style={
                subMenus[0].isOpen
                  ? rotateArrowStyle
                  : {}
              }
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
            onClick={() => changeIsActiveAndOpenSubmenu('submenu-inventory')}
            style={(subMenus[1].isOpen) ? activeSubMenuItemStyle : {}}
          >
            <RiArchiveDrawerFill className='global-icon-class' />
            Inventario
            <MdOutlineArrowRight
              className='arrow-icon-class'
              style={
                subMenus[1].isOpen
                  ? rotateArrowStyle
                  : {}
              }
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
                Materiales
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
            <li>
              <NavLink
                className='element-inside'
                to='/ca/inventory/stock'
                style={({ isActive }) => (isActive ? activeStyle : {})}
              >
                Stock
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <div
            className='element'
            id='accountingSubmenu'
            onClick={() => changeIsActiveAndOpenSubmenu('submenu-accounting')}
            style={(subMenus[2].isOpen) ? activeSubMenuItemStyle : {}}
          >
            <FaMoneyBillAlt className='global-icon-class' />
            Contabilidad
            <MdOutlineArrowRight
              className='arrow-icon-class'
              style={
                subMenus[2].isOpen
                  ? rotateArrowStyle
                  : {}
              }
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
            style={(subMenus[3].isOpen) ? activeSubMenuItemStyle : {}}
          >
            <BsPersonFill className='global-icon-class' />
            Contactos
            <MdOutlineArrowRight
              className='arrow-icon-class'
              style={
                subMenus[3].isOpen
                  ? rotateArrowStyle
                  : {}
              }
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
                Empleados
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
    </div>
  )
}

export default Sidebar
