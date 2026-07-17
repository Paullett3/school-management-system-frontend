import React, { useState } from "react";

// ==========================================
// PARENT DASHBOARD COMPONENT
// ==========================================
export default function ParentDashboard() {
  const [comments, setComments] = useState([
    { id: 1, text: "Excellent improvement this term!", date: "Jul 10, 2026" },
  ]);
  const [inputComment, setInputComment] = useState("");

  // Handle addition of feedback text elements
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!inputComment.trim()) return;

    const newCommentObj = {
      id: comments.length + 1,
      text: inputComment,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setComments([newCommentObj, ...comments]);
    setInputComment("");
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen text-slate-800">
      {/* Header Banner */}
      <header className="mb-8 p-6 bg-linear-to-r from-teal-500 to-cyan-600 rounded-2xl shadow-lg text-white">
        <h1 className="text-3xl font-bold">Parent/Guardian Overview</h1>
        <p className="text-teal-100 mt-1">
          Review student performance, crosscheck attendance percentages, and
          post verified feedback.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Child Progress Metric Summary Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Assigned Grade Average
                </p>
                <h3 className="text-3xl font-black text-slate-900 mt-1">A-</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-lg">
                📊
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Verified Class Attendance
                </p>
                <h3 className="text-3xl font-black text-slate-900 mt-1">
                  94.2%
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-lg">
                📆
              </div>
            </div>
          </div>

          {/* Comment Log Display View */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Teacher & Guardian Correspondence Log
            </h3>
            <div className="space-y-3">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <p className="text-sm text-slate-700 font-medium">
                    "{c.text}"
                  </p>
                  <span className="text-xs text-slate-400 block mt-2 font-semibold">
                    {c.date} — Verified Parent Account
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form to submit parent remarks */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Leave Teacher Feedback
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Submit operational remarks directly accessible to homeroom staff
              panels.
            </p>
            <form onSubmit={handleAddComment} className="space-y-4">
              <textarea
                rows="4"
                value={inputComment}
                onChange={(e) => setInputComment(e.target.value)}
                placeholder="Type your feedback details here..."
                className="w-full px-4 py-3 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-xl shadow-md shadow-teal-100 transition-colors text-sm"
              >
                Broadcast Remark
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
