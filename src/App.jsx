// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';

// Placeholder Dashboard Components for Each Role
const StudentDashboard = () => (
  <div className="p-8 font-sans bg-babyBlue-light min-h-screen text-grey-charcoal">
    <h1 className="text-2xl font-bold">🎓 Student Portal</h1>
    <p className="mt-2 text-grey-slate">View your personal academic history and published grades here.</p>
  </div>
);

const TeacherDashboard = () => (
  <div className="p-8 font-sans bg-babyBlue-light min-h-screen text-grey-charcoal">
    <h1 className="text-2xl font-bold">🍎 Teacher Portal</h1>
    <p className="mt-2 text-grey-slate">Submit grades for course sections you teach. Locked records are read-only.</p>
  </div>
);

const ParentDashboard = () => (
  <div className="p-8 font-sans bg-babyBlue-light min-h-screen text-grey-charcoal">
    <h1 className="text-2xl font-bold">👨‍👩‍👧 Parent Portal</h1>
    <p className="mt-2 text-grey-slate">Viewing permitted academic records for your linked student(s).</p>
  </div>
);

const AdminDashboard = () => (
  <div className="p-8 font-sans bg-babyBlue-light min-h-screen text-grey-charcoal">
    <h1 className="text-2xl font-bold">⚙️ Admin & Registrar Portal</h1>
    <p className="mt-2 text-grey-slate">Edit enrollment, publish term grades, and manage locked records.</p>
  </div>
);

// Main App Router
function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route redirects straight to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* The Stylish Login Dialog Box */}
        <Route path="/login" element={<Login />} />
        
        {/* Role-Specific Workspaces */}
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
        <Route path="/dashboard/parent" element={<ParentDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;