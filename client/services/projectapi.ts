import axios, { AxiosError } from "axios";


const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  return config; // just send cookie
});


// Optional: global response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — maybe redirect to login?");
    }
    return Promise.reject(error);
  }
);


export const getProjects = () => api.get("/projects");
export const createProject = (data: any) => api.post("/projects", data);
export const updateProject = (id: string, data: any) =>
  api.put(`/projects/${id}`, data);
export const deleteProject = (id: string) =>
  api.delete(`/projects/${id}`);

// Export the instance and error type if needed elsewhere
export default api;

export type { AxiosError };