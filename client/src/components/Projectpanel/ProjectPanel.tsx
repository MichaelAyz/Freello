import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useProjects } from "../../context/ProjectContext";
import ProjectMiniCard from "./ProjectMiniCard";

export default function ProjectsPanel() {
  const { projects, openForm, openDetails } = useProjects();

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Projects Space</h2>
        <button
          onClick={openForm}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition font-medium"
        >
          + New Project
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <Droppable droppableId="sidebar">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-2"
            >
              {projects.map((project, index) => (
                <Draggable 
                  key={project._id} 
                  draggableId={`sidebar-${project._id}`}
                  index={index}
                >
                  {(dragProvided, dragSnapshot) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      <ProjectMiniCard
                        project={project}
                        onClick={() => openDetails(project)}
                        isDragging={dragSnapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}

        
              {projects.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-8">
                  No projects yet. Create one to get started!
                </p>
              )}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}