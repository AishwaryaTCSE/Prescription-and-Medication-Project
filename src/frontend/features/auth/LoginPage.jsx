import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './auth.service';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import '../../features/auth/Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in both fields.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginUser({ email, password });
      if (response.success) {
        window.alert('Login successful! Redirecting to your dashboard.');
        navigate('/dashboard');
      } else {
        setError(response.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Unexpected error during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left: Form Panel */}
      <div className="form-panel">
        <h2 className="form-title">Welcome back</h2>
        <p className="form-subtitle">Sign in to continue to MediManage</p>
        {error && <p className="error-message mb-2">{error}</p>}
        <form onSubmit={handleLogin} className="login-form-content">
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="signup-text">
          Don’t have an account?{' '}
          <button className="signup-link" type="button" onClick={() => navigate('/signup')}>
            Sign up
          </button>
        </div>
      </div>

      {/* Right: Image Panel with overlay text */}
      <div className="image-panel">
        <div className="image-overlay-text">
          <h1>Modern Medication Management</h1>
          <p>Smarter care with AI assistance and clean design</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
