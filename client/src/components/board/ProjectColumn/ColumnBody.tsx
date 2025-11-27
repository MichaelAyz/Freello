import React, { useState } from "react";
import { Plus } from "lucide-react";
import type { Project } from "../../../types/Project";
import TaskItem from "../Task/TaskItem";

interface ColumnBodyProps {
  project: Project;
  onAddTask: (projectId: string, text: string) => void;
  onToggleTask: (projectId: string, taskId: string) => void;
  onEditTask: (projectId: string, taskId: string, text: string) => void;
  onDeleteTask: (projectId: string, taskId: string) => void;
}

const ColumnBody: React.FC<ColumnBodyProps> = ({
  project,
  onAddTask,
  onToggleTask,
  onEditTask,
  onDeleteTask,
}) => {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask(project._id, newTask.trim());
      setNewTask("");
    }
  };

  return (
    <div className="flex-1 flex flex-col p-3 overflow-y-auto custom-scrollbar">
      
      <div className="space-y-2 mb-2 flex-1 min-h-[50px]">
        {(!project.tasks || project.tasks.length === 0) && (
          <div className="flex flex-col items-center justify-center py-6 opacity-50">
             <div className="w-8 h-8 rounded-full bg-stone-200/50 mb-2"></div>
             <p className="text-stone-400 text-xs text-center font-medium">
               No tasks yet
             </p>
          </div>
        )}

        {project.tasks?.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggle={(taskId) => onToggleTask(project._id, taskId)}
            onEdit={(taskId, text) => onEditTask(project._id, taskId, text)}
            onDelete={(taskId) => onDeleteTask(project._id, taskId)}
          />
        ))}
      </div>

      <div className="flex gap-2 pt-2 mt-auto">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-stone-400"
        />
        <button
          onClick={handleAddTask}
          disabled={!newTask.trim()}
          className="px-3 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors shadow-sm shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <Plus size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default ColumnBody;