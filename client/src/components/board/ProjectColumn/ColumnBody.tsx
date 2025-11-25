import React, { useState } from "react";
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
    <div className="flex-1 flex flex-col p-2 overflow-y-auto bg-gray-100">
      <div className="space-y-2 mb-2 flex-1">
        {(!project.tasks || project.tasks.length === 0) && (
          <p className="text-gray-400 text-xs text-center py-4">
            Add some tasks!
          </p>
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

    
      <div className="flex gap-1 pt-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          placeholder="Add task..."
          className="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
        />
        <button
          onClick={handleAddTask}
          className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs font-medium"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ColumnBody;