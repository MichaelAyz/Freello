import React, { createContext, useContext, useState, useEffect } from "react";
import type { Project } from "../types/Project";
import { 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject,
  addTask as apiAddTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask
} from "../../services/projectapi";
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

  addTask: (projectId: string, text: string) => Promise<void>;
  toggleTask: (projectId: string, taskId: string) => Promise<void>;
  editTask: (projectId: string, taskId: string, text: string) => Promise<void>;
  removeTask: (projectId: string, taskId: string) => Promise<void>;

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

  // ✅ FIXED: Task operations now call backend API
  const addTask = async (projectId: string, text: string) => {
    try {
      console.log(`📝 Adding task to project ${projectId}:`, text);
      const res = await apiAddTask(projectId, text);
      
      // Update local state with the full project response from backend
      setProjects((prev) =>
        prev.map((p) => (p._id === projectId ? res.data : p))
      );
      
      console.log("✅ Task added successfully");
    } catch (error) {
      console.error("❌ Failed to add task:", error);
      throw error;
    }
  };

  const toggleTask = async (projectId: string, taskId: string) => {
    try {
      // Find current task to get its current done state
      const project = projects.find(p => p._id === projectId);
      const task = project?.tasks?.find(t => t._id === taskId);
      
      if (!task) {
        console.error("Task not found:", taskId);
        return;
      }

      console.log(`🔄 Toggling task ${taskId} in project ${projectId}`);
      const res = await apiUpdateTask(projectId, taskId, { done: !task.done });
      
      setProjects((prev) =>
        prev.map((p) => (p._id === projectId ? res.data : p))
      );
      
      console.log("✅ Task toggled successfully");
    } catch (error) {
      console.error("❌ Failed to toggle task:", error);
      throw error;
    }
  };

  const editTask = async (projectId: string, taskId: string, text: string) => {
    try {
      console.log(`✏️ Editing task ${taskId} in project ${projectId}`);
      const res = await apiUpdateTask(projectId, taskId, { text });
      
      setProjects((prev) =>
        prev.map((p) => (p._id === projectId ? res.data : p))
      );
      
      console.log("✅ Task edited successfully");
    } catch (error) {
      console.error("❌ Failed to edit task:", error);
      throw error;
    }
  };

  const removeTask = async (projectId: string, taskId: string) => {
    try {
      console.log(`🗑️ Deleting task ${taskId} from project ${projectId}`);
      const res = await apiDeleteTask(projectId, taskId);
      
      setProjects((prev) =>
        prev.map((p) => (p._id === projectId ? res.data : p))
      );
      
      console.log("✅ Task deleted successfully");
    } catch (error) {
      console.error("❌ Failed to delete task:", error);
      throw error;
    }
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