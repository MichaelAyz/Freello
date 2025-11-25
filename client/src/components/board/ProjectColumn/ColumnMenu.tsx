import React from "react";

export interface ColumnMenuProps {
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
}

const ColumnMenu: React.FC<ColumnMenuProps> = ({ onClose, onEdit, onDelete, onViewDetails }) => {
  return (
    
    <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
      <button
        onClick={onViewDetails} 
        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
      >
        View Details
      </button>
      
      <button
        onClick={onEdit}
        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
      >
        Clear Tasks
      </button>

      <button
        onClick={onDelete}
        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
      >
        Delete Project
      </button>

      <button
        onClick={onClose}
        className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition border-t border-gray-200 mt-1"
      >
        Cancel
      </button>
    </div>
  );
};

export default ColumnMenu;