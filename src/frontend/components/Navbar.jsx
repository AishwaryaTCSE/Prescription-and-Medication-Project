import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Logo from './Logo';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={() => navigate('/')} className="hover:opacity-90">
            <Logo />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-700">Welcome, {user.name || 'User'}!</span>
              <Button onClick={onLogout} variant="outline">Logout</Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate('/login')} variant="outline">Login</Button>
              <Button onClick={() => navigate('/signup')} variant="primary">Sign Up</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;