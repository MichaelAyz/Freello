import React, { useState } from "react";
import type { Project } from "../../types/Project";
import ColumnHeader from "./ProjectColumn/ColumnHeader";
import ColumnBody from "./ProjectColumn/ColumnBody";
import { useProjects } from "../../context/ProjectContext";
import { Draggable } from "@hello-pangea/dnd";

interface ColumnProps {
  project: Project;
  index: number;
}

const Column: React.FC<ColumnProps> = ({ project, index }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { 
    editProject, 
    removeProject, 
    addTask, 
    toggleTask, 
    editTask, 
    removeTask,
    openDetails 
  } = useProjects();

  return (
    <Draggable draggableId={`board-${project._id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-gray-100 rounded-lg w-64 flex-shrink-0 flex flex-col transition-shadow ${
            snapshot.isDragging ? "shadow-xl" : "shadow-sm"
          }`}
          style={{ 
            ...provided.draggableProps.style,
            maxHeight: 'calc(100vh - 180px)'
          }}
        >
          <ColumnHeader
            project={project}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            onStatusChange={(id, status) => editProject(id, { status })}
            onEditProject={(id, title, deadline) => editProject(id, { title, deadline })}
            onDeleteProject={removeProject}
            onViewDetails={() => openDetails(project)}
          />

          <ColumnBody
            project={project}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onEditTask={editTask}
            onDeleteTask={removeTask}
          />
        </div>
      )}
    </Draggable>
  );
};

export default Column;