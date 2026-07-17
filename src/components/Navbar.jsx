// src/components/Navbar.jsx
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Mock current user (in real app, get from localStorage or context)
  const currentUser = {
    name: "Alex Rivera",
    role: location.pathname.split("/").pop() || "student",
    email: "alex.rivera@omnischool.edu",
    avatar: "👨‍🎓",
  };

  const navItems = [
    { path: "/dashboard/teacher", label: "👩‍🏫 Teacher" },
    { path: "/dashboard/parent", label: "👨‍👩‍👧 Parent" },
    { path: "/dashboard/student", label: "📚 Student" },
    { path: "/dashboard/admin", label: "⚙️ Admin" },
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("omni_token");
      localStorage.removeItem("omni_user");
      navigate("/login");
    }
  };

  return (
    <nav className="bg-white border-b border-silver shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-babyBlue-dark rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-inner">
            S
          </div>
          <div>
            <div className="font-bold text-3xl tracking-tight text-grey-charcoal">
              SchoolHub
            </div>
            <p className="text-xs text-silver-dark -mt-1">Management System</p>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center gap-2 bg-white border border-silver rounded-3xl p-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-babyBlue-dark text-white shadow-md"
                    : "hover:bg-silver text-grey-charcoal"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* User Profile & Logout */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 pl-4 pr-2 py-2 rounded-2xl hover:bg-silver transition-colors"
          >
            <div className="text-right">
              <p className="text-sm font-semibold text-grey-charcoal">
                {currentUser.name}
              </p>
              <p className="text-xs text-silver-dark capitalize">
                {currentUser.role}
              </p>
            </div>
            <div className="w-9 h-9 bg-linear-to-br from-babyBlue to-blue-600 rounded-full flex items-center justify-center text-xl border-2 border-white shadow">
              {currentUser.avatar}
            </div>
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-silver py-2 z-50">
              <div className="px-4 py-3 border-b border-silver">
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-sm text-silver-dark">{currentUser.email}</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
