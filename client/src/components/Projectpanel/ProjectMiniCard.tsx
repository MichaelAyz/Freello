import React from "react";
import type { Project } from "../../types/Project";

interface ProjectMiniCardProps {
  project: Project;
  onClick: () => void;
  isDragging?: boolean;
}

const ProjectMiniCard: React.FC<ProjectMiniCardProps> = ({ 
  project, 
  onClick, 
  isDragging = true 
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-50 hover:bg-gray-100 p-3 rounded-lg cursor-pointer border border-gray-200 transition ${
        isDragging ? "opacity-50 shadow-lg" : ""
      }`}
    >
      <p className="text-sm font-medium text-gray-700 truncate">
        {project.title}
      </p>
    
    </div>
  );
};

export default ProjectMiniCard;