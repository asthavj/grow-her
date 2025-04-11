import React, { useState } from 'react';
import '../styles/login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Perform login validation
    if (formData.username && formData.password) {
      alert(`Welcome back, ${formData.username}!`);
      // In a real app, you would:
      // 1. Call your authentication API
      // 2. Redirect on success (using react-router)
       window.location.href = '/profile';
    } else {
      alert('Please enter your username and password.');
    }
  };

  return (<div className="login-page">

    <div className="container">
      <h1>Welcome Back!</h1>
      <p className="subtitle">Login to continue your journey with growHer</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Enter your username" 
            value={formData.username}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Enter your password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group remember-me">
          <input 
            type="checkbox" 
            id="remember-me" 
            name="rememberMe" 
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <label htmlFor="remember-me">Keep me logged in</label>
        </div>
        <button type="submit" className="btn btn-login">Login</button>
      </form>

      <p className="signup-link">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
    </div>
  );
};

export default Login;