import React, { useState } from "react";
import type { Task } from "../../../types/Project";
import { Trash2 } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;   
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, text: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);

  const handleEditSubmit = () => {
    if (draft.trim() && draft !== task.text) {
      onEdit(task._id!, draft.trim());
    }
    setEditing(false);
  };

  return (
    <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded group">
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task._id!)}
        className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
      />

      {editing ? (
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleEditSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleEditSubmit();
            if (e.key === "Escape") setEditing(false);
          }}
          className="flex-1 text-sm px-2 py-1 border border-blue-500 rounded focus:outline-none"
          autoFocus
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          className={`flex-1 text-sm cursor-text ${
            task.done ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {task.text}
        </span>
      )}

      <button
        onClick={() => onDelete(task._id!)}
        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition"
      >
        <Trash2 size={14} className="text-red-600" />
      </button>
    </div>
  );
};

export default TaskItem;