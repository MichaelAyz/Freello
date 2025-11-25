import React, { createContext, useContext, useState, useEffect } from "react";
import type { Project, Task } from "../types/Project";
import { getProjects, createProject, updateProject, deleteProject} from "../../services/projectapi";
import { useAuth } from "./AuthContext";

interface ProjectContextType {
  projects: Project[];
  boardProjectIds: string[];
  loading: boolean;
  loadProjects: () => Promise<void>;
  
  addProject: (data: Omit<Project, "_id" | "userId" | "createdAt" | "updatedAt" | "tasks">) => Promise<void>;
  editProject: (projectId: string, updates: Partial<Project>) => Promise<void>;
  removeProject: (projectId: string) => Promise<void>;
  reorderBoardProjects: (startIndex: number, endIndex: number) => void;
  addProjectToBoard: (projectId: string) => void;

  addTask: (projectId: string, text: string) => void;
  toggleTask: (projectId: string, taskId: string) => void;
  editTask: (projectId: string, taskId: string, text: string) => void;
  removeTask: (projectId: string, taskId: string) => void;

  isFormOpen: boolean;
  openForm: () => void;
  closeForm: () => void;

  selectedProject: Project | null;
  openDetails: (project: Project) => void;
  closeDetails: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [boardProjectIds, setBoardProjectIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Load projects when user is authenticated
  useEffect(() => {
    if (user) {
      loadProjects();
      loadBoardState();
    }
  }, [user]);

  // Save board state to localStorage whenever it changes
  useEffect(() => {
    if (user && boardProjectIds.length > 0) {
      localStorage.setItem(`boardState_${user.id}`, JSON.stringify(boardProjectIds));
    }
  }, [boardProjectIds, user]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await getProjects();
      setProjects(res.data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadBoardState = () => {
    if (!user) return;
    
    const saved = localStorage.getItem(`boardState_${user.id}`);
    if (saved) {
      try {
        const parsedIds = JSON.parse(saved);
        setBoardProjectIds(parsedIds);
      } catch (error) {
        console.error("Failed to load board state:", error);
      }
    }
  };

  const addProject = async (data: Omit<Project, "_id" | "userId" | "createdAt" | "updatedAt" | "tasks">) => {
    try {
      const payload = {
        ...data,
        tasks: []  
      };
      
      const res = await createProject(payload);
      setProjects((prev) => [...prev, res.data]);
      closeForm();
    } catch (error) {
      console.error("Failed to create project:", error);
      throw error; 
    }
  };

  const editProject = async (projectId: string, updates: Partial<Project>) => {
    try {
      const res = await updateProject(projectId, updates);
      setProjects((prev) =>
        prev.map((p) => (p._id === projectId ? res.data : p))
      );
      if (selectedProject?._id === projectId) {
        setSelectedProject(res.data);
      }
    } catch (error) {
      console.error("Failed to update project:", error);
      throw error;
    }
  };

  const removeProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
      setBoardProjectIds((prev) => prev.filter((id) => id !== projectId));
      closeDetails();
    } catch (error) {
      console.error("Failed to delete project:", error);
      throw error;
    }
  };

  const addProjectToBoard = (projectId: string) => {
    if (!boardProjectIds.includes(projectId)) {
      setBoardProjectIds((prev) => [...prev, projectId]);
    }
  };

  const reorderBoardProjects = (startIndex: number, endIndex: number) => {
    const reordered = Array.from(boardProjectIds);
    const [removed] = reordered.splice(startIndex, 1);
    reordered.splice(endIndex, 0, removed);
    setBoardProjectIds(reordered);

    console.log("Board projects reordered:", reordered);
  };

  // Task operations with safety checks
  const addTask = (projectId: string, text: string) => {
    const newTask: Task = {
      _id: crypto.randomUUID(),
      text,
      done: false,
    };

    setProjects((prev) =>
      prev.map((p) =>
        p._id === projectId
          ? { ...p, tasks: [...(p.tasks || []), newTask] }
          : p
      )
    );
  };

  const toggleTask = (projectId: string, taskId: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p._id === projectId
          ? {
              ...p,
              tasks: (p.tasks || []).map((t) =>
                t._id === taskId ? { ...t, done: !t.done } : t
              ),
            }
          : p
      )
    );
  };

  const editTask = (projectId: string, taskId: string, text: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p._id === projectId
          ? {
              ...p,
              tasks: (p.tasks || []).map((t) =>
                t._id === taskId ? { ...t, text } : t
              ),
            }
          : p
      )
    );
  };

  const removeTask = (projectId: string, taskId: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p._id === projectId
          ? { ...p, tasks: (p.tasks || []).filter((t) => t._id !== taskId) }
          : p
      )
    );
  };

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);
  const openDetails = (project: Project) => setSelectedProject(project);
  const closeDetails = () => setSelectedProject(null);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        boardProjectIds,
        loading,
        loadProjects,
        addProject,
        editProject,
        removeProject,
        reorderBoardProjects,
        addProjectToBoard,
        addTask,
        toggleTask,
        editTask,
        removeTask,
        isFormOpen,
        openForm,
        closeForm,
        selectedProject,
        openDetails,
        closeDetails,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjects must be used inside ProjectProvider");
  return ctx;
};