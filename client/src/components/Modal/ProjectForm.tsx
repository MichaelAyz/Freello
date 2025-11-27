import React, { useState } from "react";
import { useProjects } from "../../context/ProjectContext";
import { X } from "lucide-react";

export default function ProjectForm() {
  const { isFormOpen, closeForm, addProject } = useProjects();

  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isFormOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Project title is required");
      return;
    }
    if (!clientName.trim()) {
      setError("Client name is required");
      return;
    }

    try {
      setLoading(true);

      await addProject({
        title: title.trim(),
        clientName: clientName.trim(),
        budget: Number(budget) || 0,
        deadline: deadline || "",
        notes: notes.trim(),
        status: "Inquiry", 
      });

      setTitle("");
      setClientName("");
      setBudget("");
      setDeadline("");
      setNotes("");
    } catch (err) {
      setError("Failed to create project. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#F9F8F6] rounded-xl p-8 w-full max-w-md shadow-2xl border border-white/50 animate-fadeIn">
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Create New Project</h3>
            <p className="text-stone-500 text-sm mt-1">Add details to start tracking.</p>
          </div>
          <button
            type="button"
            onClick={closeForm}
            className="p-2 hover:bg-stone-200/50 rounded-full transition-colors text-stone-400 hover:text-stone-600"
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded text-sm mb-4">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-1.5">
              Project Title <span className="text-teal-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g Website Redesign"
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg text-slate-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-1.5">
              Client Name <span className="text-teal-500">*</span>
            </label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Client or Company Name"
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg text-slate-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-1.5">
                Budget
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-stone-400">$</span>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-7 pr-4 py-2.5 bg-white border border-stone-200 rounded-lg text-slate-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-1.5">
                Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-1.5">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional details..."
              rows={3}
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg text-slate-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all resize-none"
              disabled={loading}
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-stone-200/50 mt-2">
            <button
              type="button"
              onClick={closeForm}
              className="flex-1 px-4 py-2.5 border border-stone-200 text-stone-600 rounded-lg hover:bg-stone-100 hover:text-stone-800 transition-colors font-semibold text-sm"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-all shadow-lg shadow-teal-600/20 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Create Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}