// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("student");
  const [email, setEmail] = useState("student@omnischool.edu");
  const [password, setPassword] = useState("1234");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const roles = [
    { id: "student", label: "Student", badge: "bg-blue-100 text-blue-700" },
    { id: "parent", label: "Parent", badge: "bg-purple-100 text-purple-700" },
    {
      id: "teacher",
      label: "Teacher",
      badge: "bg-emerald-100 text-emerald-700",
    },
    { id: "admin", label: "Admin", badge: "bg-slate-800 text-white" },
  ];

  const handleRoleChange = (roleId) => {
    setSelectedRole(roleId);
    setEmail(`${roleId}@omnischool.edu`);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, requestedRole: selectedRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Try password 1234.");
      }

      localStorage.setItem("omni_token", data.token);
      localStorage.setItem("omni_user", JSON.stringify(data));

      navigate(`/dashboard/${selectedRole}`);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-babyBlue-light via-white to-silver-light flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-silver overflow-hidden">
        {/* Header */}
        <div className="bg-babyBlue-dark p-8 text-center relative">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-babyBlue-dark rounded-3xl font-black text-3xl mb-4 shadow-inner">
            S
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            School Management System
          </h1>
          <p className="text-babyBlue-light text-sm mt-1">
            Secure Role-Based Portal
          </p>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-xs font-bold text-grey-slate uppercase tracking-wider mb-3">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleRoleChange(role.id)}
                  className={`p-4 rounded-2xl text-sm font-semibold transition-all border flex items-center justify-between ${
                    selectedRole === role.id
                      ? "border-babyBlue-dark bg-babyBlue-light text-grey-charcoal shadow-sm"
                      : "border-silver hover:bg-silver-light text-grey-slate"
                  }`}
                >
                  <span className="capitalize">{role.label}</span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-bold ${role.badge}`}
                  >
                    {role.id.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-xl">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-grey-slate uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl border border-silver focus:border-babyBlue-dark focus:ring-1 focus:ring-babyBlue-dark outline-none transition-all text-grey-charcoal"
                placeholder="your.email@omnischool.edu"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-grey-slate uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl border border-silver focus:border-babyBlue-dark focus:ring-1 focus:ring-babyBlue-dark outline-none transition-all text-grey-charcoal"
                placeholder="Enter password"
              />
              <p className="text-[11px] text-babyBlue-dark mt-1.5">
                Default demo password: <strong>1234</strong>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-babyBlue-dark hover:bg-babyBlue-dark/90 text-white font-semibold py-4 rounded-2xl transition-all active:scale-[0.985] disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
              )}
              {isLoading
                ? "Signing in..."
                : `Enter ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Portal`}
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <div className="px-8 py-6 bg-silver-light border-t border-silver text-center text-xs text-grey-slate">
          This is a demo system. All academic records are protected.
        </div>
      </div>
    </div>
  );
};

export default Login;
