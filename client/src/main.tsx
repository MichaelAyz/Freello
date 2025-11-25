import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProjectProvider } from "./context/ProjectContext";
import { AuthProvider } from "./context/AuthContext"; 

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <AuthProvider> 
     <ProjectProvider>
      <App />
     </ProjectProvider>
    </AuthProvider>
  </StrictMode>
);