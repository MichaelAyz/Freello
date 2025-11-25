import { useEffect, useState } from "react";
import { useProjects } from "../../context/ProjectContext";
import type { Project } from "../../types/Project";
import { X } from "lucide-react";
import ConfirmDialog from "../Common/ConfirmDialog";

export default function ProjectDetailsModal() {
  const { selectedProject, closeDetails, editProject, removeProject } = useProjects();

  const [form, setForm] = useState<Partial<Project> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Load project into local form
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

    // Validation
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Project Details</h3>
            <button
              onClick={closeDetails}
              className="p-1 hover:bg-gray-100 rounded transition"
              disabled={loading}
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm mb-4">
              {error}
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Title *
              </label>
              <input
                type="text"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            {/* Client Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Name *
              </label>
              <input
                type="text"
                value={form.clientName || ""}
                onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget
              </label>
              <input
                type="number"
                value={form.budget ?? ""}
                onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline
              </label>
              <input
                type="date"
                value={form.deadline?.slice(0, 10) || ""}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={form.notes || ""}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
              disabled={loading}
            >
              Delete Project
            </button>

            <div className="flex gap-3">
              <button
                onClick={closeDetails}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
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