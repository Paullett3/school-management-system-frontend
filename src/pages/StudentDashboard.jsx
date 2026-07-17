import React from 'react';

// ==========================================
// STUDENT DASHBOARD COMPONENT (READ ONLY)
// ==========================================
export default function StudentDashboard() {
  // Static dataset containing sample student grades
  const subjectReports = [
    { id: 1, subject: 'Mathematics', score: 'A', status: 'Passed' },
    { id: 2, subject: 'English Language', score: 'A-', status: 'Passed' },
    { id: 3, subject: 'Creative Activities', score: 'B+', status: 'Passed' }
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen text-slate-800">
      {/* Header Banner */}
      <header className="mb-8 p-6 bg-linear-to-r from-pink-500 to-rose-500 rounded-2xl shadow-lg text-white">
        <h1 className="text-3xl font-bold">Student Workspace</h1>
        <p className="text-pink-100 mt-1">Monitor real-time course grades and tracking analytics for active academic modules.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side Highlight Cards */}
        <div className="space-y-4 lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
            <span className="text-4xl">🏆</span>
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mt-2">Overall Term Standing</h4>
            <p className="text-4xl font-black text-rose-600 mt-1">A- Grade</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
            <span className="text-4xl">⏱️</span>
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mt-2">Compounded Attendance</h4>
            <p className="text-4xl font-black text-slate-900 mt-1">92.4%</p>
          </div>
        </div>

        {/* Main Section Read Only Score Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Official Academic Report Card</h3>
          <div className="space-y-3">
            {subjectReports.map(report => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-rose-100 transition-all">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm md:text-base">{report.subject}</h4>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Status: {report.status}</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-xl">
                    {report.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}