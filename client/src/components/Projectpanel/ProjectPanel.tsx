import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useProjects } from "../../context/ProjectContext";
import ProjectMiniCard from "./ProjectMiniCard";

export default function ProjectsPanel() {
  const { projects, openForm, openDetails } = useProjects();

  return (
    <div className="w-72 bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Projects Space</h3>
        <button
          onClick={openForm}
          className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
        >
          + New
        </button>
      </div>

      <div className="space-y-3">
       
      
        <Droppable droppableId="projectsPanel">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {projects.map((p, index) => (
                <Draggable draggableId={p._id} index={index} key={p._id}>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      <ProjectMiniCard
                        project={p}
                        onClick={() => openDetails(p)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}
