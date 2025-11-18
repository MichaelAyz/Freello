import { Draggable } from "@hello-pangea/dnd";
import type { Project } from "../../types/Project";
import { useProjects } from "../../context/ProjectContext";

export default function BoardCard({ project, index }: { project: Project; index: number; }) {
  const { openDetails } = useProjects();

  return (
    <Draggable draggableId={project._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => openDetails(project)}
          className="bg-white p-3 mb-3 rounded-lg shadow hover:shadow-md cursor-pointer transition"
        >
          <div className="text-xs text-gray-500 mb-1">{project.status}</div>
          <div className="font-semibold">{project.title}</div>
          <div className="text-sm text-gray-600 mt-1">
            {project.clientName} • ${project.budget}
          </div>

          {/* Status selector inline (simple) */}
          <div className="mt-3 flex gap-2 text-xs">
            {["Inquiry","Proposal","In Progress","Review","Completed"].map((s) => (
              <span key={s} className={`px-2 py-0.5 rounded text-white text-[11px] ${project.status === s ? "bg-blue-600" : "bg-gray-300 text-gray-700"}`}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </Draggable>
  );
}
