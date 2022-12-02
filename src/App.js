import React from 'react'

import { useSelector } from 'react-redux'
// Router imports
import { Routes, Route, Navigate } from 'react-router-dom'

// Components imports
import Login from './pages/Login'
import InventoryMode from './pages/InventoryMode/InventoryMode'
import Client from './pages/InventoryMode/Client/Client.jsx'
import Employee from './pages/InventoryMode/Employee/Employee'
import RawProvider from './pages/InventoryMode/Provider/RawProvider'
import Product from './pages/InventoryMode/Products/Product'
import PageNotFound from './pages/PageNotFound'
import Order from './pages/InventoryMode/Order/Order'

const App = () => {
  const isLogged = useSelector((state) => state.authentication.isLogged)
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace />} />
      <Route path='/login' element={<Login />} />
      {isLogged
        ? (
          <Route path='/accounting-mode/' element={<InventoryMode />}>
            <Route path='order' element={<Order />} />

            <Route path='inventory/raw-material' />
            <Route path='inventory/input' />
            <Route path='inventory/output' />

            <Route path='product' element={<Product />} />

            <Route path='accounting/income' />
            <Route path='accounting/expense' />

            <Route path='contact/client' element={<Client />} />
            <Route path='contact/employee' element={<Employee />} />
            <Route path='contact/provider' element={<RawProvider />} />

            <Route path='report' />
            <Route
              path='*'
              element={<Navigate to='/page-not-found' replace />}
            />
          </Route>
          )
        : undefined}
      <Route
        path='*'
        element={<Navigate to='/login' replace />}
      />
      <Route path='/page-not-found' element={<PageNotFound />} />
    </Routes>
  )
}

export default App
