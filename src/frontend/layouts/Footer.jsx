import React from 'react';

/**
 * Footer component displays copyright information and relevant links.
 * It's designed to be placed at the bottom of the page.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <p>&copy; {currentYear} MediManage. All rights reserved.</p>
        <div className="mt-3 flex justify-center space-x-4 text-sm">
          <a href="/about" className="hover:text-gray-300 transition duration-200">About Us</a>
          <a href="/contact" className="hover:text-gray-300 transition duration-200">Contact</a>
          <a href="/privacy" className="hover:text-gray-300 transition duration-200">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-300 transition duration-200">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;