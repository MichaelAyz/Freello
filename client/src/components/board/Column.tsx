import { Droppable } from "@hello-pangea/dnd";
import type { Project } from "../../types/Project";
import BoardCard from "./BoardCard";

export default function Column({
  status,
  projects,
}: {
  status: string;
  projects: Project[];
}) {
  return (
    <div className="w-72 bg-gray-50 rounded-md p-3 shadow-sm flex flex-col">
      <div className="px-2 py-1 mb-3 rounded text-sm font-semibold text-center bg-blue-100">
        {status}
      </div>

      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1 min-h-[200px]"
          >
            {projects.map((p, index) => (
              <BoardCard key={p._id} project={p} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
