import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Sidebar from './Sidebar'; // Assuming Sidebar is in the same directory
import Navbar from './Navbar';   // Assuming Navbar is in the same directory
import Footer from './Footer';   // Assuming Footer is in the same directory
import { logout } from '../store/userSlice';
import { useTheme } from '../theme/ThemeProvider';

/**
 * DashboardLayout component provides the main structure for authenticated user sections.
 * It includes a Navbar at the top, a Sidebar on the left (collapsible),
 * a main content area, and a Footer at the bottom.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The main content of the dashboard page.
 * @param {string} props.activeSidebarItem - The key of the currently active item in the sidebar.
 * @param {object} props.user - The currently logged-in user object.
 * @param {function} props.onLogout - Function to handle user logout.
 */
const DashboardLayout = ({ children, activeSidebarItem, user }) => {
  // State to manage the visibility of the sidebar on smaller screens
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  // Define menu items for the sidebar
  // In a real app, these might come from a context or be passed as props
  const sidebarMenu = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { id: 'medications', label: 'Medications', path: '/medications', icon: '💊' },
    { id: 'schedule', label: 'Schedule', path: '/schedule', icon: '📅' },
    { id: 'profile', label: 'Profile', path: '/profile', icon: '👤' },
    { id: 'help', label: 'Help & Support', path: '/help', icon: '❓' },
  ];

  const location = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const hideNavbarForRoutes = ['/medications'];
  const shouldHideNavbar = hideNavbarForRoutes.includes(location.pathname);

  return (
    <div className={`flex min-h-screen ${isDark ? 'bg-[#0b0f17] text-slate-200' : 'bg-gray-100 text-gray-900'}`}>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar
        menuItems={sidebarMenu}
        activeItem={activeSidebarItem}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar (hidden on certain routes) */}
        {!shouldHideNavbar && (
          <Navbar dark={isDark} user={user} onLogout={handleLogout} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        )}

        {/* Main Content */}
        <main className={`flex-1 overflow-x-hidden overflow-y-auto ${isDark ? 'bg-[#0b0f17]' : 'bg-gray-100'} p-4 sm:p-6 lg:p-8`}>
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;