
import type { Project } from "../../types/Project";

export default function ProjectMiniCard({
  project,
  onClick,
}: {
  project: Project;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-gray-100 hover:bg-gray-200 transition p-3 rounded-md shadow-sm text-sm"
    >
      <div className="font-medium truncate">{project.title}</div>
    </div>
  );
}
