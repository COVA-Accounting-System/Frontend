import React from 'react'

import { useSelector } from 'react-redux'
// Router imports
import { Routes, Route, Navigate } from 'react-router-dom'

// Homepage
import Homepage from './pages/Homepage/Homepage'

// Login components
import Login from './pages/LoginPages/Login'
import PageNotFound from './pages/LoginPages/PageNotFound'
import Register from './pages/LoginPages/Register'

//Admin components
import Admin from './pages/AdminPages/Admin'
import LoginAdmin from './pages/AdminPages/LoginAdmin'
import MainPageAdmin from './pages/AdminPages/MainPageAdmin'
import RegisterUser from './pages/AdminPages/RegisterUser'
import ListOfUsers from './pages/AdminPages/ListOfUsers'


import MainPage from './pages/MainPage/MainPage'
//Contacts imports
import Client from './pages/SubMenuPages/Contacts/Client'
import Employee from './pages/SubMenuPages/Contacts/Employee'
import Provider from './pages/SubMenuPages/Contacts/Provider'

//Production imports
import Product from './pages/SubMenuPages/Production/Product'
import Order from './pages/SubMenuPages/Production/Order'

//Inventory imports
import RawMaterial from './pages/SubMenuPages/Inventory/RawMaterial'
import InventoryInput from './pages/SubMenuPages/Inventory/InventoryInput'
import InventoryOutput from './pages/SubMenuPages/Inventory/InventoryOutput'

//Accounting imports
import Income from './pages/SubMenuPages/Accounting/Income'
import Expense from './pages/SubMenuPages/Accounting/Expense'

const App = () => {
  const isLogged = useSelector(state => state.authentication.isLogged)
  const isAdminLogged = useSelector(state => state.authentication.isAdminLogged)
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/admin' element={<Admin />}>
        <Route path='login' element={<LoginAdmin />} />
        {isAdminLogged ? (
          <Route path='management' element={<MainPageAdmin />} >
             <Route path='listOfUsers' element={<ListOfUsers />} />
             <Route path='createUser' element={<RegisterUser/>} />
             <Route path='configuration' element={''} />
          </Route>
          
        ) : undefined}
         <Route path='*' element={<Navigate to='/admin/login' replace />} />
        {/* <Route path='*' element={<Navigate to='/page-not-found' replace />} /> */}
      </Route>
      {isLogged ? (
        <Route path='/ca' element={<MainPage />}>
          <Route path='production/order' element={<Order />} />
          <Route path='production/product' element={<Product />} />

          <Route path='inventory/raw-material' element={<RawMaterial />} />
          <Route path='inventory/input' element={<InventoryInput />} />
          <Route path='inventory/output' element={<InventoryOutput />} />
          <Route path='inventory/stock' />

          <Route path='accounting/income' element={<Income />} />
          <Route path='accounting/expense' element={<Expense />} />

          <Route path='contact/client' element={<Client />} />
          <Route path='contact/employee' element={<Employee />} />
          <Route path='contact/provider' element={<Provider />} />

          <Route path='report' />

          <Route path='*' element={<Navigate to='/page-not-found' replace />} />
        </Route>
      ) : undefined}
      <Route path='*' element={<Navigate to='/login' replace />} />
      <Route path='/page-not-found' element={<PageNotFound />} />
    </Routes>
  )
}

export default App
