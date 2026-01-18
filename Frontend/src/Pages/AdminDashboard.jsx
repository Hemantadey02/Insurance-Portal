import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBarAdmin from '../components/Sidebar/SideBarAdmin'

const AdminDashboard = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}

            <SideBarAdmin />
            {/* Main content */}
            <main className="flex-1 overflow-y-auto px-10 py-4">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminDashboard
