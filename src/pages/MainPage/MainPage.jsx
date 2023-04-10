import React from 'react'
import './MainPage.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
// import SidebarM from '../../components/Sidebar/SidebarM'
import { Outlet } from 'react-router-dom'

const MainPage = () => {
  return (
    <div>
      <div className='view-container'>
        {/* <SidebarM /> */}
        <Sidebar />
        <div className='content-container'>
          {/* <div className="navbar-container">
            <Navbar />
          </div> */}
          <div className='data-container'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
