import React, { useEffect, useRef } from "react";
import type { Project } from "../../../types/Project";
import StatusPill from "./StatusPill";
import ColumnMenu from "./ColumnMenu";
import { MoreVertical, Calendar } from "lucide-react";

export interface ColumnHeaderProps {
  project: Project;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  onStatusChange: (id: string, status: Project["status"]) => void;
  onEditProject: (id: string, title: string, deadline: string) => void;
  onDeleteProject: (id: string) => void;
  onViewDetails: () => void;
  colorDot?: string; // Received from parent Column
}

const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  project,
  menuOpen,
  setMenuOpen,
  onStatusChange,
  onEditProject,
  onDeleteProject,
  onViewDetails,
  colorDot = "bg-stone-400" // Default fallback
}) => {
  const menuContainerRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, setMenuOpen]);

  return (
    // Styling: Clean, transparent background to blend with Column
    <div className="p-4 pb-2 relative group">
      
      {/* Header row with title and menu */}
      <div className="flex justify-between items-start gap-2 mb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Dynamic Color Indicator */}
            <div className={`w-2 h-2 rounded-full shrink-0 ${colorDot}`}></div>
            
            <h3 className="font-bold text-slate-700 text-sm leading-tight truncate cursor-text">
            {project.title}
            </h3>
        </div>

        {/* 3-dot menu button */}
        <div ref={menuContainerRef} className="relative shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`
                p-1 rounded transition-colors duration-200
                ${menuOpen ? 'bg-stone-200 text-slate-800' : 'text-slate-400 hover:text-slate-600 hover:bg-stone-200/50'}
            `}
          >
            <MoreVertical size={16} />
          </button>

          {/* Column Menu */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 z-50">
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
            </div>
          )}
        </div>
      </div>

      {/* Meta Row: Deadline & Status */}
      <div className="flex items-center justify-between gap-2">
        {project.deadline ? (
            <div className="flex items-center gap-1 text-[11px] font-medium text-stone-500 bg-stone-200/50 px-2 py-0.5 rounded-full">
                <Calendar size={10} />
                <span>{new Date(project.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
            </div>
        ) : (
            <div></div> // Spacer
        )}

        {/* Status pill */}
        <StatusPill
            currentStatus={project.status}
            onStatusChange={(status) => onStatusChange(project._id, status)}
        />
      </div>
      
      {/* Subtle Divider */}
      <div className="h-px bg-stone-200/60 mt-3 w-full"></div>
    </div>
  );
};

export default ColumnHeader;