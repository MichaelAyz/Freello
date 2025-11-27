import React, { useState, useEffect } from "react";
import type { Task } from "../../../types/Project";
import { Trash2, Check } from "lucide-react";

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
  
  const [isChecked, setIsChecked] = useState(task.done);

  useEffect(() => {
    setIsChecked(task.done);
  }, [task.done]);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    
    // 2. Trigger API call
    onToggle(task._id!);
  };

  const handleEditSubmit = () => {
    if (draft.trim() && draft !== task.text) {
      onEdit(task._id!, draft.trim());
    }
    setEditing(false);
  };

  return (
    <div className={`
      group relative flex items-start gap-3 p-3 mb-2 rounded-lg border transition-all duration-200
      ${isChecked 
        ? "bg-stone-50 border-stone-100 opacity-75" 
        : "bg-white border-stone-200 shadow-sm hover:shadow-md hover:border-teal-200"
      }
    `}>
      
      <div 
        className="mt-0.5 shrink-0 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
      >
        <div className={`
          w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200
          ${isChecked 
            ? "bg-teal-500 border-teal-500" 
            : "bg-white border-stone-300 hover:border-teal-400"
          }
        `}>
          {isChecked && <Check size={12} className="text-white" strokeWidth={4} />}
        </div>
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
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
            className="w-full text-sm px-2 py-1 -ml-2 border border-teal-500 rounded bg-white focus:outline-none text-slate-700 shadow-sm"
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={() => setEditing(true)}
            className={`block text-sm leading-snug word-break-word transition-colors cursor-text ${
              isChecked 
                ? "line-through text-stone-400" 
                : "text-slate-700 font-medium group-hover:text-slate-900"
            }`}
          >
            {task.text}
          </span>
        )}
      </div>

      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 gap-1">
         <button
            onClick={(e) => {
                e.stopPropagation();
                onDelete(task._id!);
            }}
            className="p-1.5 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
            title="Delete task"
         >
            <Trash2 size={14} />
         </button>
      </div>
    </div>
  );
};

export default TaskItem;