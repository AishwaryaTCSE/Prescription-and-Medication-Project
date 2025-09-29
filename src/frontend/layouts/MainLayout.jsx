import React from 'react';
import Navbar from './Navbar'; // Assuming Navbar is in the same directory
import Footer from './Footer'; // Assuming Footer is in the same directory

/**
 * MainLayout provides a basic page structure with a Navbar and a Footer.
 * It's suitable for pages that don't require a sidebar, like the homepage or landing pages.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The main content of the page.
 * @param {object} [props.user] - The currently logged-in user object (optional, for Navbar).
 * @param {function} [props.onLogout] - Function to handle user logout (optional, for Navbar).
 */
const MainLayout = ({ children, user, onLogout }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar user={user} onLogout={onLogout} />

      {/* Main Content Area */}
      <main className="flex-grow bg-gray-100 p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;