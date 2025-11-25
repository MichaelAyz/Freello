import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import ProjectsPanel from "../Projectpanel/ProjectPanel";
import Board from "../board/Board";
import ProjectFormModal from "../Modal/ProjectForm";
import ProjectDetailsModal from "../Modal/ProjectDetailsModal";
import AvatarButton from "../Common/AvatarButton";
import { useProjects } from "../../context/ProjectContext";

export default function ProjectPage() {
  const { reorderBoardProjects, addProjectToBoard } = useProjects();

  const onDragEnd = (result: DropResult) => {
    console.log(" Drag ended:", result);

    const { destination, source, draggableId } = result;

    // Dropped outside valid area
    if (!destination) {
      console.log(" No destination - dropped outside");
      return;
    }

    // Dropped in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log(" Dropped in same position");
      return;
    }

   const projectId = draggableId.replace('sidebar-', '').replace('board-', '');

  // SIDEBAR → BOARD
  if (source.droppableId === "sidebar" && destination.droppableId === "board") {
    console.log("Adding to board:", projectId);
    addProjectToBoard(projectId);
    return;
  }

    // ✅ BOARD REORDERING
    if (
      source.droppableId === "board" &&
      destination.droppableId === "board"
    ) {
      console.log(" Reordering board columns");
      reorderBoardProjects(source.index, destination.index);
      return;
    }

    console.log("Unhandled drag scenario:", { source: source.droppableId, destination: destination.droppableId });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="h-screen flex bg-gray-50">
        <ProjectsPanel />
        
        <div className="flex-1 flex flex-col">
          {/* Top Bar with Avatar */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center flex-shrink-0">
            <div className="text-sm text-gray-500">
              Trello Board
            </div>
            <AvatarButton />
          </div>

          <Board />
        </div>

        {/* Modals */}
        <ProjectFormModal />
        <ProjectDetailsModal />
      </div>
    </DragDropContext>
  );
}