import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus, FolderKanban } from "lucide-react";
import { useProjects } from "../../context/ProjectContext";
import ProjectMiniCard from "./ProjectMiniCard";

export default function ProjectsPanel() {
  const { projects, openForm, openDetails } = useProjects();

  return (
    <div className="w-72 bg-zinc-800 border-r border-zinc-700/50 flex flex-col shadow-2xl z-30 h-full">
      
      <div className="p-6 border-b border-zinc-700/50">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-teal-500/10 rounded-lg border border-teal-500/20">
                <FolderKanban size={20} className="text-teal-400" />
            </div>
            <h2 className="text-lg font-bold tracking-wide text-zinc-100">Projects</h2>
        </div>
        
        <button
          onClick={openForm}
          className="w-full bg-teal-500 hover:bg-teal-400 text-zinc-900 py-3 px-4 rounded-lg transition-all duration-200 font-bold shadow-lg shadow-teal-500/10 active:scale-[0.98] flex items-center justify-center gap-2 group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" />
          <span>New Project</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <Droppable droppableId="sidebar">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`space-y-3 min-h-[150px] transition-colors rounded-xl p-2 ${
                 snapshot.isDraggingOver ? 'bg-zinc-700/30 ring-2 ring-teal-500/20 border border-dashed border-zinc-600' : ''
              }`}
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
                      // FIX: Pass the style directly. 
                      // Do NOT add manual rotation here, or it breaks the "snap back" animation.
                      style={dragProvided.draggableProps.style} 
                      className="outline-none"
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

              {provided.placeholder}
        
              {projects.length === 0 && (
                <div className="text-center py-12 px-4 border-2 border-dashed border-zinc-700/50 rounded-xl">
                  <p className="text-zinc-500 text-sm">
                    No projects yet. <br/> Create one to get started!
                  </p>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}