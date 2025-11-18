import { useEffect, useState } from "react";
import { useProjects } from "../../context/ProjectContext";
import type { Project } from "../../types/Project";

export default function ProjectDetailsModal() {
  const { selectedProject, closeDetails, editProject, removeProject } = useProjects();
  const [form, setForm] = useState<Partial<Project> | null>(null);

  useEffect(() => {
    if (selectedProject) setForm(selectedProject);
    else setForm(null);
  }, [selectedProject]);

  if (!selectedProject || !form) return null;

  const handleSave = async () => {
    await editProject(selectedProject._id, {
      title: form.title,
      clientName: form.clientName,
      budget: form.budget,
      deadline: form.deadline,
      notes: form.notes,
      status: form.status,
    });
    closeDetails();
  };

  const handleDelete = async () => {
    await removeProject(selectedProject._id);
    closeDetails();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-[420px] shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Project Details</h3>
          <button onClick={closeDetails} className="text-gray-500">✕</button>
        </div>

        <div className="space-y-3">
          <input value={form.title} onChange={e=>setForm({...form!, title: e.target.value})} className="w-full border p-2 rounded" />
          <input value={form.clientName} onChange={e=>setForm({...form!, clientName: e.target.value})} className="w-full border p-2 rounded" />
          <input value={String(form.budget || "")} onChange={e=>setForm({...form!, budget: Number(e.target.value)})} className="w-full border p-2 rounded" />
          <input type="date" value={form.deadline?.slice(0,10) || ""} onChange={e=>setForm({...form!, deadline: e.target.value})} className="w-full border p-2 rounded" />
          <textarea value={form.notes} onChange={e=>setForm({...form!, notes: e.target.value})} className="w-full border p-2 rounded" />
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button onClick={handleDelete} className="text-red-600">Delete Project</button>
          <div className="flex gap-2">
            <button onClick={closeDetails} className="px-3 py-1 rounded border">Cancel</button>
            <button onClick={handleSave} className="px-3 py-1 rounded bg-blue-600 text-white">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
