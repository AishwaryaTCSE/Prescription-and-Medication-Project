import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation

const Sidebar = ({ menuItems, activeItem, isOpen, onClose }) => {
  return (
    <aside className={`w-64 bg-white shadow-md h-screen fixed top-0 left-0 overflow-y-auto p-4 transition-transform duration-300 ease-in-out z-50 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 lg:relative lg:z-auto`}>
      <div className="mb-8 text-center">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-indigo-700">MediManage</h2>
          <button 
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        {/* User profile pic/initials */}
        <div className="mt-4">
          <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-white text-3xl font-bold mx-auto">
            U
          </div>
          <p className="mt-2 text-lg font-semibold text-gray-800">John Doe</p>
          <p className="text-sm text-gray-500">Patient</p>
        </div>
      </div>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link
              to={item.path}
              onClick={onClose}
              className={`flex items-center px-4 py-3 rounded-md transition duration-200 ease-in-out ${
                activeItem === item.id
                  ? 'bg-indigo-500 text-white font-semibold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {item.icon} {/* Placeholder for icon */}
              <span className="ml-3">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;