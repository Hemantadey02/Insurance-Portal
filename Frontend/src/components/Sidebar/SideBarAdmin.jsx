import { CircleUserRound, GitPullRequestCreateArrow, LogOut, MessageCircleDashedIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

function SideBarAdmin() {
    const location = useLocation();
    const getLinkClass = (path) => {
        return location.pathname === path
            ? 'block bg-azure-blue text-white font-semibold p-2'  // Active link style
            : 'block text-cool-gray hover:text-azure-blue font-semibold p-2'  // Inactive link style
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

                <Link to="/admin/profile" className={getLinkClass('/admin/profile')}>
                    <span className='flex gap-2'>
                        <CircleUserRound />
                        Profile
                    </span>
                </Link>
            </nav>
        </div>
    )
}

export default SideBarAdmin