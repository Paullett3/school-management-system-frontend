import React, { useState } from "react";

export default function TeacherDashboard() {
  // State variables for capturing student updates
  const [students, setStudents] = useState([
    { id: 1, name: "Alex Cooper", grade: "A-", attendance: "92%" },
    { id: 2, name: "Grace Wanjiku", grade: "B+", attendance: "88%" },
  ]);

  const [selectedStudent, setSelectedStudent] = useState(1);
  const [newGrade, setNewGrade] = useState("");
  const [newAttendance, setNewAttendance] = useState("");

  // Commit dynamic results to state
  const handleUpdateScores = (e) => {
    e.preventDefault();
    setStudents(
      students.map((student) => {
        if (student.id === parseInt(selectedStudent)) {
          return {
            ...student,
            grade: newGrade || student.grade,
            attendance: newAttendance
              ? `${newAttendance}%`
              : student.attendance,
          };
        }
        return student;
      }),
    );
    // Reset individual selection inputs
    setNewGrade("");
    setNewAttendance("");
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen text-slate-800">
      {/* Header Banner */}
      <header className="mb-8 p-6 bg-linear-to-r from-amber-500 to-orange-600 rounded-2xl shadow-lg text-white">
        <h1 className="text-3xl font-bold">Faculty Portal</h1>
        <p className="text-amber-100 mt-1">
          Log assignment marks, modify letter grades, and record classroom
          attendance records.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Score Logging Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-1">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Log Marks & Attendance
          </h3>
          <form onSubmit={handleUpdateScores} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Select Student
              </label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Letter Grade
              </label>
              <input
                type="text"
                placeholder="e.g. A, B+, C"
                value={newGrade}
                onChange={(e) => setNewGrade(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Attendance Rate (%)
              </label>
              <input
                type="number"
                placeholder="e.g. 95"
                value={newAttendance}
                onChange={(e) => setNewAttendance(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl shadow-md shadow-orange-100 transition-colors"
            >
              Save Academic Updates
            </button>
          </form>
        </div>

        {/* Right Side: Roster Tracker Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Class Performance Sheet
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Current Grade</th>
                  <th className="py-3 px-4">Attendance Frequency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      {student.name}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 font-bold rounded-lg bg-amber-50 text-amber-700 border border-amber-100">
                        {student.grade}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-600">
                      {student.attendance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
