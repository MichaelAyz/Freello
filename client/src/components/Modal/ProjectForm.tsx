import React, { useState } from "react";
import { useProjects } from "../../context/ProjectContext";

export default function ProjectForm() {
  const { isFormOpen, closeForm, addProject } = useProjects();

  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [budget, setBudget] = useState<number | "">("");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");

  if (!isFormOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProject({
      title,
      clientName,
      budget: Number(budget || 0),
      deadline,
      notes,
      status: "Inquiry",
    });
    // reset
    setTitle(""); setClientName(""); setBudget(""); setDeadline(""); setNotes("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Create Project</h3>
          <button type="button" onClick={closeForm} className="text-gray-500">✕</button>
        </div>

        <div className="space-y-3">
          <input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Project title" className="w-full border p-2 rounded" />
          <input required value={clientName} onChange={e=>setClientName(e.target.value)} placeholder="Client name" className="w-full border p-2 rounded" />
          <input value={budget as any} onChange={e=>setBudget(Number(e.target.value))} placeholder="Budget" className="w-full border p-2 rounded" />
          <input type="date" value={deadline} onChange={e=>setDeadline(e.target.value)} className="w-full border p-2 rounded" />
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notes" className="w-full border p-2 rounded" />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={closeForm} className="px-3 py-1 rounded border">Cancel</button>
          <button type="submit" className="px-3 py-1 rounded bg-blue-600 text-white">Create</button>
        </div>
      </form>
    </div>
  );
}
