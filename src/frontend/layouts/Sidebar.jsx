import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { useSelector } from 'react-redux';

import { useTheme } from '../theme/ThemeProvider';

/**
 * Sidebar component displays a navigation menu, typically used in the DashboardLayout.
 * It supports collapsible behavior, active link highlighting, user information, and icons.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.menuItems - An array of menu item objects, each with id, label, path, and icon.
 * @param {string} props.activeItem - The id of the currently active menu item.
 * @param {boolean} props.isOpen - Whether the sidebar is currently open (especially for mobile/tablet views).
 * @param {function} props.onClose - Function to close the sidebar.
 */
const Sidebar = ({ menuItems, activeItem, isOpen, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const location = useLocation();
  const navigate = useNavigate();
  const authUser = useSelector((s) => s.user?.user);
  const displayName = (authUser?.displayName && authUser.displayName.split(' ')[0]) || (authUser?.email && authUser.email.split('@')[0]) || 'User';

  // Tailwind classes for the main sidebar container
  const sidebarBaseClasses = `fixed inset-y-0 left-0 z-30 w-64 transition duration-300 transform ${isDark ? 'bg-[#0f1522] border-r border-slate-800 text-slate-200' : 'bg-white'} shadow-xl p-4 sm:p-5 lg:translate-x-0`;
  const sidebarClasses = isOpen
    ? `${sidebarBaseClasses} translate-x-0` // Sidebar is open
    : `${sidebarBaseClasses} -translate-x-full`; // Sidebar is hidden (off-screen)

  // Classes for the overlay when the sidebar is open on mobile/tablet
  const overlayClasses = isOpen
    ? "lg:hidden fixed inset-0 z-20 bg-black opacity-50 transition-opacity duration-300"
    : "lg:hidden fixed inset-0 z-20 bg-black opacity-0 pointer-events-none transition-opacity duration-300";

  return (
    <>
      {/* Overlay for mobile/tablet */}
      <div className={overlayClasses} onClick={onClose}></div>

      {/* Sidebar Container */}
      <aside className={sidebarClasses}>
        {/* Close Button (for mobile/tablet view) */}
        <div className="lg:hidden flex justify-end mb-6">
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close sidebar menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* User Profile Section */}
        <div className="mb-8 text-center">
          {/* Placeholder for User Avatar/initials */}
          <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-white text-4xl font-bold mx-auto shadow-md">
            {(displayName?.charAt(0) || 'U').toUpperCase()}
          </div>
          <p className={`mt-3 text-xl font-semibold ${isDark ? 'text-slate-100' : 'text-gray-800'}`}>{displayName}</p>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Patient</p>
        </div>

        {/* Navigation Menu */}
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition duration-200 ease-in-out ${
                  activeItem === item.id
                    ? 'bg-indigo-600 text-white shadow-md font-semibold'
                    : isDark ? 'text-slate-200 hover:bg-slate-800 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => {
                  // Always close sidebar when navigating
                  onClose && onClose();
                  // Route Patients to /schedule instead of /history
                  if (item.id === 'patients') {
                    navigate('/schedule');
                    return;
                  }
                  // If navigating to medications, add query to open form
                  if (item.path === '/medications' && !location.search.includes('add=1')) {
                    window.history.replaceState({}, '', `${item.path}?add=1`);
                  }
                }}
              >
                <span className="mr-3 text-lg">{item.icon}</span> {/* Icon */}
                <span>{item.label}</span> {/* Menu Item Label */}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;