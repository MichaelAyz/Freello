import ProjectsPanel from "../Projectpanel/ProjectPanel";
import Board from "../board/Board";
import ProjectFormModal from "../Modal/ProjectForm";
import ProjectDetailsModal from "../Modal/ProjectDetailsModal";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

export default function ProjectPage() {
  const onDragEnd = (result: DropResult) => {
    console.log("Drag completed:", result);
    // The full logic will be placed here after UI is stable
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen gap-6 p-6 bg-gray-100">
        <ProjectsPanel />

        <div className="flex-1">
          <Board onDragEnd={onDragEnd} />
        </div>

        <ProjectFormModal />
        <ProjectDetailsModal />
      </div>
    </DragDropContext>
  );
}
