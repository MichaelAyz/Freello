import { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import Column from "./Column";
import { useProjects } from "../../context/ProjectContext";
import type { Project } from "../../types/Project";

const STATUS_ORDER: Project["status"][] = [
  "Inquiry",
  "Proposal",
  "In Progress",
  "Review",
  "Completed",
];

export default function Board({
  onDragEnd,
}: {
  onDragEnd: (result: DropResult) => void;
}) {
  const { projects } = useProjects();

  const [columns, setColumns] = useState<Record<string, Project[]>>({});

  useEffect(() => {
    const map: Record<string, Project[]> = {};
    STATUS_ORDER.forEach((s) => (map[s] = []));
    projects.forEach((p) => map[p.status].push(p));
    setColumns(map);
  }, [projects]);

  return (
    <div className="flex-1 overflow-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 px-6 py-4 min-h-[70vh]">
          {STATUS_ORDER.map((status) => (
            <Column
              key={status}
              status={status}
              projects={columns[status] || []}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
