import React, { useState } from "react";

// ==========================================
// ADMIN DASHBOARD COMPONENT
// ==========================================
export default function AdminDashboard() {
  // Mock Data State
  const [users, setUsers] = useState([
    { id: 1, name: "Alex Copper", role: "Student", status: "Enrolled" },
    { id: 2, name: "Jane Smith", role: "Teacher", status: "Active" },
  ]);
  const [isGradingLocked, setIsGradingLocked] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", role: "Student" });

  // Handle Enrollment Form
  const handleEnroll = (e) => {
    e.preventDefault();
    if (!newUser.name) return;

    const createdUser = {
      id: users.length + 1,
      name: newUser.name,
      role: newUser.role,
      status: newUser.role === "Student" ? "Enrolled" : "Active",
    };

    setUsers([...users, createdUser]);
    setNewUser({ name: "", role: "Student" }); // Reset form
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen text-slate-800">
      {/* Header Banner */}
      <header className="mb-8 p-6 bg-linear-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-lg text-white">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-purple-100 mt-1">
          Manage global enrollment, monitor system permissions, and lock
          operational access.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section 1: System Control Guard */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              System Locks
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Temporarily prevent teachers from altering or publishing term
              grades.
            </p>
          </div>
          <button
            onClick={() => setIsGradingLocked(!isGradingLocked)}
            className={`w-full py-4 rounded-xl font-semibold text-white tracking-wide shadow-md transition-all duration-300 ${
              isGradingLocked
                ? "bg-rose-500 hover:bg-rose-600 shadow-rose-200"
                : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200"
            }`}
          >
            {isGradingLocked
              ? "🔓 Unlock Grading System"
              : "🔒 Lock Grading System"}
          </button>
        </div>

        {/* Section 2: Registration / Enrollment Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Enroll New User
          </h2>
          <form onSubmit={handleEnroll} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                placeholder="e.g. Alex Cooper"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Account Role
              </label>
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 text-sm"
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Parent">Parent</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl shadow-md shadow-indigo-100 transition-colors"
            >
              Confirm & Enroll
            </button>
          </form>
        </div>

        {/* Section 3: Registered Roster View */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-1">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Recent Roster
          </h2>
          <div className="space-y-3 overflow-y-auto max-h-220px pr-1">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100"
              >
                <div>
                  <h4 className="font-medium text-sm text-slate-900">
                    {user.name}
                  </h4>
                  <span className="text-xs text-indigo-600 font-semibold">
                    {user.role}
                  </span>
                </div>
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
