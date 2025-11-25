import React from "react";
import type { Project } from "../../../types/Project";
import StatusPill from "./StatusPill";
import ColumnMenu from "./ColumnMenu";
import { MoreVertical } from "lucide-react";

export interface ColumnHeaderProps {
  project: Project;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  onStatusChange: (id: string, status: Project["status"]) => void;
  onEditProject: (id: string, title: string, deadline: string) => void;
  onDeleteProject: (id: string) => void;
  onViewDetails: () => void;
}

const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  project,
  menuOpen,
  setMenuOpen,
  onStatusChange,
  onEditProject,
  onDeleteProject,
  onViewDetails, 
}) => {
  return (
    <div className="p-3 bg-white rounded-t-lg border-b border-gray-200">
      {/* Header row with title and menu */}
      <div className="flex justify-between items-start gap-2 mb-2">
        <h3 className="font-semibold text-gray-800 text-sm leading-tight flex-1">
          {project.title}
        </h3>

        {/* 3-dot menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1 hover:bg-gray-100 rounded transition flex-shrink-0"
        >
          <MoreVertical size={16} className="text-gray-600" />
        </button>
      </div>

      {/* Deadline */}
      {project.deadline && (
        <p className="text-xs text-gray-500 mb-2">
          {new Date(project.deadline).toLocaleDateString()}
        </p>
      )}

      {/* Status pill */}
      <StatusPill
        currentStatus={project.status}
        onStatusChange={(status) => onStatusChange(project._id, status)}
      />

      {/* Column Menu (absolute positioned) */}
      {menuOpen && (
        <ColumnMenu
          onClose={() => setMenuOpen(false)}
          onEdit={() => {
            onEditProject(project._id, project.title, project.deadline || "");
            setMenuOpen(false);
          }}
          onDelete={() => {
            onDeleteProject(project._id);
            setMenuOpen(false);
          }}
          onViewDetails={() => {  
            onViewDetails();
            setMenuOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ColumnHeader;