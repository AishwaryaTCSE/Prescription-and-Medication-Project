import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import '../../features/auth/Login.css';
import { signupUser } from './auth.service';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    if (!name) formErrors.name = 'Name is required.';
    if (!email) formErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = 'Email is invalid.';
    if (!password) formErrors.password = 'Password is required.';
    else if (password.length < 6) formErrors.password = 'Password must be at least 6 characters.';
    if (!confirmPassword) formErrors.confirmPassword = 'Confirm password is required.';
    else if (password !== confirmPassword) formErrors.confirmPassword = 'Passwords do not match.';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const res = await signupUser({ name, email, password });
    if (res.success) {
      window.alert('Signup successful! Please sign in with your credentials.');
      navigate('/login');
    } else {
      setErrors((prev) => ({ ...prev, form: res.message || 'Signup failed' }));
    }
  };

  return (
    <div className="login-container">
      {/* Left: Form Panel */}
      <div className="form-panel">
        <h2 className="form-title">Create your account</h2>
        <p className="form-subtitle">Join MediManage and get started</p>

        <form onSubmit={handleSignup} className="login-form-content">
          <InputField
            label="Full Name"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            error={errors.name}
          />
          <InputField
            label="Email Address"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            error={errors.email}
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            error={errors.password}
          />
          <InputField
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            error={errors.confirmPassword}
          />

          <Button type="submit" className="login-button">
            {"Sign Up"}
          </Button>
        </form>

        <div className="signup-text">
          Already have an account?{' '}
          <button className="signup-link" type="button" onClick={() => navigate('/login')}>
            Sign in
          </button>
        </div>
      </div>

      {/* Right: Image Panel with overlay text */}
      <div className="image-panel">
        <div className="image-overlay-text">
          <h1>Empower your health journey</h1>
          <p>Organize prescriptions and refills effortlessly</p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;