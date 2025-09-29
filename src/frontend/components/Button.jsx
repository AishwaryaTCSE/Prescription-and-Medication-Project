import React from 'react';

const Button = ({ children, onClick, className, variant = 'primary', ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-75 transition duration-150 ease-in-out";

  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "bg-amber-400 text-gray-900 hover:bg-amber-500 focus:ring-amber-400",
    accent: "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    outline: "bg-transparent border-2 text-indigo-600 border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;