import { Droppable, type DroppableProvided } from "@hello-pangea/dnd";
import Column from "./Column";
import { useProjects } from "../../context/ProjectContext";

export default function Board() {
  const { projects, boardProjectIds } = useProjects();

  // Get only projects that are on the board, in the correct order
  const boardProjects = boardProjectIds
    .map(id => projects.find(p => p._id === id))
    .filter(Boolean) as typeof projects;

  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 bg-gray-50">
      <Droppable droppableId="board" direction="horizontal">
        {(provided: DroppableProvided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex gap-4 min-h-[calc(100vh-140px)]"
            style={{ minWidth: 'fit-content', height: '100%' }}
          >
            {boardProjects.map((project, idx) => (
              <Column key={project._id} project={project} index={idx} />
            ))}

            {provided.placeholder}

            {/* Empty State */}
            {boardProjects.length === 0 && (
              <div className="flex-1 flex items-center justify-center min-h-[500px]">
                <div className="text-center">
                  <p className="text-gray-400 text-lg mb-2">No projects on board yet</p>
                  <p className="text-gray-500 text-sm">
                    Drag a project from the sidebar to get started
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}