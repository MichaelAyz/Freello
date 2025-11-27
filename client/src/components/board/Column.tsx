import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import type { Project } from "../../types/Project";
import ColumnHeader from "./ProjectColumn/ColumnHeader";
import ColumnBody from "./ProjectColumn/ColumnBody";
import ConfirmDialog from "../Common/ConfirmDialog";
import { useProjects } from "../../context/ProjectContext";

interface ColumnProps {
  project: Project;
  index: number;
}

// CALM COLOR PALETTE (Matches Warm Light Theme)
// Assigns specific styles based on the column index
const getColumnColors = (index: number) => {
  const colors = [
    { border: "border-t-teal-400", shadow: "shadow-teal-500/10", dot: "bg-teal-400" },
    { border: "border-t-orange-300", shadow: "shadow-orange-500/10", dot: "bg-orange-300" },
    { border: "border-t-blue-300", shadow: "shadow-blue-500/10", dot: "bg-blue-300" },
    { border: "border-t-rose-300", shadow: "shadow-rose-500/10", dot: "bg-rose-300" },
    { border: "border-t-emerald-400", shadow: "shadow-emerald-500/10", dot: "bg-emerald-400" },
  ];
  return colors[index % colors.length];
};

const Column: React.FC<ColumnProps> = ({ project, index }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { 
    editProject, 
    removeProject, 
    addTask, 
    toggleTask, 
    editTask, 
    removeTask,
    openDetails 
  } = useProjects();

  // Calculate theme based on index
  const theme = getColumnColors(index);

  const handleDeleteClick = () => {
    setMenuOpen(false);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await removeProject(project._id);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Failed to delete project:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Draggable draggableId={`board-${project._id}`} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            // Styling: Warm background, dynamic top border, soft shadows
            className={`
              w-64 shrink-0 flex flex-col rounded-xl transition-all duration-200
              bg-[#F9F8F6] border border-stone-200/80
              ${theme.border} border-t-4
              ${snapshot.isDragging 
                ? `shadow-2xl rotate-2 scale-[1.02] z-50 ${theme.shadow} ring-1 ring-stone-900/5` 
                : "shadow-sm hover:shadow-md"
              }
            `}
            style={{ 
              ...provided.draggableProps.style,
              maxHeight: 'calc(100vh - 140px)'
            }}
          >
            {/* Header Component (Receives the matching color dot) */}
            <ColumnHeader
              project={project}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              onStatusChange={(id, status) => editProject(id, { status })}
              onEditProject={(id, title, deadline) => editProject(id, { title, deadline })}
              onDeleteProject={handleDeleteClick}
              onViewDetails={() => openDetails(project)}
              colorDot={theme.dot} 
            />

            {/* Body (Tasks) Component */}
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

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <ConfirmDialog
          title="Delete Project"
          message={`Are you sure you want to delete "${project.title}"? This action cannot be undone.`}
          confirmText="Delete Project"
          cancelText="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          loading={isDeleting}
        />
      )}
    </>
  );
};

export default Column;