import { createContext, useContext, useEffect, useState,
  type ReactNode,
} from "react";
import type { Project } from "../types/Project";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/projectapi";

interface ProjectContextProps {
  projects: Project[];
  loading: boolean;
  isFormOpen: boolean;
  openForm: () => void;
  closeForm: () => void;

  selectedProject: Project | null;
  openDetails: (p: Project) => void;
  closeDetails: () => void;

  addProject: (data: any) => Promise<void>;
  editProject: (id: string, data: any) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextProps>({} as any);

export function useProjects() {
  return useContext(ProjectContext);
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
  setLoading(true);
  try {
    const res = await getProjects();
    // debug line — remove later
    console.log("PROJECTS RESPONSE RAW:", res.data);

    // normalize: support array or wrapped object { projects: [...] } or { data: [...] }
    let payload = res.data;
    if (!payload) payload = [];
    if (payload.projects) payload = payload.projects;
    if (payload.data) payload = payload.data;
    // if backend returned an object with a field, but you expected an array,
    // try to find the first array in the response:
    if (!Array.isArray(payload)) {
      const maybeArray = Object.values(res.data).find(v => Array.isArray(v));
      if (Array.isArray(maybeArray)) payload = maybeArray;
    }

    // ensure we always set an array
    const arr = Array.isArray(payload) ? payload : [];
    console.log("PROJECTS RESPONSE NORMALIZED (length):", arr.length);
    setProjects(arr);
  } catch (err) {
    console.error("Load projects error:", (err as any)?.response?.data || err);
    // If auth failed we still want loading to stop and allow UI to show an empty state
    setProjects([]);
  } finally {
    setLoading(false);
  }  

  //setLoading(true);
  //const res = await getProjects();
  //console.log("PROJECTS RESPONSE:", res.data);
  //setProjects(res.data);
  //setLoading(false);
}


  async function addProject(data: any) {
    const res = await createProject(data);
    setProjects((prev) => [...prev, res.data]);
    setIsFormOpen(false);
  }

  async function editProject(id: string, data: any) {
    const res = await updateProject(id, data);
    setProjects((prev) => prev.map((p) => (p._id === id ? res.data : p)));
  }

  async function removeProject(id: string) {
    await deleteProject(id);
    setProjects((prev) => prev.filter((p) => p._id !== id));
    setSelectedProject(null);
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,

        isFormOpen,
        openForm: () => setIsFormOpen(true),
        closeForm: () => setIsFormOpen(false),

        selectedProject,
        openDetails: (p: Project) => setSelectedProject(p),
        closeDetails: () => setSelectedProject(null),

        addProject,
        editProject,
        removeProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
