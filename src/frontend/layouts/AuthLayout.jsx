import React from 'react';

/**
 * AuthLayout component provides a centered and responsive layout for authentication pages (Login, Signup).
 * It includes a background color and a container for the content.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the layout (e.g., login form, signup form).
 */
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Container for the form, with a white card background and shadow */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;