import React from 'react';
import '../styles/signin.css';

const SignIn = () => {
  const signUpAs = (role) => {
    alert(`You are signing up as a ${role}. Redirecting to ${role} signup form...`);
    
    // In a real app, you would use react-router's navigate instead
    if (role === 'Investor') {
      window.location.href = '/investor'; // Replace with your actual route
    } else if (role === 'Business') {
      window.location.href = '/business'; // Replace with your actual route
    }
  };

  const login = () => {
    alert('Redirecting to Login Page...');
    window.location.href = '/login'; // Replace with your actual route
  };

  return (<div className="signup-page">
  
    <div className="container">
      <h1>GrowHer</h1>
      <p className="subtitle">Empowering Women in Business and Investment</p>
      <button 
        className="btn btn-investor" 
        onClick={() => signUpAs('Investor')}
      >
        Sign Up as Investor
      </button>
      <button 
        className="btn btn-business" 
        onClick={() => signUpAs('Business')}
      >
        Sign Up as Business
      </button>
      <button 
        className="btn btn-login" 
        onClick={login}
      >
        Login
      </button>
    </div>
    </div>
  );
};

export default SignIn;