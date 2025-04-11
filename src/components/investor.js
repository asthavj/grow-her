import React, { useState } from 'react';
import '../styles/investor.css';

const InvestorSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    occupation: '',
    company: '',
    linkedin: '',
    governmentId: null,
    terms: false
  });

  const [errors, setErrors] = useState({
    passwordMatch: '',
    fileType: '',
    fileSize: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value)
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      passwordMatch: '',
      fileType: '',
      fileSize: ''
    };

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.passwordMatch = 'Passwords do not match!';
      isValid = false;
    }

    // File validation
    if (formData.governmentId) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(formData.governmentId.type)) {
        newErrors.fileType = 'Invalid file type! Only PDF, JPG, and PNG are allowed.';
        isValid = false;
      }

      if (formData.governmentId.size > maxSize) {
        newErrors.fileSize = 'File size exceeds the 5MB limit!';
        isValid = false;
      }
    } else {
      newErrors.fileType = 'Please upload your government ID!';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const formPayload = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'governmentId') {
          formPayload.append(key, formData[key]);
        } else if (formData.governmentId) {
          formPayload.append('governmentId', formData.governmentId);
        }
      });

      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        body: formPayload
      });

      const data = await response.json();
      alert(data.message);

      if (response.ok) {
        // Redirect to profile page on successful signup
        window.location.href = `/profile?email=${encodeURIComponent(formData.email)}`;
      }
    } catch (err) {
      alert('Error submitting form');
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <h1>Investor Signup</h1>
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <fieldset>
          <legend>Basic Information</legend>
          <div className="form-group">
            <label htmlFor="full-name">Full Name</label>
            <input 
              type="text" 
              id="full-name" 
              name="fullName" 
              value={formData.fullName}
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
            {errors.passwordMatch && <p className="error">{errors.passwordMatch}</p>}
          </div>
        </fieldset>

        {/* Professional Details */}
        <fieldset>
          <legend>Professional Details</legend>
          <div className="form-group">
            <label htmlFor="occupation">Occupation</label>
            <select 
              id="occupation" 
              name="occupation" 
              value={formData.occupation}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="self-employed">Self-employed</option>
              <option value="corporate">Corporate</option>
              <option value="retired">Retired</option>
              <option value="others">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="company">Company/Organization (Optional)</label>
            <input 
              type="text" 
              id="company" 
              name="company" 
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="linkedin">LinkedIn Profile (Optional)</label>
            <input 
              type="url" 
              id="linkedin" 
              name="linkedin" 
              value={formData.linkedin}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* Verification & Security */}
        <fieldset>
          <legend>Verification & Security</legend>
          <div className="form-group">
            <label htmlFor="government-id">Upload Government ID</label>
            <input 
              type="file" 
              id="government-id" 
              name="governmentId" 
              accept=".pdf,.jpg,.png" 
              onChange={handleChange}
              required
            />
            {errors.fileType && <p className="error">{errors.fileType}</p>}
            {errors.fileSize && <p className="error">{errors.fileSize}</p>}
          </div>
          <div className="form-group">
            <input 
              type="checkbox" 
              id="terms" 
              name="terms" 
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            <label htmlFor="terms">I agree to the Terms & Conditions</label>
          </div>
        </fieldset>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default InvestorSignup;
