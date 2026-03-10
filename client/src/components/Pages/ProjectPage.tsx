import { useState } from "react";
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const onDragEnd = (result: DropResult) => {
    // ... rest
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

    // BOARD REORDERING
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
      <div className="h-screen flex bg-freello-cream text-slate-700 overflow-hidden font-sans relative">

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar container */}
        <div className={`
          fixed md:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          <ProjectsPanel onCloseMobile={() => setIsSidebarOpen(false)} />
        </div>

        <div className="flex-1 flex flex-col min-w-0 relative">

          <div className="bg-white/80 backdrop-blur-md border-b border-stone-200 px-4 md:px-6 py-3 flex justify-between items-center shrink-0 shadow-sm z-20">
            <div className="flex items-center gap-2 text-teal-600">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-1.5 md:hidden text-slate-500 hover:text-teal-600 focus:outline-none"
              >
                <Layout size={24} />
              </button>
              <div className="hidden md:flex p-1.5 bg-teal-50 rounded-lg">
                <Layout size={20} strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-800">Freello Board</span>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="h-6 w-px bg-stone-200 mx-2 hidden sm:block"></div>
              <AvatarButton />
            </div>
          </div>

          <div className="flex-1 relative overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#A8A29E_1px,transparent_1px)] [bg-size:20px_20px] pointer-events-none"></div>
            <Board />
          </div>
        </div>

        <ProjectFormModal />
        <ProjectDetailsModal />
      </div>
    </DragDropContext>
  );
}