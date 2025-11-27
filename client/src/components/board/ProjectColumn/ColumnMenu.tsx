import React from "react";
import { Eye, Trash2, X } from "lucide-react";

export interface ColumnMenuProps {
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
}

const ColumnMenu: React.FC<ColumnMenuProps> = ({ 
  onClose, 
  // onEdit,
  onDelete, 
  onViewDetails 
}) => {
  return (
    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-100 ring-1 ring-black/5 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
      
      <div className="py-1">
        <button
          onClick={onViewDetails}
          className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-stone-50 hover:text-teal-600 flex items-center gap-2 transition-colors"
        >
          <Eye size={14} />
          View Details
        </button>

        <button
          onClick={onDelete}
          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
        >
          <Trash2 size={14} />
          Delete Project
        </button>
      </div>

      <div className="border-t border-stone-100 bg-stone-50/50">
        <button
          onClick={onClose}
          className="w-full text-left px-4 py-2.5 text-sm text-stone-500 hover:text-stone-700 hover:bg-stone-100 flex items-center gap-2 transition-colors"
        >
          <X size={14} />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ColumnMenu;