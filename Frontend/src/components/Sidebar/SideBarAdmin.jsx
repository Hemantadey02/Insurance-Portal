import { GitPullRequestCreateArrow, LogOut, MessageCircleDashedIcon } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../store/authSlice'

function SideBarAdmin() {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getLinkClass = (path) => {
        return location.pathname === path
            ? 'block bg-azure-blue text-white font-semibold p-2'  // Active link style
            : 'block text-cool-gray hover:text-azure-blue font-semibold p-2'  // Inactive link style
    }

    // Logout handler
    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')  // Redirect to login page after logout
    }
    return (
        <div className="w-64 bg-white p-2 sticky top-0 h-screen shadow-lg ">
            <nav className="space-y-4">

                <Link to="/admin/requests" className={getLinkClass('/admin/requests')}>
                    <span className='flex gap-2'>
                        <GitPullRequestCreateArrow />
                        All Requests
                    </span>
                </Link>

                <Link to="/admin/messages" className={getLinkClass('/admin/messages')}>
                    <span className='flex gap-2'>
                        <MessageCircleDashedIcon />
                        Messages
                    </span>
                </Link>

                {/* Logout button */}
                <button
                    onClick={handleLogout}
                    className="w-full text-left text-cool-gray hover:text-azure-blue font-semibold p-2 flex gap-2 items-center cursor-pointer"
                >
                    <LogOut />
                    Logout
                </button>
            </nav>
        </div>
    )
}

export default SideBarAdmin