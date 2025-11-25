import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor (for debugging)
api.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error("[API] Request error:", error);
    return Promise.reject(error);
  }
);

// response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`[API] Response ${response.status}:`, response.data);
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized - maybe redirect to login?");
    }
    console.error("[API] Response error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Project APIs
export const getProjects = () => api.get("/projects");
export const createProject = (data: any) => api.post("/projects", data);
export const updateProject = (id: string, data: any) => api.put(`/projects/${id}`, data);
export const deleteProject = (id: string) => api.delete(`/projects/${id}`);

// Task APIs
export const addTask = (projectId: string, text: string) => 
  api.post(`/projects/${projectId}/tasks`, { text });

export const updateTask = (projectId: string, taskId: string, updates: { done?: boolean; text?: string }) => 
  api.patch(`/projects/${projectId}/tasks/${taskId}`, updates);

export const deleteTask = (projectId: string, taskId: string) => 
  api.delete(`/projects/${projectId}/tasks/${taskId}`);

// Auth APIs
export const signup = (data: { name: string; email: string; password: string }) =>
  api.post("/auth/signup", data);

export const login = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export default api;
export type { AxiosError };