import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button'; // Assuming Button component is in ../components/Button
import Logo from '../components/Logo';
import { useTheme } from '../theme/ThemeProvider';

/**
 * Navbar component displays the top navigation bar.
 * Features include branding, navigation links, user status (welcome message, logout button),
 * and a responsive hamburger menu button for the sidebar.
 *
 * @param {object} props - Component props.
 * @param {object} [props.user] - The currently logged-in user object. If provided, shows welcome message and logout.
 * @param {function} [props.onLogout] - Function to handle user logout.
 * @param {function} [props.onMenuClick] - Function to call when the menu button is clicked (for toggling sidebar).
 */
const Navbar = ({ user, onLogout, onMenuClick, dark = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isDark = dark || theme === 'dark';

  return (
    <nav className={`${isDark ? 'bg-[#0f1522] border-b border-slate-800' : 'bg-white shadow-md'} py-3 px-4 sm:px-6 lg:px-8`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section: Branding & Menu Toggle */}
        <div className="flex items-center">
          {/* Hamburger Menu Button (visible on small screens) */}
          <button
            className="lg:hidden mr-4 p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={onMenuClick}
            aria-label="Open sidebar menu"
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
                d="M4 6h16M4 12h16m-7 6h14"
              ></path>
            </svg>
          </button>

          {/* Branding/Logo */}
          <Link to="/" className="hover:opacity-90 transition duration-200">
            <Logo />
          </Link>
        </div>

        {/* Right Section: Navigation Links & User Actions */}
        <div className={`hidden lg:flex items-center space-x-6 ${isDark ? 'text-slate-200' : ''}`}>
          {/* Navigation Links (Example) */}
          <Link to="/dashboard" className={`${isDark ? 'text-slate-200 hover:text-white' : 'text-gray-700 hover:text-indigo-600'} transition duration-200`}>Dashboard</Link>
          <Link to="/medications" className={`${isDark ? 'text-slate-200 hover:text-white' : 'text-gray-700 hover:text-indigo-600'} transition duration-200`}>My Medications</Link>
          <Link to="/profile" className={`${isDark ? 'text-slate-200 hover:text-white' : 'text-gray-700 hover:text-indigo-600'} transition duration-200`}>Profile</Link>
          <button onClick={toggleTheme} className={`${isDark ? 'text-slate-200 hover:text-white' : 'text-gray-700 hover:text-indigo-600'} text-sm`}>{isDark ? '🌙' : '🌞'}</button>

          {/* User Actions */}
          {user ? (
            <>
              <span className={`${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                Welcome, {(user.displayName && user.displayName.split(' ')[0]) || (user.email && user.email.split('@')[0]) || user.firstName || user.name || 'User'}!
              </span>
              <Button onClick={onLogout} variant="outline" size="sm">Logout</Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate('/login')} variant="outline" size="sm">Login</Button>
              <Button onClick={() => navigate('/signup')} variant="primary" size="sm">Sign Up</Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle (for user actions/links if needed) */}
        <div className="lg:hidden flex items-center">
          {user ? (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`ml-3 p-2 rounded-full ${dark ? 'text-slate-200 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              aria-label="User menu"
            >
              {/* User avatar or initial */}
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                {user.firstName?.charAt(0) || user.name?.charAt(0) || 'U'}
              </div>
            </button>
          ) : (
            <Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} variant="outline" size="sm">Menu</Button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu (conditionally rendered) */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden ${dark ? 'bg-[#0b121f] border-slate-800' : 'bg-gray-50 border-gray-200'} border-t py-3 px-4`}>
          {user ? (
            <>
              <Link to="/dashboard" className={`block px-3 py-2 rounded-md text-base font-medium ${dark ? 'text-slate-200 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
              <Link to="/medications" className={`block px-3 py-2 rounded-md text-base font-medium ${dark ? 'text-slate-200 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setIsMobileMenuOpen(false)}>My Medications</Link>
              <Link to="/profile" className={`block px-3 py-2 rounded-md text-base font-medium ${dark ? 'text-slate-200 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
              <button onClick={() => { setIsMobileMenuOpen(false); onLogout && onLogout(); }} className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${dark ? 'text-red-400 hover:bg-slate-800' : 'text-red-600 hover:bg-gray-100'}`}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Login</button>
              <Button onClick={() => { setIsMobileMenuOpen(false); navigate('/signup'); }} variant="primary" className="block w-full mt-2">Sign Up</Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;