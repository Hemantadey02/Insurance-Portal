import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'

const UserDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />


      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default UserDashboard