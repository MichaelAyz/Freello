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
  isDragging 
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        group relative p-4 rounded-lg border cursor-grab active:cursor-grabbing transition-all duration-200 select-none
        flex items-center justify-between
        ${isDragging 
          ? "bg-zinc-700 border-teal-500 shadow-xl shadow-teal-500/20 scale-105 rotate-2 z-50 opacity-100" 
          : "bg-zinc-700/40 border-zinc-600/50 hover:bg-zinc-700 hover:border-zinc-500 hover:shadow-md"
        }
      `}
    >
      {/* Content - Minimalist, Just Text */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate transition-colors ${isDragging ? 'text-teal-300' : 'text-zinc-300 group-hover:text-white'}`}>
          {project.title}
        </p>
      </div>

      {/* Subtle Active Indicator (Only visible when dragging) */}
      {isDragging && (
        <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.6)]" />
      )}
    </div>
  );
};

export default ProjectMiniCard;