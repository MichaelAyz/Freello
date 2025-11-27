import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { Layout } from "lucide-react";

import ProjectsPanel from "../Projectpanel/ProjectPanel";
import Board from "../board/Board";
import ProjectFormModal from "../Modal/ProjectForm";
import ProjectDetailsModal from "../Modal/ProjectDetailsModal";
import AvatarButton from "../Common/AvatarButton";
import { useProjects } from "../../context/ProjectContext";

export default function ProjectPage() {
  const { reorderBoardProjects, addProjectToBoard } = useProjects();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

   const projectId = draggableId.replace('sidebar-', '').replace('board-', '');

  // SIDEBAR → BOARD
  if (source.droppableId === "sidebar" && destination.droppableId === "board") {
    addProjectToBoard(projectId);
    return;
  }

    // ✅ BOARD REORDERING
    if (
      source.droppableId === "board" &&
      destination.droppableId === "board"
    ) {
      reorderBoardProjects(source.index, destination.index);
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* Main Container: Warm Light Background (#F4EDE4) */}
      <div className="h-screen flex bg-freello-cream text-slate-700 overflow-hidden font-sans">
        
        {/* Left Sidebar */}
        <ProjectsPanel />
        
        {/* Main Board Area */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          
          {/* Top Bar - Clean & White */}
          <div className="bg-white/80 backdrop-blur-md border-b border-stone-200 px-6 py-3 flex justify-between items-center shrink-0 shadow-sm z-20">
            {/* Freello Branding */}
            <div className="flex items-center gap-2 text-teal-600">
              <div className="p-1.5 bg-teal-50 rounded-lg">
                <Layout size={20} strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-800">Freello Board</span>
            </div>

            {/* User Avatar */}
            <div className="flex items-center gap-4">
               <div className="h-6 w-px bg-stone-200 mx-2 hidden sm:block"></div>
               <AvatarButton />
            </div>
          </div>

          {/* Board Canvas */}
          <div className="flex-1 relative overflow-hidden">
             {/* Subtle Texture for the 'Paper' feel */}
             <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#A8A29E_1px,transparent_1px)] [bg-size:20px_20px] pointer-events-none"></div>
             <Board />
          </div>
        </div>

        {/* Modals */}
        <ProjectFormModal />
        <ProjectDetailsModal />
      </div>
    </DragDropContext>
  );
}