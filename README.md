Freello is a free Trello-style project and task management application built with a fully containerized full-stack TypeScript architecture. It provides a clean, fast workflow for managing projects, organizing tasks, and tracking progress across draggable columns — powered by a modern MERN + Docker setup.

Features

User Authentication 
Create, Edit & Delete Projects
Add, Edit, Toggle & Delete Tasks
Drag-and-Drop Columns 
Project status workflow (Todo → In Progress → Completed)
Project deadlines
Fully persistent data 
Responsive UI
Full Docker support - Separate containers for client & backend with optimized multi-stage builds
Clean Context-API state management

Tech Stack
Frontend
React
TypeScript
Vite

Backend
Node.js
Express
TypeScript
MongoDB

DevOps:
Docker
Docker Compose
Nginx

HOW TO RUN
**Clone the Repository:**

git clone https://github.com/Michaelayz/freello.git
cd freello

**Environment Configuration:**

**Backend (`.env` in `server/` directory):**

bash
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/freello
JWT_SECRET=your_development_secret_key
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174


**Frontend (`.env` in `client/` directory):**

bash
VITE_API_URL=http://localhost:5000/api


**Build and Run with Docker Compose:**

# Running Without Docker (Alternative)

**Backend:**

cd backend
npm install
npm run dev


**Frontend:**

cd client
npm install
npm run dev



## Screens


Future Deployment Targets
Vercel / Netlify (frontend)
Render / Railway / Fly.io / AWS ECS (backend)



Built by Michael Ayozie
A frontend & DevOps-oriented engineer building modern web and infrastructure soltions.

