import React, { useState } from 'react';
import '../styles/business.css';

const BusinessSignupForm = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    industry: '',
    businessType: '',
    description: '',
    website: '',
    fundingGoal: '',
    investmentType: '',
    businessStage: '',
    registrationCertificate: null,
    governmentId: null,
    terms: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.terms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }
    
    // Add more validations as needed
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Prepare form data for submission
      const submissionData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          submissionData.append(key, formData[key]);
        }
      });

      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        body: submissionData,
      });
      
      const data = await response.json();
      alert(data.message);
      
      if (formData.email) {
        window.location.href = `profile.html?email=${encodeURIComponent(formData.email)}`;
      } else {
        console.error("Email is missing or undefined");
      }
    } catch (err) {
      alert('Error submitting form');
      console.error(err);
    }
  };

  const handleLoginRedirect = () => {
    alert('Redirecting to Login Page...');
    window.location.href = 'profile.html';
  };

  return (
    <div className="signup-container">
      <h1>Business Account Setup</h1>
      <form id="business-form" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <fieldset>
          <legend>Basic Information</legend>
          <div className="form-group">
            <label htmlFor="business-name">Business Name</label>
            <input 
              type="text" 
              id="business-name" 
              name="businessName" 
              value={formData.businessName}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="owner-name">Owner's Full Name</label>
            <input 
              type="text" 
              id="owner-name" 
              name="ownerName" 
              value={formData.ownerName}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone}
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
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input 
              type="password" 
              id="confirm-password" 
              name="confirmPassword" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required 
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
        </fieldset>

        {/* Business Details */}
        <fieldset>
          <legend>Business Details</legend>
          <div className="form-group">
            
            <label htmlFor="industry">Business Industry</label>
            <select 
              id="industry" 
              name="industry" 
              value={formData.industry}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="tech">Tech</option>
              <option value="fashion">Fashion</option>
              <option value="healthcare">Healthcare</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="business-type">Business Type</label>
            <select 
              id="business-type" 
              name="businessType" 
              value={formData.businessType}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="startup">Startup</option>
              <option value="small-business">Small Business</option>
              <option value="established-business">Established Business</option>
              <option value="ngo">NGO</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Business Description (Short Pitch)</label>
            <textarea 
              id="description" 
              name="description" 
              rows="4" 
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="website">Website/Social Media Links (Optional)</label>
            <input 
              type="url" 
              id="website" 
              name="website" 
              value={formData.website}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* Investment Requirements */}
        <fieldset>
          <legend>Investment Requirements</legend>
          <div className="form-group">
            <label htmlFor="funding-goal">Funding Goal</label>
            <select 
              id="funding-goal" 
              name="fundingGoal" 
              value={formData.fundingGoal}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="50k">₹50k</option>
              <option value="1L">₹1L</option>
              <option value="5L+">₹5L+</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="investment-type">Investment Type</label>
            <select 
              id="investment-type" 
              name="investmentType" 
              value={formData.investmentType}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="equity">Equity</option>
              <option value="loans">Loans</option>
              <option value="crowdfunding">Crowdfunding</option>
              <option value="grants">Grants</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="business-stage">Business Stage</label>
            <select 
              id="business-stage" 
              name="businessStage" 
              value={formData.businessStage}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="idea">Idea</option>
              <option value="prototype">Prototype</option>
              <option value="early-revenue">Early Revenue</option>
              <option value="scaling">Scaling</option>
            </select>
          </div>
        </fieldset>

        {/* Verification & Security */}
        <fieldset>
          <legend>Verification & Security</legend>
          <div className="form-group">
            <label htmlFor="registration-certificate">Upload Business Registration Certificate</label>
            <input 
              type="file" 
              id="registration-certificate" 
              name="registrationCertificate" 
              onChange={handleChange}
              accept=".pdf,.jpg,.png" 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="government-id">Upload Government ID (Owner's PAN, Aadhaar, Passport)</label>
            <input 
              type="file" 
              id="government-id" 
              name="governmentId" 
              onChange={handleChange}
              accept=".pdf,.jpg,.png" 
              required 
            />
          </div>
          <div className="form-group checkbox-group">
            <input 
              type="checkbox" 
              id="terms" 
              name="terms" 
              checked={formData.terms}
              onChange={handleChange}
              required 
            />
            <label htmlFor="terms">I agree to the Terms & Conditions</label>
            {errors.terms && <span className="error">{errors.terms}</span>}
          </div>
        </fieldset>

        <button type="submit">Submit</button>
        <button type="button" onClick={handleLoginRedirect} className="login-button">
          Already have an account? Login
        </button>
      </form>
    </div>
  );
};

export default BusinessSignupForm;