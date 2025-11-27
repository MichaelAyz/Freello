import { useEffect, useState } from "react";
import { useProjects } from "../../context/ProjectContext";
import type { Project } from "../../types/Project";
import { X, Trash2, Save } from "lucide-react";
import ConfirmDialog from "../Common/ConfirmDialog";

export default function ProjectDetailsModal() {
  const { selectedProject, closeDetails, editProject, removeProject } = useProjects();

  const [form, setForm] = useState<Partial<Project> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      setForm({ ...selectedProject });
      setError("");
    } else {
      setForm(null);
    }
  }, [selectedProject]);

  if (!selectedProject || !form) return null;

  const handleSave = async () => {
    setError("");

    if (!form.title?.trim()) {
      setError("Project title is required");
      return;
    }
    if (!form.clientName?.trim()) {
      setError("Client name is required");
      return;
    }

    try {
      setLoading(true);

      await editProject(selectedProject._id, {
        title: form.title.trim(),
        clientName: form.clientName.trim(),
        budget: Number(form.budget) || 0,
        deadline: form.deadline || "",
        notes: form.notes || "",
        status: form.status,
      });

      closeDetails();
    } catch (err) {
      setError("Failed to update project. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await removeProject(selectedProject._id);
      setShowDeleteConfirm(false);
      closeDetails();
    } catch (err) {
      setError("Failed to delete project. Please try again.");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm animate-fadeIn">
        
        <div className="bg-[#F9F8F6] rounded-xl p-8 w-full max-w-lg shadow-2xl border border-white/50 max-h-[90vh] overflow-y-auto custom-scrollbar animate-fadeIn">
          
          <div className="flex justify-between items-center mb-6 border-b border-stone-200/60 pb-4">
            <div>
               <h3 className="text-xl font-bold text-slate-800">Project Details</h3>
               <p className="text-stone-500 text-xs uppercase tracking-wide mt-1">ID: {selectedProject._id.slice(-6)}</p>
            </div>
            <button
              onClick={closeDetails}
              className="p-2 hover:bg-stone-200/50 rounded-full transition-colors text-stone-400 hover:text-stone-600"
              disabled={loading}
            >
              <X size={20} />
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded text-sm mb-6">
              {error}
            </div>
          )}

          <div className="space-y-5">
            
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-1.5">
                Project Title <span className="text-teal-500">*</span>
              </label>
              <input
                type="text"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg text-slate-800 font-medium placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-1.5">
                Client Name <span className="text-teal-500">*</span>
              </label>
              <input
                type="text"
                value={form.clientName || ""}
                onChange={(e) => setForm({ ...form, clientName: e.target.value })}
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
                      value={form.budget ?? ""}
                      onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
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
                   value={form.deadline ? new Date(form.deadline).toISOString().split('T')[0] : ""}
                   onChange={(e) => setForm({ ...form, deadline: e.target.value })}
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
                value={form.notes || ""}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg text-slate-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all resize-none"
                disabled={loading}
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200/50 flex justify-between items-center">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm group"
              disabled={loading}
            >
              <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
              Delete Project
            </button>

            <div className="flex gap-3">
              <button
                onClick={closeDetails}
                className="px-5 py-2.5 border border-stone-200 text-stone-600 rounded-lg hover:bg-stone-100 hover:text-stone-800 transition-colors font-semibold text-sm"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-all shadow-lg shadow-teal-600/20 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                   <>
                     <Save size={16} />
                     Save Changes
                   </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <ConfirmDialog
          title="Delete Project"
          message={`Are you sure you want to delete "${selectedProject.title}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          loading={loading}
        />
      )}
    </>
  );
}