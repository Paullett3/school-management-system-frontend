// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

// Import your actual dashboard components
import TeacherDashboard from "./pages/TeacherDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      {/* Default Route → Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Protected Dashboards with Navbar */}
      <Route
        path="/dashboard/teacher"
        element={
          <>
            <Navbar />
            <TeacherDashboard />
          </>
        }
      />

      <Route
        path="/dashboard/parent"
        element={
          <>
            <Navbar />
            <ParentDashboard />
          </>
        }
      />

      <Route
        path="/dashboard/student"
        element={
          <>
            <Navbar />
            <StudentDashboard />
          </>
        }
      />

      <Route
        path="/dashboard/admin"
        element={
          <>
            <Navbar />
            <AdminDashboard />
          </>
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
