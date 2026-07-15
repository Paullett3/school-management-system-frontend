// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // 1. STATE MANAGEMENT: Remembers user inputs and the selected role
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('student@omnischool.edu');
  const [password, setPassword] = useState('1234');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 2. ROLE DEFINITIONS: Configuration for our interactive tabs
  const roles = [
    { id: 'student', label: 'Student', badge: 'bg-blue-100 text-blue-700' },
    { id: 'parent', label: 'Parent', badge: 'bg-purple-100 text-purple-700' },
    { id: 'teacher', label: 'Teacher', badge: 'bg-emerald-100 text-emerald-700' },
    { id: 'admin', label: 'Admin', badge: 'bg-slate-800 text-white' },
  ];

  // 3. EVENT HANDLER: What happens when you click a role tab
  const handleRoleChange = (roleId) => {
    setSelectedRole(roleId);
    setEmail(`${roleId}@omnischool.edu`); // Auto-fills matching test email
    setErrorMessage('');
  };

  // 4. FORM SUBMISSION: Sends login data to the backend API
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Connect to your MERN backend API
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, requestedRole: selectedRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Try password 1234.');
      }

      // Save user security token and profile in the browser's memory
      localStorage.setItem('omni_token', data.token);
      localStorage.setItem('omni_user', JSON.stringify(data));

      // Redirect the user to their specific dashboard
      navigate(`/dashboard/${selectedRole}`);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Outer Background: Soft gradient using Baby Blue and White
    <div className="min-h-screen bg-gradient-to-br from-babyBlue-light via-white to-silver-light flex items-center justify-center p-4 font-sans">
      
      {/* Stylish Dialog Box Container with Silver Borders and Soft Shadows */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-silver overflow-hidden transition-all duration-300 hover:shadow-babyBlue/20">
        
        {/* Dialog Header: Classic Baby Blue with Charcoal Grey Text */}
        <div className="bg-babyBlue p-8 text-center relative overflow-hidden">
          {/* Subtle decorative circle in the background */}
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
          
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white text-grey-charcoal rounded-2xl font-black text-2xl mb-3 shadow-md border border-silver-light">
            OS
          </div>
          <h1 className="text-2xl font-extrabold text-grey-charcoal tracking-tight">
            Omni School Portal
          </h1>
          <p className="text-grey-charcoal/80 text-xs font-semibold uppercase tracking-wider mt-1">
            Secure Role-Based Access
          </p>
        </div>

        {/* Dialog Body Section */}
        <div className="p-6 sm:p-8 bg-white">
          
          {/* STEP 1: Interactive Role Selection Tabs */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-grey-slate uppercase tracking-wider mb-2">
              1. Select Your Portal Persona:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleRoleChange(role.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all duration-200 border text-left flex items-center justify-between ${
                    selectedRole === role.id
                      ? 'border-babyBlue-dark bg-babyBlue-light text-grey-charcoal shadow-sm ring-2 ring-babyBlue/40'
                      : 'border-silver bg-silver-light/40 text-grey-slate hover:bg-silver-light hover:border-silver-dark'
                  }`}
                >
                  <span className="capitalize">{role.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-extrabold ${role.badge}`}>
                    {role.id.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-400 text-red-700 text-xs rounded-lg font-medium animate-pulse">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* STEP 2: Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Address Input */}
            <div>
              <label className="block text-xs font-bold text-grey-charcoal uppercase tracking-wider mb-1">
                2. Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter.any.email@omnischool.edu"
                className="w-full px-4 py-3 rounded-xl border border-silver focus:ring-2 focus:ring-babyBlue focus:border-babyBlue outline-none transition text-grey-charcoal text-sm bg-silver-light/30 focus:bg-white font-medium"
              />
              <span className="text-[11px] text-grey-slate mt-1 inline-block">
                💡 Any valid email works for initial workability testing.
              </span>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-grey-charcoal uppercase tracking-wider">
                  3. Password
                </label>
                <span className="text-[11px] font-bold text-babyBlue-dark">Default: 1234</span>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-silver focus:ring-2 focus:ring-babyBlue focus:border-babyBlue outline-none transition text-grey-charcoal text-sm bg-silver-light/30 focus:bg-white font-medium"
              />
            </div>

            {/* Submit Action Button: Styled in Baby Blue with Dark Grey Text */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-babyBlue hover:bg-babyBlue-dark active:scale-[0.99] text-grey-charcoal font-black py-3.5 px-4 rounded-xl shadow-lg shadow-babyBlue/30 hover:shadow-xl transition-all duration-200 flex justify-center items-center text-sm uppercase tracking-wider disabled:opacity-50 border border-white/40"
            >
              {isLoading ? (
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-grey-charcoal border-t-transparent mr-2"></span>
              ) : null}
              {isLoading ? 'Verifying...' : `Enter ${selectedRole} Portal`}
            </button>
          </form>

          {/* Dialog Footer */}
          <div className="mt-8 pt-4 border-t border-silver/60 text-center">
            <p className="text-[11px] text-grey-slate">
              🛡️ <strong>System Notice:</strong> Locked academic records can only be modified by authorized Admin or Registrar staff.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;