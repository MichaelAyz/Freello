import { Droppable, type DroppableProvided } from "@hello-pangea/dnd";
import { FolderPlus } from "lucide-react";
import Column from "./Column";
import { useProjects } from "../../context/ProjectContext";

export default function Board() {
  const { projects, boardProjectIds } = useProjects();

  // Get only projects that are on the board, in the correct order
  const boardProjects = boardProjectIds
    .map(id => projects.find(p => p._id === id))
    .filter(Boolean) as typeof projects;

  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 h-full custom-scrollbar">
      
      <Droppable droppableId="board" direction="horizontal">
        {(provided: DroppableProvided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex gap-6 h-full transition-colors rounded-xl ${
                snapshot.isDraggingOver ? 'bg-zinc-800/30' : ''
            }`}
            style={{ minWidth: 'fit-content' }}
          >
            {boardProjects.map((project, idx) => (
              <Column key={project._id} project={project} index={idx} />
            ))}

            {provided.placeholder}

            {boardProjects.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center h-[70vh] min-w-[300px] animate-fadeIn opacity-60">
                <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-6 border border-zinc-700 shadow-xl ring-4 ring-zinc-800">
                    <FolderPlus size={32} className="text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-zinc-300 mb-2">Your Board is Empty</h3>
                <p className="text-zinc-500 text-sm max-w-xs text-center">
                  Drag a project card from the sidebar to start working.
                </p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}