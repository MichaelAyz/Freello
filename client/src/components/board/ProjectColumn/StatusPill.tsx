import React from "react";
import type { ProjectStatus } from "../../../types/Project";

interface StatusPillProps {
  currentStatus: ProjectStatus;
  onStatusChange: (status: ProjectStatus) => void;
}

const statusConfig: Record<ProjectStatus, { label: string; color: string }> = {
  Inquiry: { label: "Inquiry", color: "bg-gray-400" },
  Proposal: { label: "Proposal", color: "bg-blue-500" },
  InProgress: { label: "In Progress", color: "bg-teal-500" },
  Review: { label: "Review", color: "bg-orange-500" },
  Completed: { label: "Completed", color: "bg-green-500" },
};

const StatusPill: React.FC<StatusPillProps> = ({ currentStatus, onStatusChange }) => {
  return (
    <div className="flex gap-1 flex-wrap">
      {Object.entries(statusConfig).map(([key, config]) => (
        <button
          key={key}
          onClick={() => onStatusChange(key as ProjectStatus)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition ${
            currentStatus === key
              ? `${config.color} text-white`
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {config.label}
        </button>
      ))}
    </div>
  );
};

export default StatusPill;