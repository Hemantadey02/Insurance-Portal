import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, BookPlus, CircleUserRound, GitPullRequestCreateArrow, LogOut, BookOpenText, BaggageClaim, MessageCircleDashedIcon } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation()

  useEffect(() => {
    const scrollToTop = () => {
      const start = window.scrollY;
      const duration = 800; // animation duration in ms
      let startTime = null;

      const easeInOutQuad = (t) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // smooth easing

      const animate = (time) => {
        if (!startTime) startTime = time;
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, start * (1 - easeInOutQuad(progress)));
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    };

    scrollToTop();
  }, [location.pathname]);

  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'block bg-azure-blue text-white font-semibold p-2'  // Active link style
      : 'block text-cool-gray hover:text-azure-blue font-semibold p-2'  // Inactive link style
  }

  return (
    <div className="w-64 bg-white p-2 sticky top-0 h-screen shadow-lg ">
      <nav className="space-y-4">
        <Link to="/dashboard/policies" className={getLinkClass('/dashboard/policies')}>
          <span className="flex gap-2">
            <BookOpenText />
            Explore Policies
          </span>
        </Link>

        <Link to="/dashboard/myPolicies" className={getLinkClass('/dashboard/myPolicies')}>
          <span className='flex gap-2'>
            <BookPlus />
            My Policies
          </span>
        </Link>

        <Link to="/dashboard/requests" className={getLinkClass('/dashboard/requests')}>
          <span className='flex gap-2'>
            <GitPullRequestCreateArrow />
            My Requests
          </span>
        </Link>

        <Link to="/dashboard/claims" className={getLinkClass('/dashboard/claims')}>
          <span className='flex gap-2'>
            <BaggageClaim />
            My Claims
          </span>
        </Link>

        <Link to="/dashboard/profile" className={getLinkClass('/dashboard/profile')}>
          <span className='flex gap-2'>
            <CircleUserRound />
            Profile
          </span>
        </Link>

        <Link to="/dashboard/messages" className={getLinkClass('/dashboard/messages')}>
          <span className='flex gap-2'>
            <MessageCircleDashedIcon />
            Messages
          </span>
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar