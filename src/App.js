import React from 'react'

import { useSelector } from 'react-redux'
// Router imports
import { Routes, Route, Navigate } from 'react-router-dom'

// Components imports
import Login from './pages/LoginPages/Login'
import PageNotFound from './pages/LoginPages/PageNotFound'

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

//Accounting imports
import Income from './pages/SubMenuPages/Accounting/Income'
import Expense from './pages/SubMenuPages/Accounting/Expense'

const App = () => {
  const isLogged = useSelector(state => state.authentication.isLogged)
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace />} />
      <Route path='/login' element={<Login />} />
      {isLogged ? (
        <Route path='/ca' element={<MainPage />}>
          <Route path='production/order' element={<Order />} />
          <Route path='production/product' element={<Product />} />

          <Route path='inventory/raw-material' element={<RawMaterial />} />
          <Route path='inventory/input' element={<InventoryInput />} />
          <Route path='inventory/output' />
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
